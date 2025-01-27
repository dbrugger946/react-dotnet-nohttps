import { defineConfig } from "vite"
import react from "@vitejs/plugin-react";


//const urlTarget = 'http://localhost:8888';
//const urlTarget = 'http://reactdotnettsclient-weather-server-1:8080';
const urlTarget = 'http://weather-server:8080';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            // Target is your backend API
            '/api': {
                target: urlTarget,
                changeOrigin: true,
                secure: false,
                ws: true,
                //rewrite: (path) => path.replace(/^\/api/, ''),

                configure: (proxy, options) => {
                    console.log("options local address: " + options.localAddress);
                    proxy.on('error', (err, _req, _res) => {
                        console.log('error', err);
                    });
                    proxy.on('proxyReq', (proxyReq, req, _res) => {
                        console.log("proxyReq : " + proxyReq);
                        console.log('Request sent to target:', req.method, req.url);
                    });
                    proxy.on('proxyRes', (proxyRes, req, _res) => {
                        console.log('Response received from target:', proxyRes.statusCode, req.url);
                    });
                },
            },
        },
        port: 3000,
        host: '0.0.0.0',
    },
})