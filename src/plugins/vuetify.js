// src/plugins/vuetify.js

// Importa los estilos CSS necesarios para que Vuetify se vea bien
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

// Importa la función para crear Vuetify
import { createVuetify } from 'vuetify'

// Exporta la instancia de Vuetify configurada
export default createVuetify({
  theme: {
    defaultTheme: 'dark',
  },
})
