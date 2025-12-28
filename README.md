# WLED Christmas Tree Lights Mapping Tool

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

Just download [WLED_CHRISTMAS_TREE_MAPPING_TOOL.html](WLED_CHRISTMAS_TREE_MAPPING_TOOL.html).

Open it in your browser locally, and follow the guided steps.

<a href="/images/ui.png"><img src="/images/ui.png" width="700" alt="WLED Christmas Tree Lights Mapping Tool UI"></a>

## License

[The MIT License (MIT)](LICENSE)
