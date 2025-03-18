import {
  defineConfig,
  presetAttributify,
  presetWind3,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  shortcuts: [
    {
      'bento-box': 'rounded-lg shadow-md bg-white border border-gray-200'
    }
  ],
  presets: [
    presetAttributify(),
    presetIcons(),
    presetWind3()
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup()
  ],
})