import { defineConfig, optimizeDeps } from "vite";
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({

    base: "./",
    // publicDir: "./assets", // this would copy all assets in the outdir (but not inside assets)
    assetsInclude: ['*'],
    // logLevel: 'info',

    plugins: [
        viteCompression({deleteOriginFile: true}),
        visualizer(),
    ],

    server: {
        // hmr: false,
        // watch: ["generated/**"]
        https: true,
        watch: {
            awaitWriteFinish: {
                stabilityThreshold: 500,
                pollInterval: 1000
            },
        }
    },
    build: {
        outDir: "./dist",
        emptyOutDir: true,
        keepNames:true,
    },

    esbuild: {
        // KEEP NAMES so that getComponent can rely on constructor names
        // otherwise I've had issues that getComponent didnt find the type when called with the constructor
        // maybe there is a better way to do it. Until then this should be ok I guess
        keepNames: true
    }
});