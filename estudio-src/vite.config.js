import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// El sitio comercial vive en la raíz de calfers.com (es la página principal).
export default defineConfig(() => ({
  base: '/',
  plugins: [react()],
  server: {
    port: 5199,
    strictPort: true,
  },
}))
