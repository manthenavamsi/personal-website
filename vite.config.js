import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Served from https://manthenavamsi.github.io/personal-website/
  base: '/personal-website/',
  // Keep the REACT_APP_ prefix so .env (REACT_APP_WEB3FORMS_ACCESS_KEY) carries over from CRA
  envPrefix: ['VITE_', 'REACT_APP_'],
  build: {
    // gh-pages deploys this folder
    outDir: 'build',
  },
});
