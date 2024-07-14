import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {createHtmlPlugin} from "vite-plugin-html";

export default defineConfig({
  plugins: [react(),
    createHtmlPlugin({
      minify: {
        removeComments: true, // Удаляет комментарии
        collapseWhitespace: true, // Удаляет лишние пробелы
        removeAttributeQuotes: true, // Удаляет кавычки вокруг атрибутов
        minifyCSS: true, // Минифицирует встроенный CSS
        minifyJS: true, // Минифицирует встроенный JavaScript
      }
    })],
  base: '',
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  build: {
    assetsInlineLimit: 0,
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          if (id.includes('src/components')) {
            return 'components';
          }
        },
      },
    },
  },

})
