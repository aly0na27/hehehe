import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '',
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  css: {
    minify: true, // Включить минификацию CSS
  },
  html: {
    minify: true
  },
  build: {
    assetsInlineLimit: 0, // Отключает встраивание изображений как data URI
  },
})
