import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// El frontend llama a /api/* (mismo origen) y Vite lo reenvía a la API dummy.
// Así el navegador no hace peticiones cross-origin en desarrollo.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
});
