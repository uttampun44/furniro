import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000', 
        changeOrigin: true,
        // secure: false,
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
  resolve:{
    alias:{
      '@components': path.resolve(__dirname, './src/components'),
       '@types': path.resolve(__dirname, './src/components')
    }
  }
})
