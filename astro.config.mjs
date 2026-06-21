import { defineConfig } from 'astro/config';

// INFO CLINIC — статический премиум-лендинг + анкета.
// Ноль лишнего JS, авто-оптимизация ассетов, минификация.
export default defineConfig({
  site: 'https://info-clinic.example',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
    assets: '_assets',
  },
  image: {
    // astro:assets — WebP/AVIF, нужные размеры, lazy
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
});
