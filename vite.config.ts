import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        short_name: 'STRIKER BASE',
        name: 'STRIKER BASE - モンスト便利ツール',
        icons: [
          {
            src: '/striker-base-icon.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        start_url: '/',
        background_color: '#ffffff',
        display: 'standalone',
        theme_color: '#000000',
        description: 'STRIKER BASEは、モンストの攻略をサポートする便利ツールを提供します。',
        orientation: 'portrait-primary',
      },
    }),
  ],
});
