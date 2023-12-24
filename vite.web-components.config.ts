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
        lib: {
            entry: "src/package/index.ts",
            fileName: "index",
            name: "lib",
        },
    },
})
