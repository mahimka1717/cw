import { defineConfig } from "vite";
import { resolve } from "path";
import handlebars from 'vite-plugin-handlebars';
import path from 'path';

export default defineConfig({
  css: {
    preprocessorOptions: {
      sass: {
        // Настройки SASS препроцессора
      },
    },
  },
  server: {
    host: true,
    port: 3000,
  },
  build: {
    rollupOptions: {
      input: {
        agency: path.resolve(__dirname, 'ai-mobile-agency.html'),
        findings: path.resolve(__dirname, 'ai-mobile-findings.html'),
        machines: path.resolve(__dirname, 'ai-mobile-machines.html'),
      }
    }
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/hbs'),
    })
  ],
});
