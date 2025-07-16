<script setup>
import { ref, computed } from 'vue'

// Importaciones (sin cambios)
import { searchOMDb, getOMDbDetails } from '@/services/omdb.js'
import { searchTMDB, getTMDBDetails } from '@/services/tmdb.js'
import { searchJikan, getJikanDetails } from '@/services/jikan.js'
import { adaptSearchResults, adaptDetails } from '@/services/dataAdapter.js'

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

const getDetails = async (item) => {
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
              <h1 class="text-h3 text-center mb-8 text-primary">Buscador Universal</h1>
              <p class="text-center text-h6 mb-8 text-grey-lighten-1">¿Qué quieres buscar hoy?</p>

              <v-row>
                <!-- Botón TMDB -->
                <v-col cols="12" md="4">
                  <v-card @click="selectSearchSource('tmdb')" class="source-card" hover>
                    <v-img src="/images/tmdb-logo.avif" contain height="80" class="my-4"></v-img>
                    <v-card-text class="text-center font-weight-bold">
                      Películas (tmdb)
                    </v-card-text>
                  </v-card>
                </v-col>

                <!-- Botón OMDb -->
                <v-col cols="12" md="4">
                  <v-card @click="selectSearchSource('omdb')" class="source-card" hover>
                    <div class="d-flex justify-center align-center my-4" style="height: 80px">
                      <h2 class="text-h4 font-weight-black">OMDb</h2>
                    </div>
                    <v-card-text class="text-center font-weight-bold">
                      Películas (omdb)
                    </v-card-text>
                  </v-card>
                </v-col>

                <!-- Botón Jikan (MyAnimeList) -->
                <v-col cols="12" md="4">
                  <v-card @click="selectSearchSource('jikan')" class="source-card" hover>
                    <v-img src="/images/mal-logo.avif" contain height="80" class="my-4"></v-img>
                    <v-card-text class="text-center font-weight-bold"> Anime </v-card-text>
                  </v-card>
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

              <!-- Formulario de Búsqueda -->
              <form v-if="!selectedItem" @submit.prevent="handleSearch" class="d-flex ga-2 mb-8">
                <v-text-field
                  v-model="searchTerm"
                  :label="placeholderText"
                  variant="solo-filled"
                  hide-details
                  clearable
                  autofocus
                  @keydown.enter="handleSearch"
                ></v-text-field>
                <v-btn
                  type="submit"
                  color="primary"
                  size="large"
                  :loading="loading"
                  :disabled="loading"
                >
                  Buscar
                </v-btn>
              </form>

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
                <v-col
                  v-for="result in searchResults"
                  :key="`${result.source}-${result.id}`"
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-card @click="getDetails(result)" hover class="fill-height d-flex flex-column">
                    <v-img :src="result.poster" aspect-ratio="2/3" cover>
                      <template v-slot:error>
                        <v-sheet
                          color="grey-darken-3"
                          class="d-flex align-center justify-center fill-height"
                        >
                          <div class="text-center">
                            <v-icon icon="mdi-movie-off" size="x-large"></v-icon>
                            <div class="text-caption mt-2">Sin Póster</div>
                          </div>
                        </v-sheet>
                      </template>
                    </v-img>
                    <div class="d-flex flex-column flex-grow-1 pa-2">
                      <v-card-title class="text-subtitle-1">{{ result.title }}</v-card-title>
                      <v-card-subtitle>{{ result.year }}</v-card-subtitle>
                      <v-spacer></v-spacer>
                      <v-card-actions>
                        <v-chip
                          size="small"
                          prepend-icon="mdi-television-play"
                          class="text-capitalize"
                          >{{ result.type }}</v-chip
                        >
                      </v-card-actions>
                    </div>
                  </v-card>
                </v-col>
              </v-row>

              <!-- Tarjeta de Detalles del Item Seleccionado -->
              <v-card v-if="selectedItem" :loading="loading" class="mt-4">
                <v-row no-gutters>
                  <v-col cols="12" md="4">
                    <v-img :src="selectedItem.poster" cover class="fill-height">
                      <template v-slot:error>
                        <v-sheet
                          color="grey-darken-3"
                          class="d-flex align-center justify-center fill-height"
                        >
                          <div class="text-center">
                            <v-icon icon="mdi-movie-off" size="x-large"></v-icon>
                          </div>
                        </v-sheet>
                      </template>
                    </v-img>
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-card-title class="text-h4 mt-2">{{ selectedItem.title }}</v-card-title>
                    <v-card-subtitle class="text-h6"
                      >{{ selectedItem.year }} · {{ selectedItem.genre }}</v-card-subtitle
                    >
                    <v-card-text>
                      <div class="d-flex flex-wrap ga-2 my-4">
                        <v-chip
                          v-for="(rating, index) in selectedItem.ratings"
                          :key="index"
                          variant="outlined"
                          prepend-icon="mdi-star-circle"
                        >
                          <strong>{{ rating.source }}:</strong> {{ rating.value }}
                        </v-chip>
                      </div>
                      <h3 class="text-h6 text-primary mb-2">Sinopsis</h3>
                      <p class="text-body-1">{{ selectedItem.plot }}</p>
                      <div class="mt-4 text-body-2">
                        <div v-if="selectedItem.director">
                          <strong>Director/Estudio:</strong> {{ selectedItem.director }}
                        </div>
                        <div v-if="selectedItem.actors">
                          <strong>Actores/Personajes:</strong> {{ selectedItem.actors }}
                        </div>
                        <div v-if="selectedItem.cast && selectedItem.cast.length > 0" class="mt-6">
                          <h3 class="text-h6 text-primary mb-4">Reparto Principal</h3>
                          <v-slide-group show-arrows>
                            <v-slide-group-item
                              v-for="(actor, index) in selectedItem.cast"
                              :key="index"
                            >
                              <div class="actor-card text-center mx-2">
                                <v-avatar size="80">
                                  <v-img :src="actor.photo" :alt="actor.name">
                                    <template v-slot:error>
                                      <v-icon color="grey-darken-1" size="60"
                                        >mdi-account-circle</v-icon
                                      >
                                    </template>
                                  </v-img>
                                </v-avatar>
                                <div class="actor-name mt-2">{{ actor.name }}</div>
                                <div class="character-name text-caption">{{ actor.character }}</div>
                              </div>
                            </v-slide-group-item>
                          </v-slide-group>
                        </div>
                      </div>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-card>
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
