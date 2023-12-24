import { svelte } from "@sveltejs/vite-plugin-svelte"
import { defineConfig } from "vite"

export default defineConfig({
    envPrefix: "PUBLIC_",
    resolve: {
        alias: {
            $lib: "./src/lib",
        },
    },
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
            entry: "src/lib/index.js",
            fileName: "index",
            name: "lib",
        },
    },
})
