import AppKit
import Darwin
import Foundation

@main
final class LifePortalLauncher: NSObject, NSApplicationDelegate {
    private let portalURL = URL(string: "http://127.0.0.1:3000")!
    private let healthURL = URL(string: "http://127.0.0.1:3000/api/health")!

    private var statusItem: NSStatusItem!
    private var statusMenuItem: NSMenuItem!
    private var primaryMenuItem: NSMenuItem!
    private var stopMenuItem: NSMenuItem!
    private var serverProcess: Process?
    private var managedPID: Int32?
    private var readinessTimer: Timer?
    private var readinessAttempts = 0
    private var isQuitting = false

    static func main() {
        let application = NSApplication.shared
        let delegate = LifePortalLauncher()
        application.delegate = delegate
        application.run()
    }

    func applicationDidFinishLaunching(_ notification: Notification) {
        writeLog("Launcher started")
        NSApp.setActivationPolicy(.regular)
        configureMenuBar()
        detectExistingServer()
    }

    func applicationShouldHandleReopen(_ sender: NSApplication, hasVisibleWindows flag: Bool) -> Bool {
        if serverProcess?.isRunning == true || managedPID != nil {
            openPortal()
        } else {
            startServer()
        }
        return true
    }

    func applicationWillTerminate(_ notification: Notification) {
        readinessTimer?.invalidate()
        stopServerIfNeeded()
    }

    private func configureMenuBar() {
        statusItem = NSStatusBar.system.statusItem(withLength: NSStatusItem.squareLength)

        if let button = statusItem.button {
            let image = NSImage(
                systemSymbolName: "square.grid.2x2.fill",
                accessibilityDescription: "Lifepane"
            )
            image?.isTemplate = true
            button.image = image
            button.toolTip = "Lifepane"
        }

        let menu = NSMenu()

        statusMenuItem = NSMenuItem(title: "Server Starting…", action: nil, keyEquivalent: "")
        statusMenuItem.isEnabled = false
        menu.addItem(statusMenuItem)
        menu.addItem(.separator())

        primaryMenuItem = NSMenuItem(
            title: "Open Lifepane",
            action: #selector(handlePrimaryAction),
            keyEquivalent: "o"
        )
        primaryMenuItem.target = self
        menu.addItem(primaryMenuItem)

        stopMenuItem = NSMenuItem(
            title: "Stop Server & Quit",
            action: #selector(stopServerAndQuit),
            keyEquivalent: "q"
        )
        stopMenuItem.target = self
        menu.addItem(stopMenuItem)

        statusItem.menu = menu
    }

    private func startServer() {
        guard serverProcess?.isRunning != true, managedPID == nil else {
            openPortal()
            return
        }

        guard let projectURL = projectDirectoryURL() else {
            writeLog("Project folder was not found")
            showStoppedState(message: "Project Folder Not Found")
            return
        }

        let nodePath = findNodePath()
        guard FileManager.default.isExecutableFile(atPath: nodePath) else {
            writeLog("Node.js was not found")
            showStoppedState(message: "Node.js Not Found")
            return
        }
        writeLog("Starting \(nodePath) in \(projectURL.path)")

        let process = Process()
        process.executableURL = URL(fileURLWithPath: nodePath)
        process.arguments = [projectURL.appendingPathComponent("server.js").path]
        process.currentDirectoryURL = projectURL

        var environment = ProcessInfo.processInfo.environment
        environment["PORT"] = "3000"
        environment["LIFE_PORTAL_DATA_DIR"] = applicationSupportURL()
            .appendingPathComponent("data", isDirectory: true)
            .path
        environment["LIFE_PORTAL_ENV_PATH"] = applicationSupportURL()
            .appendingPathComponent(".env")
            .path
        process.environment = environment

        let logURL = FileManager.default.temporaryDirectory
            .appendingPathComponent("life-portal-server.log")
        FileManager.default.createFile(atPath: logURL.path, contents: nil)
        if let logHandle = try? FileHandle(forWritingTo: logURL) {
            process.standardOutput = logHandle
            process.standardError = logHandle
        }

        process.terminationHandler = { [weak self] finishedProcess in
            DispatchQueue.main.async {
                guard let self, !self.isQuitting else { return }
                self.writeLog("Server exited with status \(finishedProcess.terminationStatus)")
                self.readinessTimer?.invalidate()
                self.serverProcess = nil
                self.managedPID = nil
                self.showStoppedState(
                    message: finishedProcess.terminationStatus == 0
                        ? "Server Stopped"
                        : "Server Failed to Start"
                )
            }
        }

        do {
            try process.run()
            serverProcess = process
            managedPID = process.processIdentifier
            showStartingState()
            waitUntilReady()
        } catch {
            writeLog("Could not start server: \(error.localizedDescription)")
            serverProcess = nil
            showStoppedState(message: "Server Failed to Start")
        }
    }

