import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'

// 应用仓库根目录 unocss 预设，配置文件在根目录的 uno.config.ts
import 'virtual:uno.css'

export default {
  extends: DefaultTheme,
  // eslint-disable-next-line unused-imports/no-unused-vars
  enhanceApp({ app }) {
    // 注册其他插件、全局组件、provide...
  },
} satisfies Theme
