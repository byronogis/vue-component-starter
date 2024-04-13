import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import PostcssNested from 'postcss-nested'
import Autoprefixer from 'autoprefixer'
import { pascalCase } from 'change-case'
import pkg from './package.json'

const currentMonorepoPkgNameRegex = /@vue-component-starter\/(.*)/

export default defineConfig({
  plugins: [
    dts(),
    vue(),
    UnoCSS(),
  ],
  css: {
    postcss: {
      plugins: [
        PostcssNested(),
        Autoprefixer(),
      ],
    },
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: pascalCase(pkg.name),
      fileName: 'index',
    },
    minify: false,
    rollupOptions: {
      external: [
        currentMonorepoPkgNameRegex,
        // @ts-expect-error `peerDependencies`
        ...Object.keys(pkg.peerDependencies ?? {}),
      ],
      output: {
        globals(name) {
          return pascalCase(name)
          // if (currentMonorepoPkgNameRegex.test(name)) {
          //   return pascalCase(name)
          // }

          // return name
        },
      },
    },
  },
})
