import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: 'https://healthcare-dun.vercel.app//',
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
});
