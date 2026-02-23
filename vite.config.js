import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Dev server: proxy API calls to the Express backend
  server: {
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
  // Build: output React app into "build" so the backend can serve it
  build: {
    outDir: "build",
    emptyOutDir: true,
  },
});
