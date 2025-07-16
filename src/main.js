import { createApp } from 'vue'
import App from './App.vue'

// Importa la configuración de Vuetify desde la carpeta de plugins
import vuetify from './plugins/vuetify'

// Crea la aplicación
const app = createApp(App)

// Usamos vuetify
app.use(vuetify)

// Monta la aplicación en el DOM
app.mount('#app')
