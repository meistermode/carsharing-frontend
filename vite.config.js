import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://https://meistermode-carsharing-backend-7481.twc1.net:8000',
      '/storage': 'https://https://meistermode-carsharing-backend-7481.twc1.net:8000'
    }
  }
});
