import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://meistermode-carsharing-backend-7481.twc1.net:8000',
      '/storage': 'http://https://meistermode-carsharing-backend-7481.twc1.net:8000'
    }
  }
});
