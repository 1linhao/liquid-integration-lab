# Liquid 集成示例与视觉回归

[![集成验收](https://github.com/1linhao/liquid-integration-lab/actions/workflows/ci.yml/badge.svg)](https://github.com/1linhao/liquid-integration-lab/actions/workflows/ci.yml)
[![在线演示](https://github.com/1linhao/liquid-integration-lab/actions/workflows/pages.yml/badge.svg)](https://1linhao.github.io/liquid-integration-lab/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

这是一个可运行的 Vue 2 示例应用，展示 [LiquidUI](https://github.com/1linhao/liquid-ui) 与 [LiquidAppShell](https://github.com/1linhao/liquid-app-shell) 的组合方式。它同时保存跨主题、跨视口的 Playwright 视觉基线，适合以下使用者：

- 希望先查看完整控件和响应式 Shell 再决定是否采用 Liquid 的开发者；
- 正在集成 LiquidUI，需要参考表单、表格、浮层、反馈和主题用法的项目；
- 修改 LiquidUI 或 LiquidAppShell 后，需要运行完整视觉回归的贡献者。

项目总览与仓库选型见 [Liquid 公共入口](https://github.com/1linhao/liquid)。本仓库是示例与测试工程，不作为依赖包安装。

## 在线演示

[![LiquidUI 与 LiquidAppShell 暗色主题组合效果](tests/visual/material-matrix.spec.js-snapshots/dark-violet-desktop-linux.png)](https://1linhao.github.io/liquid-integration-lab/?mode=dark&palette=violet)

[打开完整演示](https://1linhao.github.io/liquid-integration-lab/) · [亮色海蓝](https://1linhao.github.io/liquid-integration-lab/?mode=light&palette=blue) · [暗色紫罗兰](https://1linhao.github.io/liquid-integration-lab/?mode=dark&palette=violet) · [组件区域](https://1linhao.github.io/liquid-integration-lab/?mode=light&palette=emerald#components)

演示是可操作的真实消费端，不是静态设计稿。可以调整窗口宽度验证桌面、平板和手机布局，切换主题与材质质量，并操作表单验证、表格排序、浮层、Dialog、Drawer 和反馈服务。

## 获取并运行

三个仓库需要位于同一工作目录，以便示例使用待验证的本地构建：

```sh
mkdir liquid-workspace
cd liquid-workspace
git clone https://github.com/1linhao/liquid-ui.git
git clone https://github.com/1linhao/liquid-app-shell.git
git clone https://github.com/1linhao/liquid-integration-lab.git

npm --prefix liquid-ui install
npm --prefix liquid-ui run build
pnpm --dir liquid-app-shell install
pnpm --dir liquid-app-shell build
pnpm --dir liquid-integration-lab install
pnpm --dir liquid-integration-lab dev
```

开发服务器默认由 Vite 启动，终端会显示访问地址。

## 覆盖范围

自动矩阵包含 75 项 Playwright 用例：

- 亮色与暗色模式，以及海蓝、紫罗兰、翡翠、琥珀四色色板；
- 桌面、平板、手机三类视口；
- Surface、表单、表格、反馈、Dialog、Drawer、Select、DatePicker 和锚定浮层；
- Tab、方向键、Enter、Space、Escape、外部点击和焦点恢复；
- 受控值、语义材质、响应式布局和视觉快照。

## 运行发布级检查

截图会受到宿主操作系统字体和 Chromium 构建影响。正式基线固定使用 `mcr.microsoft.com/playwright:v1.62.1-noble`，可在安装 Docker 的机器上运行与 CI 完全相同的检查：

```sh
cd liquid-workspace/liquid-integration-lab
docker run --rm --ipc=host -e CI=1 \
  -v "$(pwd)/..:/work" \
  -v liquid-integration-node-modules:/work/liquid-integration-lab/node_modules \
  -w /work/liquid-integration-lab \
  mcr.microsoft.com/playwright:v1.62.1-noble \
  bash -lc 'corepack enable && corepack prepare pnpm@10.29.3 --activate && pnpm install --frozen-lockfile && pnpm check'
```

需要更新视觉基线时，将最后的 `pnpm check` 替换为 `pnpm test:visual:update && pnpm check`。提交前应检查变化后的图片，并确保随后无更新的复验为 75/75 通过。

## 许可证

MIT。
