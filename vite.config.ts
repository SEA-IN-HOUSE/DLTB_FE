import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  build:{
    outDir: 'dist'
  },
  server: {
<<<<<<< HEAD
    // host: '192.168.1.31',
    host:'localhost',
=======
    // port: 5179,
<<<<<<< HEAD
    // host: '192.168.1.31',
    host: 'localhost',
    port: 5180,
=======
    host: '192.168.1.31',
>>>>>>> adda894768f68ba1f016f12390eee94e73d44847
    port: 8080,
>>>>>>> 2baac73cb76a93a87dc93f715972741aa7c9e6dc
    // strictPort: true,
  },
  plugins: [react()],
})
