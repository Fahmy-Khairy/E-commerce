import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/E-commerce/',
  plugins: [react()],
  // server:{
  //   port:3333,
  // }
})
