// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// ✅ ajoute ces imports PostCSS
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // ✅ force l'utilisation de Tailwind au build (et en dev)
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
    // (optionnel) utile pour diagnostiquer : sourcemaps CSS en dev
    devSourcemap: true,
  },
}));
