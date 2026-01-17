import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import figmaAssets from './vite-figma-assets'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    figmaAssets(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'figma-plugin': path.resolve(__dirname, './src/plugin')
    },
  },
  define: {
    'process.env': {},
    'process.platform': JSON.stringify('win32'),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  },
  build: {
    rollupOptions: {
      external: ['figma-plugin']
    }
  },
  server: {
    fs: {
      strict: false
    },
    cors: true,
    proxy: {
      // Add proxy rules here if needed for Figma API
    }
  }
})
