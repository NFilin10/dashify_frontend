import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: [
      'a8a4-2001-7d0-8393-6f80-5822-be8e-afb8-7b7d.ngrok-free.app'
    ]
  }
})