import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig(() => {
    return {
        plugins: [
            react(),
            createHtmlPlugin({
                // inject: {
                //     data: {
                //         env: {
                //             NODE_ENV: process.env.NODE_ENV,
                //             REACT_APP_ENV: process.env.REACT_APP_ENV,
                //         },
                //     },
                // },
                minify: true,
            }),
        ],
        resolve: {
            alias: {
                '~': path.resolve(__dirname, 'src'),
            },
        },
        server: {
            port: parseInt(process.env.PORT || '3000', 10),
            open: true,
        },
        preview: {
            port: parseInt(process.env.PORT || '3000', 10),
            open: true,
        },
        build: {
            outDir: 'build',
        },
    };
});
