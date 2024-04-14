import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [
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
  optimizeDeps: {
    exclude: ['@vue/repl'],
  },
  ssr: {
    noExternal: ['@vue/repl'],
  },
})
