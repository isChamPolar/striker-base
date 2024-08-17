import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import obfuscatorPlugin from 'vite-plugin-obfuscator'

export default defineConfig({
  plugins: [
    react(),
    // obfuscatorPlugin({
    //   globalOptions: {
    //     debugProtection: true,
    //   }
    // }),
  ],
  base: '/striker-base/',
})
