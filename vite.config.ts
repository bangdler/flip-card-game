import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/flip-card-game/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
  },
});
