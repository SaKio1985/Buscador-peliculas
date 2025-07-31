<script setup>
import { ref, computed } from 'vue'

// Importaciones (sin cambios)
import { searchOMDb, getOMDbDetails } from '@/services/omdb.js'
import { searchTMDB, getTMDBDetails } from '@/services/tmdb.js'
import { searchJikan, getJikanDetails } from '@/services/jikan.js'
import { adaptSearchResults, adaptDetails } from '@/services/dataAdapter.js'
import HomeButton from '@/components/HomeButton.vue'
import SearchBar from '@/components/SearchBar.vue'
import MoviesContainer from '@/components/MoviesContainer.vue'
import MovieDetails from '@/components/MovieDetails.vue'

// --- Estado de la aplicación ---
const searchTerm = ref('')
const searchType = ref(null) // <-- CAMBIO CLAVE: Inicia en null
const searchResults = ref([])
const selectedItem = ref(null)
const loading = ref(false)
const error = ref(null)

// Texto dinámico para el campo de búsqueda
const placeholderText = computed(() => {
  if (searchType.value === 'tmdb') return 'Buscar películas en español...'
  if (searchType.value === 'omdb') return 'Buscar películas en inglés...'
  if (searchType.value === 'jikan') return 'Buscar anime...'
  return 'Buscar...'
})

// --- Lógica Principal ---

// NUEVA FUNCIÓN: Se ejecuta al hacer clic en un botón de fuente
const selectSearchSource = (source) => {
  searchType.value = source
  // Limpiamos todo para una nueva sesión de búsqueda
  error.value = null
  searchResults.value = []
  selectedItem.value = null
}

// FUNCIÓN MODIFICADA: Ahora reinicia la selección de fuente
const goBack = () => {
  selectedItem.value = null
  searchResults.value = []
  searchType.value = null // <-- Vuelve a la pantalla de selección de fuente
  searchTerm.value = '' // Limpia el texto de búsqueda
  error.value = null
}

// handleSearch y getDetails se quedan exactamente igual que antes.
// No es necesario copiarlas de nuevo si ya las tienes.

