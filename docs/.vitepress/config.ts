import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'
import fg from 'fast-glob'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'vue-component-starter',
  description: 'vue-component-starter',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      // guide api components playground
      { text: 'Guide', link: '/guide/' },
      { text: 'Components', link: '/components/' },
      { text: 'Playground', link: '/playground' },
    ],

    sidebar: {
      '/guide/': getSideBar('../guide/*.md'),
      '/components/': getSideBar('../components/*.md'),
    },
    // sidebar: [
    //   {
    //     text: 'Guide',
    //     items: getSideBar('../guide/*.md'),
    //   },
    //   {
    //     text: 'Components',
    //     items: getSideBar('../components/*.md'),
    //   },
    // ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/byronogis/vue-component-starter' },
    ],
  },
  markdown: {
    // @mdit-vue/plugin-toc 的选项
    // https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-toc#options
    toc: { level: [1, 4] },
  },
})

function getAbsolutePath(path: string) {
  return fileURLToPath(new URL(path, import.meta.url))
}

function getSideBar(source: string) {
  // TODO index should be first
  return fg.sync(getAbsolutePath(source), { objectMode: true }).map(({ name, path }) => {
    const text = name.replace(/\.md$/, '')
    const link = path.replace(getAbsolutePath('../'), '').replace(/\.md$/, '')
    return { text, link }
  })
}
