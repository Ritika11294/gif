import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@giphy/js-fetch-api']
  },
  build: {
    rollupOptions: {
      external: ['@giphy/js-fetch-api']
    }
  }
});
