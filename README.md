# LiquidUI 集成验证仓库

这是 LiquidUI 与 LiquidAppShell 的独立 Vue 2 消费端，与 Trojan Panel 业务无关。它按未来 npm 包相同的公开入口安装两个资源库，不引用其内部源码，用于证明不同主题、视口和交互契约可以跨项目复用。

本仓库是公开的发布门槛和回归样例，不作为 npm 包发布。

## 运行

```sh
pnpm --dir ../liquid-ui build
pnpm --dir ../liquid-app-shell build
pnpm install
pnpm dev
```

四个仓库位于同一父目录时，本地依赖按照未来 npm 包相同的 `dist/` 结构消费，因此必须先构建两个资源库。GitHub Actions 会自动分别检出这些仓库。

## 验证

```sh
pnpm build
pnpm test:visual
pnpm check
```

自动矩阵包含 75 项 Playwright 用例，覆盖：

- 亮色/暗色、海蓝/紫罗兰/翡翠/琥珀色板；
- 桌面、平板、手机三类视口；
- Surface、完整控件目录、表单、表格、反馈、Dialog、Drawer 和锚定浮层；
- Tab、方向键、Enter、Space、Escape、外部点击和焦点恢复；
- 受控值、语义材质、响应式布局及视觉快照无差异。

更新快照必须先人工检查变化，再运行：

```sh
pnpm test:visual:update
pnpm check
```

Trojan Panel 功能盘点见 [docs/trojan-panel-functional-baseline.md](docs/trojan-panel-functional-baseline.md)，仅作为业务结构基线。资源库本身不包含 Trojan Panel 的权限、路由、API 或样式覆盖。
