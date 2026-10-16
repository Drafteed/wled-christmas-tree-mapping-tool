# WLED Christmas Tree Lights Mapping Tool

<img src="https://img.shields.io/badge/React-%23505050.svg?logo=react" alt="React"> <a href="LICENSE"><img src="https://img.shields.io/github/license/Drafteed/wled-christmas-tree-mapping-tool?color=orange" alt="License"></a>

Simple and easy-to-use tool for creating [WLED](https://kno.wled.ge/) mappings for Christmas tree lights.
It guides you through a few simple steps to generate a 2D matrix mapping for addressable LEDs,
allowing you to unlock stunning 2D effects and animations on your Christmas tree.

<picture>
<source srcset="/images/wled-mapped-tree.webp" type="image/webp">
<img src="/images/wled-mapped-tree.gif" width="301" alt="WLED Mapped Tree">
</picture>

## Features

- Generate a 2D mapping from your tree's LED rows, with adjustable offsets.
- Locate individual LEDs, highlight entire rows and check their centers live on your tree.
- Import an existing mapping from WLED to adjust it.
- Upload the mapping, configure the 2D matrix, reboot and test effects directly from the tool.
- Use it online or offline as a single HTML file - no installation required.

## Requirements

- Addressable LED strip (WS2812B, SK6812, WS2811, etc.)
- Controller (ESP8266 or ESP32)
- [WLED firmware](https://kno.wled.ge/) (flashed to the controller)
- Power supply with appropriate voltage and current

## Preparations

Wrap your addressable LED strip around the tree from bottom to top so that you get even
horizontal rows.

For a new setup, configure the LED count in WLED's regular 1D mode and check that
the strip works. Back up and remove any `/ledmap.json`, `/ledmapX.json` and
`/2d-gaps.json` files from the WLED File Editor.

To adjust an existing mapping created with this tool, keep `/ledmap.json` - it
will be imported automatically when you connect.

## Usage

Ensure your computer or phone is connected to the same local network as your WLED device.

### Option 1: Offline Version (works in any browser)
1. Download **`WLED_CHRISTMAS_TREE_MAPPING_TOOL.html`** from the [latest release](https://github.com/Drafteed/wled-christmas-tree-mapping-tool/releases/latest).
2. Open the downloaded file locally in **any modern browser** (no internet access or installation required).
3. Enter your WLED IP address or `.local` hostname and follow the on-screen instructions.

### Option 2: Online Web Tool
1. [Open the online tool](https://drafteed.github.io/wled-christmas-tree-mapping-tool/) in **Chrome or Edge** (desktop) or **Chrome 147+ on Android**.
2. Enter your WLED IP address or `.local` hostname.
3. Grant local network access when prompted by your browser and follow the guided steps.

> **Note:** The online version requires a browser that allows websites to connect to local network devices. **Safari and Firefox currently are not supported** for the online tool - use the offline HTML file instead.

<a href="/images/ui.png"><img src="/images/ui.png" width="700" alt="WLED Christmas Tree Lights Mapping Tool UI"></a>

## Mapping tips

- Add rows from bottom to top: Row 1 is the lowest row on your tree.
- Use the slider to find the leftmost and rightmost LEDs as viewed from the front.
  Enter their numbers in Left LED and Right LED, then check with Highlight.
- Start with Offset set to 0. Use Highlight center LEDs and adjust each row's
  offset to align the centers vertically.

## Troubleshooting

- **Online tool could not connect?** Allow local network access in your browser. If it
  still fails, try opening the downloaded HTML file locally.
- **Still cannot connect?** Check that WLED opens in your browser and both devices are
  on the same network. Try its IP address instead of a `.local` hostname.
- **Mapping not applied?** Upload the mapping, configure the 2D matrix and fully
  reboot WLED before testing effects.

## Contributing

Use Node.js 22.14 or newer and npm.

```sh
npm ci
npm run dev
```

Built with React, TypeScript, Tailwind CSS and Vite. Run `npm run build` to check types and create
the standalone `dist/WLED_CHRISTMAS_TREE_MAPPING_TOOL.html`.

Run `npm run check` to check formatting and lint rules, or `npm run fix` to apply
formatting and safe fixes with Biome.

## License

[The MIT License (MIT)](LICENSE)
