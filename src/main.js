console.log('¡¡¡ main.js SE ESTÁ EJECUTANDO !!!') // src/main.js

import { createApp } from 'vue'
import App from './App.vue'

// Importa la configuración de Vuetify desde la carpeta de plugins
import vuetify from './plugins/vuetify'

// Crea la aplicación
const app = createApp(App)

// Usa el plugin de Vuetify
// Esta es la línea que registra todos los componentes como <v-btn>, <v-card>, etc.
app.use(vuetify)

// Monta la aplicación en el DOM
app.mount('#app')
