import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import legacy from '@vitejs/plugin-legacy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    tailwindcss(),
    legacy({
      targets: [
        'Firefox >= 60',
        'Chrome >= 67',
        'Safari >= 11',
        'Edge >= 79'
      ],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      renderLegacyChunks: true,
      polyfills: [
        'es.symbol',
        'es.promise',
        'es.promise.finally',
        'es/map',
        'es/set',
        'es.array.filter',
        'es.array.for-each',
        'es.array.flat-map',
        'es.object.define-properties',
        'es.object.define-property',
        'es.object.get-own-property-descriptor',
        'es.object.get-own-property-descriptors',
        'es.object.keys',
        'es.object.to-string',
        'web.dom-collections.for-each',
        'esnext.global-this',
        'esnext.string.match-all'
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: '/v2/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          primevue: ['primevue'],
          vendor: ['vue', 'pinia'],
          calendar: ['./src/store/calendar.ts', './src/store/data.ts', './src/store/common.ts'],
          components: [
            './src/components/TheElement.vue',
            './src/components/TheGridLineHorizontal.vue',
            './src/components/TheGridLineVertical.vue',
            './src/components/TheLeftSide.vue',
          ],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['vue', 'pinia', 'primevue'],
  },
  esbuild: {
    target: 'es2017',
  },
})
