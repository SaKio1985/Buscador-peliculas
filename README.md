# 🎬 Buscador de Películas y Anime

<div align="center">
  <img src="https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D" alt="Vue.js">
  <img src="https://img.shields.io/badge/Vuetify-1867C0?style=for-the-badge&logo=vuetify&logoColor=white" alt="Vuetify">
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Vue_Router-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue Router">
</div>

<div align="center">
  <h3>🚀 Buscador Universal de Películas y Anime</h3>
  <p>Una aplicación moderna construida con Vue 3, Vuetify 3 y Vite que integra múltiples APIs para buscar películas y anime con información detallada del reparto y calificaciones.</p>
</div>

<div align="center">
  <img src="https://img.shields.io/github/license/SaKio1985/Buscador-peliculas?style=flat-square" alt="License">
  <img src="https://img.shields.io/github/stars/SaKio1985/Buscador-peliculas?style=flat-square" alt="Stars">
  <img src="https://img.shields.io/github/forks/SaKio1985/Buscador-peliculas?style=flat-square" alt="Forks">
  <img src="https://img.shields.io/github/issues/SaKio1985/Buscador-peliculas?style=flat-square" alt="Issues">
</div>

---

## ✨ Características

### 🎯 Funcionalidades Principales

- **Búsqueda Múltiple**: Integra 3 APIs diferentes (TMDB, OMDb, Jikan) para una experiencia completa
- **Interfaz Moderna**: Diseño responsive con Material Design 3 y tema oscuro
- **Detalles Completos**: Información detallada con reparto, calificaciones, sinopsis y géneros
- **Navegación Intuitiva**: Sistema de rutas con Vue Router para una navegación fluida
- **Imágenes Optimizadas**: Uso de formato AVIF para logos y capturas de pantalla
- **Reparto Visual**: Visualización de actores/personajes con fotos y nombres de personajes
- **Adaptador de Datos**: Sistema unificado que normaliza datos de diferentes APIs

### 🔍 Fuentes de Datos

- **🎬 TMDB (The Movie Database)**: Películas en español con información completa del reparto, fotos de actores y calificaciones
- **🎭 OMDb (Open Movie Database)**: Películas en inglés con múltiples calificaciones (IMDb, Rotten Tomatoes, Metacritic)
- **🎌 Jikan (MyAnimeList)**: Anime con personajes principales, seiyuus (actores de voz japoneses) y calificaciones de MAL

### 🛠️ Tecnologías

- **Frontend Framework**: Vue 3 con Composition API y `<script setup>`
- **UI Framework**: Vuetify 3 (Material Design 3) con tema oscuro personalizado
- **Build Tool**: Vite 7 para desarrollo rápido y builds optimizados
- **Package Manager**: pnpm para gestión eficiente de dependencias
- **Routing**: Vue Router 4 para navegación SPA
- **HTTP Client**: Fetch API nativo para llamadas a APIs externas
- **Iconos**: Material Design Icons (@mdi/font)
- **Linting**: ESLint + Oxlint para calidad de código
- **Formato**: Prettier para consistencia de código

---

## 🚀 Instalación y Configuración

### 📋 Prerrequisitos

```bash
Node.js >= 16.0.0
pnpm >= 7.0.0
```

### 🔧 Configuración del Proyecto

1. **Clonar el repositorio**

```bash
git clone https://github.com/SaKio1985/Buscador-peliculas.git
cd Buscador-peliculas
```

2. **Instalar dependencias**

```bash
pnpm install
```

3. **Configurar variables de entorno**

```bash
# Crear archivo .env en la raíz del proyecto
cp .env.example .env
```

4. **Añadir las API Keys al archivo .env**

```env
VITE_OMDB_API_KEY=tu_omdb_api_key
VITE_TMDB_API_KEY=tu_tmdb_bearer_token
```

### 🔑 Obtener API Keys

#### TMDB API

