const path = require('path');
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: './src/forms.ts',
      name: 'vuniform',
    },
    rollupOptions: {
      external: [
        'vue',
        'pinia',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    dedupe: [
      'vue',
      'pinia',
    ]
  },
  plugins: [
    vue(),
    dts(),
  ],
});