    private func detectExistingServer() {
        var request = URLRequest(url: healthURL)
        request.timeoutInterval = 0.5

        URLSession.shared.dataTask(with: request) { [weak self] data, response, _ in
            guard let self else { return }

            let pid = self.lifePortalPID(data: data, response: response)
            DispatchQueue.main.async {
                if let pid {
                    self.writeLog("Adopted existing server with PID \(pid)")
                    self.managedPID = pid
                    self.showRunningState()
                    self.openPortal()
                } else {
                    self.writeLog("No existing Lifepane server found")
                    self.startServer()
                }
            }
        }.resume()
    }

    private func waitUntilReady() {
        readinessTimer?.invalidate()
        readinessAttempts = 0

        readinessTimer = Timer.scheduledTimer(withTimeInterval: 0.25, repeats: true) { [weak self] timer in
            guard let self else {
                timer.invalidate()
                return
            }

            self.readinessAttempts += 1
            if self.readinessAttempts > 40 {
                timer.invalidate()
                self.showStoppedState(message: "Server Did Not Respond")
                return
            }

            var request = URLRequest(url: self.healthURL)
            request.timeoutInterval = 0.2
            URLSession.shared.dataTask(with: request) { data, response, _ in
                guard let pid = self.lifePortalPID(data: data, response: response),
                      pid == self.serverProcess?.processIdentifier else {
                    return
                }

                DispatchQueue.main.async {
                    guard self.serverProcess?.isRunning == true else { return }
                    self.readinessTimer?.invalidate()
                    self.writeLog("Server is ready with PID \(pid)")
                    self.showRunningState()
                    self.openPortal()
                }
            }.resume()
        }
    }

    private func lifePortalPID(data: Data?, response: URLResponse?) -> Int32? {
        guard
            let response = response as? HTTPURLResponse,
            response.statusCode == 200,
            let data,
            let payload = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
            payload["ok"] as? Bool == true,
            payload["service"] as? String == "life-portal",
            let pid = payload["pid"] as? NSNumber
        else {
            return nil
        }

        return pid.int32Value
    }

    private func projectDirectoryURL() -> URL? {
        guard let resourcesURL = Bundle.main.resourceURL else {
            return nil
        }

        let url = resourcesURL.appendingPathComponent("Lifepane", isDirectory: true)
        return FileManager.default.fileExists(
            atPath: url.appendingPathComponent("server.js").path
        ) ? url : nil
    }

    private func applicationSupportURL() -> URL {
        FileManager.default.homeDirectoryForCurrentUser
            .appendingPathComponent("Library/Application Support/Lifepane", isDirectory: true)
    }

    private func findNodePath() -> String {
        let candidates = [
            "/opt/homebrew/bin/node",
            "/usr/local/bin/node",
            "/usr/bin/node"
        ]
        return candidates.first {
            FileManager.default.isExecutableFile(atPath: $0)
        } ?? candidates[0]
    }

    private func showStartingState() {
        statusMenuItem.title = "Server Starting…"
        primaryMenuItem.title = "Open Lifepane"
        primaryMenuItem.isEnabled = false
        stopMenuItem.title = "Stop Server & Quit"
    }

    private func showRunningState() {
        statusMenuItem.title = "Server Running"
        primaryMenuItem.title = "Open Lifepane"
        primaryMenuItem.isEnabled = true
        stopMenuItem.title = "Stop Server & Quit"
    }

    private func showStoppedState(message: String) {
        statusMenuItem.title = message
        primaryMenuItem.title = "Start Server"
        primaryMenuItem.isEnabled = true
        stopMenuItem.title = "Quit"
    }

    private func openPortal() {
        NSWorkspace.shared.open(portalURL)
    }

    @objc
    private func handlePrimaryAction() {
        if serverProcess?.isRunning == true || managedPID != nil {
            openPortal()
        } else {
            startServer()
        }
    }

    @objc
    private func stopServerAndQuit() {
        isQuitting = true
        readinessTimer?.invalidate()
        stopServerIfNeeded()
        NSApp.terminate(nil)
    }

    private func stopServerIfNeeded() {
        if let process = serverProcess, process.isRunning {
            process.terminate()
        } else if let pid = managedPID, pid > 0 {
            Darwin.kill(pid, SIGTERM)
        }
        serverProcess = nil
        managedPID = nil
    }

    private func writeLog(_ message: String) {
        let logURL = URL(fileURLWithPath: "/tmp/life-portal-launcher.log")
        let line = "\(ISO8601DateFormatter().string(from: Date())) \(message)\n"
        let data = Data(line.utf8)

        if !FileManager.default.fileExists(atPath: logURL.path) {
            FileManager.default.createFile(atPath: logURL.path, contents: data)
            return
        }

        guard let handle = try? FileHandle(forWritingTo: logURL) else { return }
        defer { try? handle.close() }
        _ = try? handle.seekToEnd()
        try? handle.write(contentsOf: data)
    }
}
