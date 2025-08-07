import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // В современных версиях Vite SPA роутинг работает автоматически в dev режиме
  // Для production используем vercel.json
})
