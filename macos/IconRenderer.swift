import AppKit
import Foundation

@main
enum IconRenderer {
    static func main() throws {
        guard CommandLine.arguments.count == 2 else {
            throw NSError(
                domain: "LifePortalIconRenderer",
                code: 1,
                userInfo: [NSLocalizedDescriptionKey: "An output PNG path is required."]
            )
        }

        let pixelSize = 1024
        guard let bitmap = NSBitmapImageRep(
            bitmapDataPlanes: nil,
            pixelsWide: pixelSize,
            pixelsHigh: pixelSize,
            bitsPerSample: 8,
            samplesPerPixel: 4,
            hasAlpha: true,
            isPlanar: false,
            colorSpaceName: .deviceRGB,
            bytesPerRow: 0,
            bitsPerPixel: 0
        ) else {
            throw NSError(domain: "LifePortalIconRenderer", code: 2)
        }

        bitmap.size = NSSize(width: pixelSize, height: pixelSize)
        guard let context = NSGraphicsContext(bitmapImageRep: bitmap) else {
            throw NSError(domain: "LifePortalIconRenderer", code: 3)
        }

        NSGraphicsContext.saveGraphicsState()
        NSGraphicsContext.current = context
        NSColor.clear.setFill()
        NSRect(x: 0, y: 0, width: pixelSize, height: pixelSize).fill()

        let tile = NSBezierPath(
            roundedRect: NSRect(x: 64, y: 64, width: 896, height: 896),
            xRadius: 196,
            yRadius: 196
        )
        NSColor(calibratedRed: 12 / 255, green: 17 / 255, blue: 22 / 255, alpha: 1).setFill()
        tile.fill()

        NSColor(calibratedRed: 247 / 255, green: 251 / 255, blue: 1, alpha: 1).setStroke()

        let window = NSBezierPath(
            roundedRect: NSRect(x: 230, y: 230, width: 564, height: 564),
            xRadius: 94,
            yRadius: 94
        )
        window.lineWidth = 50
        window.stroke()

        strokeLine(from: NSPoint(x: 230, y: 640), to: NSPoint(x: 794, y: 640), width: 50)
        strokeLine(from: NSPoint(x: 350, y: 500), to: NSPoint(x: 430, y: 500), width: 50)
        strokeLine(from: NSPoint(x: 594, y: 500), to: NSPoint(x: 674, y: 500), width: 50)
        strokeLine(from: NSPoint(x: 350, y: 365), to: NSPoint(x: 674, y: 365), width: 50)

        context.flushGraphics()
        NSGraphicsContext.restoreGraphicsState()

        guard let png = bitmap.representation(using: .png, properties: [:]) else {
            throw NSError(domain: "LifePortalIconRenderer", code: 4)
        }

        try png.write(to: URL(fileURLWithPath: CommandLine.arguments[1]))
    }

    private static func strokeLine(from start: NSPoint, to end: NSPoint, width: CGFloat) {
        let path = NSBezierPath()
        path.move(to: start)
        path.line(to: end)
        path.lineWidth = width
        path.lineCapStyle = .round
        path.stroke()
    }
}
