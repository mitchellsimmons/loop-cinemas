import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs/promises';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 3000,
    },
    preview: {
        port: 3000,
    },
    plugins: [react()],
    esbuild: {
        loader: 'jsx',
        include: /src\/.*\.jsx?$/,
        // loader: "tsx",
        // include: /src\/.*\.[tj]sx?$/,
        exclude: [],
    },
    optimizeDeps: {
        esbuildOptions: {
            plugins: [
                {
                    name: 'load-js-files-as-jsx',
                    setup(build) {
                        build.onLoad(
                            { filter: /src\/.*\.js$/ },
                            async (args) => ({
                                loader: 'jsx',
                                contents: await fs.readFile(args.path, 'utf8'),
                            })
                        );
                    },
                },
            ],
        },
    },

    resolve: {
        alias: [
            {
                find: '@',
                replacement: path.resolve(__dirname, 'src'),
            },
            {
                find: /^components$/,
                replacement: path.resolve(__dirname, 'src/components/index.js'),
            },
            {
                find: /^assets$/,
                replacement: path.resolve(__dirname, 'src/assets/index.js'),
            },
            {
                find: /^layouts$/,
                replacement: path.resolve(__dirname, 'src/layouts/index.js'),
            },
            {
                find: /^views\/Booking$/,
                replacement: path.resolve(
                    __dirname,
                    'src/views/Booking/index.js'
                ),
            },
            {
                find: /^views\/Error$/,
                replacement: path.resolve(
                    __dirname,
                    'src/views/Error/index.js'
                ),
            },
            {
                find: /^views\/Home$/,
                replacement: path.resolve(__dirname, 'src/views/Home/index.js'),
            },
            {
                find: /^views\/Movie$/,
                replacement: path.resolve(
                    __dirname,
                    'src/views/Movie/index.js'
                ),
            },
            {
                find: /^views\/Profile$/,
                replacement: path.resolve(
                    __dirname,
                    'src/views/Profile/index.js'
                ),
            },
            {
                find: /^views\/SignIn$/,
                replacement: path.resolve(
                    __dirname,
                    'src/views/SignIn/index.js'
                ),
            },
            {
                find: /^views\/SignUp$/,
                replacement: path.resolve(
                    __dirname,
                    'src/views/SignUp/index.js'
                ),
            },
        ],
    },
});
