import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import inject from "@rollup/plugin-inject"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), inject(
    { Buffer: ['buffer', 'Buffer'] }
  )],
  optimizeDeps: {
    include: ['algosdk']
  },
  build: {
    commonjsOptions: {exclude: ['algosdk'], include: []},
  },
  resolve: {
    alias: {
      path: 'path-browserify'
    }
  }
})
