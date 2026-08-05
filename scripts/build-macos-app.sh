#!/bin/zsh

set -euo pipefail

script_dir="${0:A:h}"
project_root="${script_dir:h}"
app_dir="${project_root}/dist/Lifepane.app"
contents_dir="${app_dir}/Contents"
macos_dir="${contents_dir}/MacOS"
bundle_resources_dir="${contents_dir}/Resources"
resources_dir="${bundle_resources_dir}/Lifepane"
module_cache_dir="${TMPDIR:-/tmp}/life-portal-swift-module-cache"
icon_work_dir="${TMPDIR:-/tmp}/life-portal-icon-build"
iconset_dir="${icon_work_dir}/AppIcon.iconset"
support_dir="${HOME}/Library/Application Support/Lifepane"
legacy_support_dir="${HOME}/Library/Application Support/Life Portal"
support_data_dir="${support_dir}/data"
target_arch="$(uname -m)"
if [[ "${target_arch}" == "x86_64" ]]; then
  swift_target="x86_64-apple-macosx13.0"
else
  swift_target="arm64-apple-macosx13.0"
fi

mkdir -p "${macos_dir}" "${bundle_resources_dir}" "${support_data_dir}"
mkdir -p "${module_cache_dir}"
cp "${project_root}/macos/Info.plist" "${contents_dir}/Info.plist"

if [[ ! -f "${support_dir}/.env" && -f "${legacy_support_dir}/.env" ]]; then
  cp "${legacy_support_dir}/.env" "${support_dir}/.env"
  chmod 600 "${support_dir}/.env"
fi

if [[ ! -f "${support_data_dir}/life-portal.sqlite" \
      && -f "${legacy_support_dir}/data/life-portal.sqlite" ]]; then
  /usr/bin/sqlite3 \
    "${legacy_support_dir}/data/life-portal.sqlite" \
    ".backup '${support_data_dir}/life-portal.sqlite'"
fi

rm -rf "${resources_dir}"
mkdir -p "${resources_dir}"
cp "${project_root}/server.js" "${resources_dir}/server.js"
cp -R "${project_root}/public" "${resources_dir}/public"
cp -R "${project_root}/node_modules" "${resources_dir}/node_modules"

if [[ -f "${project_root}/.env" ]]; then
  cp "${project_root}/.env" "${support_dir}/.env"
  chmod 600 "${support_dir}/.env"
fi

if [[ ! -f "${support_data_dir}/life-portal.sqlite" \
      && -f "${project_root}/data/life-portal.sqlite" ]]; then
  /usr/bin/sqlite3 \
    "${project_root}/data/life-portal.sqlite" \
    ".backup '${support_data_dir}/life-portal.sqlite'"
fi

CLANG_MODULE_CACHE_PATH="${module_cache_dir}" \
/usr/bin/swiftc \
  -parse-as-library \
  -O \
  -target "${swift_target}" \
  -module-cache-path "${module_cache_dir}" \
  -framework AppKit \
  -o "${macos_dir}/LifePortalLauncher" \
  "${project_root}/macos/LifePortalLauncher.swift"

rm -rf "${icon_work_dir}"
mkdir -p "${iconset_dir}"

CLANG_MODULE_CACHE_PATH="${module_cache_dir}" \
/usr/bin/swiftc \
  -parse-as-library \
  -O \
  -target "${swift_target}" \
  -module-cache-path "${module_cache_dir}" \
  -framework AppKit \
  -o "${icon_work_dir}/IconRenderer" \
  "${project_root}/macos/IconRenderer.swift"

"${icon_work_dir}/IconRenderer" "${icon_work_dir}/AppIcon-1024.png"

for icon_spec in \
  "16 icon_16x16.png" \
  "32 icon_16x16@2x.png" \
  "32 icon_32x32.png" \
  "64 icon_32x32@2x.png" \
  "128 icon_128x128.png" \
  "256 icon_128x128@2x.png" \
  "256 icon_256x256.png" \
  "512 icon_256x256@2x.png" \
  "512 icon_512x512.png" \
  "1024 icon_512x512@2x.png"; do
  dimensions="${icon_spec%% *}"
  filename="${icon_spec#* }"
  /usr/bin/sips \
    -z "${dimensions}" "${dimensions}" \
    "${icon_work_dir}/AppIcon-1024.png" \
    --out "${iconset_dir}/${filename}" \
    >/dev/null
done

/usr/bin/iconutil \
  -c icns \
  "${iconset_dir}" \
  -o "${bundle_resources_dir}/AppIcon.icns"

/usr/bin/codesign \
  --force \
  --sign - \
  "${app_dir}"

echo "${app_dir}"
