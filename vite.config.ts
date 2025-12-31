
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': 'src',
      '@components': 'src/components',
      '@modules': 'src/modules',
      '@app': 'src/app',
      '@store': 'src/app',
      '@utils': 'src/utils'
    }
  },
  server: {
    hmr: {
      overlay: false
    }
  }
})