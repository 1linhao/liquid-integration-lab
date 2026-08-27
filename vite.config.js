import { defineConfig } from 'vite'

export default defineConfig({
  // 相对资源路径让同一个构建既能部署到 GitHub Pages 子路径，也能本地预览。
  base: './'
})
