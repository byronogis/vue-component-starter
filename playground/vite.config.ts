import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^@vue-component-starter\/(.+)$/,
        replacement: fileURLToPath(new URL(`../packages/$1/src`, import.meta.url)),
      },
    ],
  },
})
