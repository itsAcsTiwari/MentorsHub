import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/event': 'http://localhost:5001'  // Assuming your backend runs on port 4000
    }
  }
})
