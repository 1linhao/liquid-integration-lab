# Liquid integration lab

This is the required second consumer for LiquidUI and LiquidAppShell. It is
deliberately unrelated to Trojan Panel: if it needs a change inside either
package to render a generic application model, the public seam is incomplete.

```sh
pnpm --dir ../liquid-ui build
pnpm --dir ../liquid-app-shell build
pnpm install
pnpm build
pnpm dev
```

The two package builds come first because local `file:` dependencies consume
the same installable `dist/` layout that published packages will expose.

Manual acceptance matrix:

- modes: light and dark;
- palettes: blue, violet, emerald, amber;
- viewports: 1440x900, 768x1024, 390x844;
- material qualities: auto and reduced;
- keyboard: tab through header actions, desktop navigation, mobile navigation;
- responsive: desktop sidebar and mobile segmented bottom navigation share the
  same model and active key.

The source-of-truth functional inventory is in
[`docs/trojan-panel-functional-baseline.md`](docs/trojan-panel-functional-baseline.md).
