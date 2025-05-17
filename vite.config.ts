import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Acepta conexiones externas
    port: 8081,
    watch: {
      usePolling: true,  // Necesario para Docker en algunos sistemas
    },
    hmr: {
      clientPort: 8081,  
    }
  }
});