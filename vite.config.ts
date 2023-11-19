import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  build:{
    outDir: 'dist'
  },
  server: {
    // host: '192.168.1.31',
    host:'localhost',
    port: 8080,
    // strictPort: true,
  },
  plugins: [react()],
})
