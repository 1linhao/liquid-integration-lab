# Liquid 集成验证应用

这是 LiquidUI 与 LiquidAppShell 的第二个完整消费者，与 Trojan Panel 业务无关。它证明两个资源库可以直接安装到普通应用，而不需要修改模块 Implementation。

## 运行

```sh
pnpm --dir ../liquid-ui build
pnpm --dir ../liquid-app-shell build
pnpm install
pnpm dev
```

本地依赖按照未来 npm 包相同的 `dist/` 结构消费，因此必须先构建两个资源库。

## 验证

```sh
pnpm build
pnpm test:visual
pnpm check
```

自动矩阵覆盖亮暗模式、四色主题、桌面/平板/手机视口、Surface、表单控件、Select/DatePicker 展开态，以及 Tab、方向键、Enter、Space、Escape 和焦点恢复。

Trojan Panel 功能盘点见 [docs/trojan-panel-functional-baseline.md](docs/trojan-panel-functional-baseline.md)，仅作为业务结构基线。该仓库是发布门槛的一部分，不作为 npm 包发布。
