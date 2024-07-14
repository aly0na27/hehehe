import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {createHtmlPlugin} from "vite-plugin-html";
import compression from 'vite-plugin-compression';

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
    }),
    compression({
      algorithm: "gzip", // Can be 'gzip' or 'brotliCompress'
      ext: ".gz", // The extension for compressed files
      deleteOriginFile: false})
  ],
  base: '',
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  build: {
    // assetsInlineLimit: 0,
    minify: 'terser',
    sourcemap: false,
  },
})
