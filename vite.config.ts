import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools(), tailwindcss()],
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
})
