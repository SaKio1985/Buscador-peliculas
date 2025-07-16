// vite.config.js

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 1. Importa el plugin de Vuetify
import vuetify from 'vite-plugin-vuetify'

// (No es necesario importar vueDevTools, se inyecta automáticamente si está instalado)

export default defineConfig({
  plugins: [
    vue(),

    // 2. Añade el plugin de Vuetify AQUÍ
    vuetify({
      autoImport: true, // Esto importa automáticamente los componentes que usas
    }),
  ],
  // La configuración de alias y resolve no es estrictamente necesaria para que esto funcione,
  // pero la mantenemos por si la usas en el futuro.
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
    },
  },
})
