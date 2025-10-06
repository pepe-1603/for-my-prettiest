// vite.config.js
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue' // Importamos el plugin de Vue

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), // Aquí lo usamos
  ],
  resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
})
