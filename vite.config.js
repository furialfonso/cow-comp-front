import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), federation({
    filename: "cow-component-front-entry.js",
    name: "cow-component-front",
    shared: ["react", "react-dom"],
    exposes: {
      "./Users": "./src/components/users/Users.jsx",
    }
  })],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    host: true,
    port: 3000, // This is the port which we will use in docker
    // Thanks @sergiomoura for the window fix
    // add the next lines if you're using windows and hot reload doesn't work
    watch: {
      usePolling: true
    }
  },
  preview: {
    port: 8082,
  }
})
