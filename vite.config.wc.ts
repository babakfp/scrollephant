import { svelte } from "@sveltejs/vite-plugin-svelte"
import { defineConfig } from "vite"

export default defineConfig({
    plugins: [
        svelte({
            exclude: "*.svelte",
            emitCss: false,
        }),
        svelte({
            include: "*.svelte",
            compilerOptions: {
                customElement: true,
            },
        }),
    ],
    build: {
        target: "modules",
        outDir: "dist",
        sourcemap: process.env.NODE_ENV === "development" ? true : false,
        lib: {
            entry: "src/package/wc.js",
            fileName: "wc",
            name: "lib",
        },
    },
})
