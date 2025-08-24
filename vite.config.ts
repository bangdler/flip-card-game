import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const base = command === "serve" ? "/" : "/flip-card-game/";

  return {
    plugins: [react(), tailwindcss()],
    base: base,
    build: {
      outDir: "dist",
      assetsDir: "assets",
      sourcemap: false,
    },
  };
});
