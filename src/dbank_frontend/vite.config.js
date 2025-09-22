import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';
import environment from 'vite-plugin-environment';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config({ path: '../../.env' });

export default defineConfig(({ mode }) => ({
  build: {
    emptyOutDir: true,
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
      },
    },
  },
  publicDir: "assets",
  define: {
    'import.meta.env.CANISTER_ID_DBANK_BACKEND': JSON.stringify(process.env.CANISTER_ID_DBANK_BACKEND),
    'import.meta.env.CANISTER_ID_DBANK_FRONTEND': JSON.stringify(process.env.CANISTER_ID_DBANK_FRONTEND),
    'import.meta.env.DFX_NETWORK': JSON.stringify(process.env.DFX_NETWORK),
  },
  plugins: [
    environment("all", { prefix: "CANISTER_" }),
    environment("all", { prefix: "DFX_" }),
  ],
  resolve: {
    alias: [
      {
        find: "declarations",
        replacement: fileURLToPath(
          new URL("../declarations", import.meta.url)
        ),
      },
    ],
  },
}));
