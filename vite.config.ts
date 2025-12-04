import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginManusRuntime()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
    },
  },
  root: 'client',
  build: {
    outDir: '../dist/public',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
  }
})
