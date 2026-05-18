import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The proxy lets the frontend call /api/login locally without CORS pain.
// In production we'll either serve the SPA from behind the ALB on the same
// origin, or set VITE_API_BASE_URL at build time.
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/health': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
  },
});
