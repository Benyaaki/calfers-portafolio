import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// En producción el sitio vive en calfers.com/servicios/, así que las rutas
// de assets deben colgar de /servicios/. En desarrollo usamos la raíz.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/servicios/' : '/',
  plugins: [react()],
  server: {
    port: 5199,
    strictPort: true,
  },
}))
