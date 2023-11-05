import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // port: 5179,
    // host: '192.168.1.31',
    host: 'localhost',
    port: 5180,
    // strictPort: true,
  },
  plugins: [react()],
})
