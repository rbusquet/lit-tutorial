import {defineConfig, splitVendorChunkPlugin} from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [splitVendorChunkPlugin()],
  build: {
    lib: {
      entry: "src/my-element.ts",
      formats: ["es"],
    },
    rollupOptions: {
      external: /^lit/,
    },
  },
});
