/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

const env = loadEnv("", process.cwd());
const apiUrl = env.VITE_APP_API_URL || "http://localhost:8080";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: apiUrl,
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/member/, "/"),
      },
      "/user": {
        target: apiUrl,
        changeOrigin: true,
        secure: false,
      },
      "/board": {
        target: apiUrl,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    globals: true,
  },
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
});
