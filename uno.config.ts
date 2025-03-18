import {
  defineConfig,
  presetAttributify,
  presetWind3,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
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