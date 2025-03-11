import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '',  // This ensures assets are loaded relative to index.html
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Keep the original file names for assets in the public directory
          if (assetInfo.name.includes('/assets/')) {
            return assetInfo.name
          }
          return `assets/[name]-[hash][extname]`
        }
      }
    }
  }
})
