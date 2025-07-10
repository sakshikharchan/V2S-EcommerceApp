// import { defineConfig } from 'vite';
//   import react from '@vitejs/plugin-react';

//   export default defineConfig({
//     plugins: [react()],
//     test: {
//       environment: 'jsdom',
//       setupFiles: './src/setupTests.js',
//       globals: true,
//     },
//   });
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/products': 'http://localhost:5000'
    }
  }
});
