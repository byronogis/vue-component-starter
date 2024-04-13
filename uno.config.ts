import {
  defineConfig,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      // scale: 1.2,
      prefix: 'i-',
      collections: {
        /**
         * <prefix><collection>-<icon> or <prefix><collection>:<icon>
         * @see https://unocss.dev/presets/icons
         */
        mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
      },
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
        'font-size': '1em',
      },
    }),

  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
})
