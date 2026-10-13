# WLED Christmas Tree Lights Mapping Tool

<img src="https://img.shields.io/badge/React-%23505050.svg?logo=react" alt="React"> <a href="LICENSE"><img src="https://img.shields.io/github/license/Drafteed/wled-christmas-tree-mapping-tool?color=orange" alt="Licence"></a>

Simple and easy-to-use tool for creating [WLED](https://kno.wled.ge/) mappings for Christmas tree lights.
It guides you through a few simple steps to generate a 2D matrix mapping for addressable LEDs,
allowing you to unlock stunning 2D effects and animations on your Christmas tree.

<picture>
<source srcset="/images/wled-mapped-tree.webp" type="image/webp">
<img src="/images/wled-mapped-tree.gif" width="301" alt="WLED Mapped Tree">
</picture>

## Requirements

- Addressable LED strip (WS2812B, SK6812, WS2811, etc.)
- Controller (ESP8266 or ESP32)
- [WLED firmware](https://kno.wled.ge/) (flashed to the controller)
- Power supply with appropriate voltage and current

## Preparations

Wrap your addressable LED strip around the tree from bottom to top so that you get even
horizontal rows. Configure the required number of LEDs in WLED in the regular 1D
mode. Make sure everything works correctly. Also make sure that the
files `/ledmap.json` (`/ledmapX.json`) and `/2d-gaps.json` are not
present in the WLED `File Editor`.

## Create mapping

Open the [online tool](https://drafteed.github.io/wled-christmas-tree-mapping-tool/)
in Chrome or Edge on a computer, or Chrome on Android (version 147+).
Allow local network access when prompted.
Your computer or phone must be on the same network as WLED.

Alternatively, download **WLED_CHRISTMAS_TREE_MAPPING_TOOL.html** from the
[latest release](https://github.com/Drafteed/wled-christmas-tree-mapping-tool/releases/latest)
and open it locally. The file works without internet access or installation.

Enter your WLED IP address or `.local` hostname and follow the guided steps.

<a href="/images/ui.png"><img src="/images/ui.png" width="700" alt="WLED Christmas Tree Lights Mapping Tool UI"></a>

## Contributing

Use Node.js 22.14 or newer and npm.

```sh
npm ci
npm run dev
```

Built with React, TypeScript and Vite. Run `npm run build` to check types and create
the standalone `dist/WLED_CHRISTMAS_TREE_MAPPING_TOOL.html`.

## License

[The MIT License (MIT)](LICENSE)
