import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  build:{
    outDir: 'dist'
  },
  server: {
    // port: 5179,
    host: '192.168.1.31',
    port: 8080,
    // strictPort: true,
  },
  plugins: [react()],
})
