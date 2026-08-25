# Visual baseline policy

The golden matrix is generated from the integration lab at three fixed
viewports and covers light/dark with blue/violet/emerald/amber palettes.

The optical target is Liqui Design commit
`db2f98a436ad4ed47a713938ae3f4ca9a7880599`. Reference mapping:

| LiquidUI intent | Liqui Design optical role | Performance rule |
| --- | --- | --- |
| `panel` | regular, large calm surface | conservative refraction, no dispersion |
| `overlay` | elevated menu/dialog | stronger frost/specular, preloaded before motion |
| `control` | compact button/control lens | narrow bezel, repeated-size cache |
| `navigation` | persistent floating chrome | one large surface over many nested surfaces |

Golden files under `tests/visual/material-matrix.spec.js-snapshots/` protect the
local implementation from accidental drift. Approval remains a two-part review:
material is compared with the fixed Liqui Design reference, while layout and
content are compared with the Trojan Panel functional inventory. Old Trojan
Panel glass screenshots are never an appearance baseline.

Regenerate intentionally with `pnpm test:visual:update`; ordinary CI uses
`pnpm test:visual` and must not rewrite snapshots.