const handleSearch = async () => {
  if (searchTerm.value.trim() === '') {
    error.value = 'Por favor, escribe un término de búsqueda.'
    return
  }
  loading.value = true
  selectedItem.value = null
  searchResults.value = []
  error.value = null

  try {
    let rawResults
    switch (searchType.value) {
      case 'omdb':
        rawResults = await searchOMDb(searchTerm.value)
        break
      case 'tmdb':
        rawResults = await searchTMDB(searchTerm.value)
        break
      case 'jikan':
        rawResults = await searchJikan(searchTerm.value)
        break
    }
    searchResults.value = adaptSearchResults(rawResults, searchType.value)
    if (searchResults.value.length === 0) {
      error.value = 'No se encontraron resultados para tu búsqueda.'
    }
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

/* const getDetails = async (item) => {
  loading.value = true
  selectedItem.value = null
  error.value = null
  try {
    let rawDetails
    switch (item.source) {
      case 'omdb':
        rawDetails = await getOMDbDetails(item.id)
        break
      case 'tmdb':
        rawDetails = await getTMDBDetails(item.id)
        break
      case 'jikan':
        rawDetails = await getJikanDetails(item.id)
        break
    }
    selectedItem.value = adaptDetails(rawDetails, item.source)
    searchResults.value = []
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
} */

// Esta función ahora será llamada por el evento de MoviesContainer
const handleItemSelected = async (item) => {
  loading.value = true
  selectedItem.value = null
  error.value = null
  try {
    let rawDetails
    switch (item.source) {
      case 'omdb':
        rawDetails = await getOMDbDetails(item.id)
        break
      case 'tmdb':
        rawDetails = await getTMDBDetails(item.id)
        break
      case 'jikan':
        rawDetails = await getJikanDetails(item.id)
        break
    }
    selectedItem.value = adaptDetails(rawDetails, item.source)
    searchResults.value = []
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="10" lg="8">
            <!-- ======================================================= -->
            <!-- VISTA 1: SELECCIÓN DE FUENTE (CUANDO searchType ES NULL) -->
            <!-- ======================================================= -->
            <div v-if="!searchType">
              <v-img
                src="/images/LogoWeb.avif"
                aspect-ratio="16/5"
                max-width="700"
                contain
                class="mx-auto mb-8"
                alt="Logo"
              />
              <p class="text-center text-h6 mb-8 text-grey-lighten-1">¿Qué quieres buscar hoy?</p>

              <v-row>
                <!-- Botón TMDB -->
                <v-col cols="12" md="4">
                  <HomeButton
                    imagen="/images/tmdb-logo.avif"
                    titulo="TMDB"
                    api="tmdb"
                    @selectSearchSource="selectSearchSource"
                  />
                </v-col>

                <!-- Botón OMDb -->
                <v-col cols="12" md="4">
                  <HomeButton
                    imagen="/images/omdb-logo.avif"
                    titulo="IMDB"
                    api="omdb"
                    @selectSearchSource="selectSearchSource"
                  />
                </v-col>

                <!-- Botón Jikan (MyAnimeList) -->
                <v-col cols="12" md="4">
                  <HomeButton
                    imagen="/images/mal-logo.avif"
                    titulo="Anime"
                    api="jikan"
                    @selectSearchSource="selectSearchSource"
                  />
                </v-col>
              </v-row>
            </div>

            <!-- ====================================================== -->
            <!-- VISTA 2: BÚSQUEDA ACTIVA (CUANDO searchType TIENE VALOR) -->
            <!-- ====================================================== -->
            <div v-else>
              <!-- Botón para volver a la selección de fuente -->
              <v-btn
                v-if="!selectedItem"
                @click="goBack"
                prepend-icon="mdi-arrow-left"
                variant="text"
                class="mb-4"
              >
                Cambiar fuente
              </v-btn>

              <!-- Botón para volver a los resultados de búsqueda -->
              <v-btn
                v-if="selectedItem"
                @click="selectedItem = null"
                prepend-icon="mdi-arrow-left"
                variant="text"
                class="mb-4"
              >
                Volver a los resultados
              </v-btn>

              <SearchBar
                v-if="!selectedItem"
                v-model="searchTerm"
                :placeholder-text="placeholderText"
                :loading="loading"
                @search="handleSearch"
              />

              <!-- Alerta de Error -->
              <v-alert
                v-if="error"
                type="error"
                variant="tonal"
                closable
                class="mb-8"
                :text="error"
                @update:model-value="error = null"
              ></v-alert>

              <!-- Lista de Resultados de Búsqueda -->
              <v-row v-if="searchResults.length > 0" dense>
                <MoviesContainer
                  :searchResults="searchResults"
                  @item-selected="handleItemSelected"
                />
              </v-row>
              <MovieDetails :selectedItem="selectedItem" :loading="loading" />

              <!-- Tarjeta de Detalles del Item Seleccionado -->
            </div>

            <div
              class="text-center mt-12"
              v-if="searchType === 'tmdb' || selectedItem?.source === 'tmdb'"
            >
              <p class="text-caption text-grey">
                This product uses the TMDB API but is not endorsed or certified by TMDB.
              </p>
              <v-img src="/images/tmdb-logo.svg" height="20" contain></v-img>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.source-card {
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
.source-card:hover {
  transform: translateY(-5px);
  border-color: rgb(var(--v-theme-primary));
}

.v-card {
  transition: transform 0.2s ease-in-out;
}
.actor-card {
  width: 100px; /* Ancho fijo para cada tarjeta de actor */
}
.actor-name {
  font-weight: 500;
  white-space: normal; /* Permite que el nombre ocupe varias líneas */
  line-height: 1.2;
}
.character-name {
  color: #aaa; /* Un color más suave para el nombre del personaje */
}
</style>
