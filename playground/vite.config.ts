import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
  ],
  resolve: {
    alias: [
      {
        find: /^@vue-component-starter\/(.+)$/,
        replacement: fileURLToPath(new URL(`../packages/$1/src`, import.meta.url)),
      },
    ],
  },
})
