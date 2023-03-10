import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import VitePluginHtmlEnv from 'vite-plugin-html-env';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    VitePluginHtmlEnv({
      compiler: true,
    }),
    svgr(),
  ],
});
