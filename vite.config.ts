import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(), 
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['icon-192.png', 'icon-512.png'],
        manifest: {
          name: 'Sahara - Disaster Response',
          short_name: 'Sahara',
          description: 'Support in every storm.',
          theme_color: '#1A73E8',
          background_color: '#F0F4F8',
          display: 'standalone',
          orientation: 'portrait',
          start_url: '/',
          icons: [
            { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
            { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,json}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/tile\.openstreetmap\.org\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'osm-map-tiles',
                expiration: { maxEntries: 1000, maxAgeSeconds: 60 * 60 * 24 * 30 },
                cacheableResponse: { statuses: [0, 200] }
              }
            },
            {
              urlPattern: /^https:\/\/api\.open-meteo\.com\/.*/i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'weather-cache',
                expiration: { maxEntries: 10, maxAgeSeconds: 60 * 30 },
                cacheableResponse: { statuses: [0, 200] }
              }
            },
            {
              urlPattern: /^https:\/\/newsdata\.io\/.*/i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'news-cache',
                expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 },
                cacheableResponse: { statuses: [0, 200] }
              }
            }
          ]
        }
      })
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