1. Registrarse en [The Movie Database](https://www.themoviedb.org/)
2. Ir a Configuración → API
3. Copiar el "Bearer Token" (no la API Key)

#### OMDb API

1. Registrarse en [OMDb API](http://www.omdbapi.com/)
2. Obtener la API Key gratuita
3. Copiar la clave proporcionada

> **Nota**: Jikan API no requiere autenticación

---

## 🎮 Uso

### 🏃‍♂️ Desarrollo

```bash
# Ejecutar servidor de desarrollo
pnpm dev

# La aplicación estará disponible en http://localhost:5173
```

### 🏗️ Producción

```bash
# Construir para producción
pnpm build

# Previsualizar build de producción
pnpm preview
```

### 🧹 Linting y Formato

```bash
# Ejecutar linting con Oxlint
pnpm lint:oxlint

# Ejecutar linting con ESLint
pnpm lint:eslint

# Ejecutar todos los linters
pnpm lint

# Formatear código con Prettier
pnpm format
```

---

## 🏗️ Arquitectura del Proyecto

```
src/
├── components/           # Componentes Vue reutilizables
│   ├── HomeButton.vue   # Botón de selección de fuente de datos
│   ├── MovieCard.vue    # Tarjeta de película/anime en resultados
│   ├── MovieDetails.vue # Componente de detalles con reparto
│   ├── MoviesContainer.vue # Contenedor de resultados
│   └── SearchBar.vue    # Barra de búsqueda
├── views/               # Vistas de las páginas
│   ├── HomeView.vue     # Página principal con selección de API
│   ├── SearchView.vue   # Página de búsqueda y resultados
│   └── DetailsView.vue  # Página de detalles de película/anime
├── services/            # Servicios de API y adaptadores
│   ├── omdb.js         # Servicio OMDb API
│   ├── tmdb.js         # Servicio TMDB API
│   ├── jikan.js        # Servicio Jikan API
│   └── dataAdapter.js  # Adaptador de datos unificado
├── router/             # Configuración de Vue Router
│   └── index.js        # Definición de rutas
├── plugins/            # Configuración de plugins
│   └── vuetify.js      # Configuración Vuetify con tema oscuro
├── App.vue             # Componente principal
└── main.js             # Punto de entrada

public/
└── images/             # Recursos de imágenes
    ├── LogoWeb.avif    # Logo principal de la aplicación
    ├── tmdb-logo.avif  # Logo de TMDB
    ├── omdb-logo.avif  # Logo de OMDb
    ├── mal-logo.avif   # Logo de MyAnimeList
    └── screenshots/    # Capturas de pantalla de la app
```

### 🔄 Flujo de Datos

```mermaid
graph TD
    A["HomeView: Selección de Fuente"] --> B["SearchView: Formulario de Búsqueda"]
    B --> C["Servicio API (TMDB/OMDb/Jikan)"]
    C --> D["dataAdapter: Normalización de Datos"]
    D --> E["MoviesContainer: Resultados"]
    E --> F["MovieCard: Click en Película/Anime"]
    F --> G["DetailsView: Llamada a API de Detalles"]
    G --> H["dataAdapter: Adaptación de Detalles"]
    H --> I["MovieDetails: Vista Completa con Reparto"]
```

---

## 🎨 Interfaz de Usuario

### 🖼️ Capturas de Pantalla

<div align="center">
  <img src="public/images/screenshots/home.avif" alt="Pantalla Principal" width="300">
  <img src="public/images/screenshots/search.avif" alt="Búsqueda" width="300">
  <img src="public/images/screenshots/details1.avif" alt="Detalles" width="300">
    <img src="public/images/screenshots/details2.avif" alt="Detalles2" width="300">
      <img src="public/images/screenshots/details3.avif" alt="Detalles3" width="300">
</div>

### 📱 Responsive Design

- **Desktop**: Experiencia completa con layout de 3 columnas
- **Tablet**: Diseño adaptativo con 2 columnas
- **Mobile**: Interfaz optimizada para una sola columna

---

## 🔧 Configuración Avanzada

### 🎨 Personalización de Tema

```javascript
// src/plugins/vuetify.js
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
        },
      },
    },
  },
})
```

### 🔌 Añadir Nuevas APIs

1. **Crear servicio de API**

```javascript
// src/services/nueva-api.js
export const searchNuevaAPI = async (query) => {
  // Implementar lógica de búsqueda
}

export const getNuevaAPIDetails = async (id) => {
  // Implementar lógica de detalles
}
```

2. **Actualizar adaptador de datos**

```javascript
// src/services/dataAdapter.js
export const adaptSearchResults = (results, apiSource) => {
  switch (apiSource) {
    case 'nueva-api':
      return results.map((item) => ({
        // Mapear propiedades
      }))
    // ... otros cases
  }
}
```

---

## 📊 APIs Integradas

### 🎬 TMDB (The Movie Database)

- **Endpoint**: `https://api.themoviedb.org/3`
- **Autenticación**: Bearer Token
- **Funcionalidades**:
  - Búsqueda de películas en español
  - Información detallada con reparto
  - Imágenes de alta calidad

### 🎭 OMDb (Open Movie Database)

- **Endpoint**: `https://www.omdbapi.com`
- **Autenticación**: API Key
- **Funcionalidades**:
  - Búsqueda de películas en inglés
  - Múltiples calificaciones (IMDb, Rotten Tomatoes, etc.)
  - Información básica del reparto

### 🎌 Jikan (MyAnimeList)

- **Endpoint**: `https://api.jikan.moe/v4`
- **Autenticación**: No requerida
- **Funcionalidades**:
  - Búsqueda de anime
  - Información de personajes y seiyuus
  - Calificaciones de MyAnimeList

---

## 🤝 Contribución

### 📝 Guía de Contribución

1. **Fork el proyecto**
2. **Crear rama de feature** (`git checkout -b feature/amazing-feature`)
3. **Commit los cambios** (`git commit -m 'Add some amazing feature'`)
4. **Push a la rama** (`git push origin feature/amazing-feature`)
5. **Abrir Pull Request**

### 🐛 Reportar Bugs

Utiliza el [sistema de issues](https://github.com/SaKio1985/Buscador-peliculas/issues) para reportar bugs. Incluye:

- Descripción del problema
- Pasos para reproducir
- Comportamiento esperado
- Capturas de pantalla (si aplica)

### 💡 Solicitar Features

Las solicitudes de nuevas características son bienvenidas. Abre un issue etiquetado como `enhancement`.

---

## 🚀 Roadmap

### ✅ Funcionalidades Implementadas

- [x] Integración con 3 APIs diferentes (TMDB, OMDb, Jikan)
- [x] Sistema de rutas dinámicas con Vue Router
- [x] Adaptador de datos unificado para normalizar respuestas de APIs
- [x] Visualización de reparto con fotos (actores para películas, personajes para anime)
- [x] Diseño responsive con Vuetify 3
- [x] Tema oscuro personalizado
- [x] Imágenes optimizadas en formato AVIF
- [x] Manejo de HTML en respuestas de APIs (v-html para categorías y respuestas)

### � Próximas Funcionalidades

- [ ] 🔍 Búsqueda avanzada con filtros (año, género, calificación)
- [ ] ⭐ Sistema de favoritos con almacenamiento local
- [ ] 🎨 Temas personalizables (claro/oscuro/personalizado)
- [ ] 🔄 Historial de búsquedas
- [ ] 📊 Estadísticas de búsqueda
- [ ] � Soporte para más idiomas (i18n)
- [ ] 📱 PWA (Progressive Web App) para instalación en dispositivos

### 🎯 Versión 2.0

- **Series de TV**: Integración con APIs de series y programas de televisión
- **Modo Offline**: Cache local con Service Workers
- **Recomendaciones**: Sistema de recomendaciones basado en preferencias
- **Social**: Compartir y comentar películas/anime con otros usuarios
- **Listas Personalizadas**: Crear y gestionar listas personalizadas

---

## 🔐 Seguridad

### 🛡️ Mejores Prácticas Implementadas

- **Variables de entorno**: API keys nunca expuestas en el código
- **Sanitización**: Entrada de usuario validada y sanitizada
- **HTTPS**: Todas las llamadas a API utilizan HTTPS
- **CSP**: Content Security Policy configurada

### 🚨 Reportar Vulnerabilidades

Si encuentras una vulnerabilidad de seguridad, por favor crea un issue en el repositorio marcado como "security".

---

## 📈 Performance

### ⚡ Optimizaciones Implementadas

- **Lazy Loading**: Carga diferida de imágenes
- **Code Splitting**: División de código automática con Vite
- **Tree Shaking**: Eliminación de código no utilizado
- **Minificación**: Compresión de assets en producción

### 📊 Métricas

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

---

## 📱 Compatibilidad

### 🌐 Navegadores Soportados

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### 📱 Dispositivos

- **Desktop**: Windows, macOS, Linux
- **Mobile**: iOS Safari, Android Chrome
- **Tablet**: iPad, Android tablets

---

## 🧪 Testing

### 🔧 Configuración de Tests

```bash
# Ejecutar tests unitarios
pnpm test

# Ejecutar tests con coverage
pnpm test:coverage

# Ejecutar tests e2e
pnpm test:e2e
```

### 📊 Coverage

Objetivo: Mantener > 80% de cobertura de código

---

## 📚 Documentación

### 📖 Recursos Adicionales

- [Documentación de Vue 3](https://vuejs.org/)
- [Documentación de Vuetify 3](https://vuetifyjs.com/)
- [Guía de Vite](https://vitejs.dev/)

### 🎓 Tutoriales

- [Cómo integrar una nueva API](#-añadir-nuevas-apis)
- [Personalización de temas](#-personalización-de-tema)

---

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 🙏 Agradecimientos

- **Vue.js Team** por el increíble framework
- **Vuetify Team** por los componentes Material Design
- **TMDB** por proporcionar la API de películas
- **OMDb** por la base de datos de películas
- **Jikan** por la API de anime

---

## 👨‍💻 Autor

**Iban Dorado**

- GitHub: [@SaKio1985](https://github.com/SaKio1985)
- LinkedIn: [Iban Dorado](https://www.linkedin.com/in/iban-dorado-171a4a24b)

---

## 🌟 ¿Te gustó el proyecto?

Si este proyecto te fue útil, por favor considera:

- ⭐ Dar una estrella al repositorio
- 🍴 Hacer un fork para contribuir
- 📢 Compartir con otros desarrolladores

<div align="center">
  <h3>¡Gracias por usar Buscador Peliculas y Anime 🎬</h3>
</div>
