import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import svgr from "vite-plugin-svgr";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    plugins: [
        svgr(),
        react({
            babel: {
                plugins: [["babel-plugin-react-compiler"]],
            },
        }),
    ],

    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),

            "@/app": path.resolve(__dirname, "./src/app"),
            "@/shared": path.resolve(__dirname, "./src/shared"),
            "@/entities": path.resolve(__dirname, "./src/entities"),
            "@/features": path.resolve(__dirname, "./src/features"),
            "@/widgets": path.resolve(__dirname, "./src/widgets"),
            "@/pages": path.resolve(__dirname, "./src/pages"),
            "@/types": path.resolve(__dirname, "./src/types"),

            "@shared": path.resolve(__dirname, "../shared/src"),

            "@design-system": path.resolve(__dirname, "../design-system/src"),
            "@ds": path.resolve(__dirname, "../design-system/src"),
        },
    },

    server: {
        proxy: {
            "/api": {
                target: "http://localhost:7183",
                changeOrigin: true,
            },
        },
    },
});
