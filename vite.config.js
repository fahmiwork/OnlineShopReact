import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    base: "/", // ← penting saat kamu taruh hasil build di public/react Laravel
});
