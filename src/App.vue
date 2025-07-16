<script setup>
import { ref } from 'vue'

// --- Estado de la aplicación ---
const searchTerm = ref('')
const searchResults = ref([])
const movie = ref(null)
const loading = ref(false)
const error = ref(null)

// --- Lógica ---

// Función para buscar la lista de películas
const searchMovie = async () => {
  // Usamos .value para acceder al contenido del ref
  if (searchTerm.value.trim() === '') {
    // <-- CORREGIDO
    error.value = 'Por favor, escribe un término de búsqueda.'
    return
  }

  loading.value = true
  movie.value = null
  searchResults.value = []
  error.value = null

  try {
    const apiKey = import.meta.env.VITE_OMDB_API_KEY
    // Usamos .value para construir la URL
    const url = `https://www.omdbapi.com/?s=${encodeURIComponent(searchTerm.value)}&apikey=${apiKey}` // <-- CORREGIDO

    const response = await fetch(url)
    const data = await response.json()

    if (data.Response === 'False') {
      throw new Error(data.Error)
    } else {
      searchResults.value = data.Search
    }
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

// Función para obtener los detalles de una película específica
const getMovieDetails = async (imdbID) => {
  loading.value = true
  movie.value = null
  error.value = null

  try {
    const apiKey = import.meta.env.VITE_OMDB_API_KEY
    const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}&plot=full`

    const response = await fetch(url)
    const data = await response.json()

    if (data.Response === 'False') {
      throw new Error(data.Error)
    } else {
      movie.value = data
      searchResults.value = []
    }
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
            <!-- Título y Buscador (sin cambios) -->
            <h1 class="text-h3 text-center mb-4 text-primary">Buscador de Películas</h1>
            <form @submit.prevent="searchMovie" class="d-flex ga-2 mb-8">
              <v-text-field
                v-model="searchTerm"
                label="Título de la película (ej: Ghost in the Shell)"
                variant="solo-filled"
                hide-details
                @keydown.enter="searchMovie"
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

            <!-- Alerta de Error (sin cambios) -->
            <v-alert
              v-if="error"
              type="error"
              variant="tonal"
              closable
              class="mb-8"
              :text="`Error: ${error}`"
              @update:model-value="error = null"
            ></v-alert>

            <!-- AÑADIR ESTO: Sección para la lista de resultados de la búsqueda -->
            <v-row v-if="searchResults.length > 0" dense>
              <v-col v-for="result in searchResults" :key="result.imdbID" cols="12" sm="6" md="4">
                <!-- Al hacer clic en la tarjeta, llamamos a getMovieDetails -->
                <v-card
                  @click="getMovieDetails(result.imdbID)"
                  hover
                  class="fill-height d-flex flex-column"
                >
                  <v-img :src="result.Poster" aspect-ratio="2/3" cover>
                    <!-- Fallback por si no hay póster -->
                    <template v-slot:error>
                      <v-sheet
                        color="grey-darken-3"
                        class="d-flex align-center justify-center fill-height"
                      >
                        <div class="text-center">
                          <v-icon icon="mdi-movie-off" size="x-large"></v-icon>
                          <div class="text-caption">Sin Póster</div>
                        </div>
                      </v-sheet>
                    </template>
                  </v-img>
                  <div class="d-flex flex-column flex-grow-1">
                    <v-card-title class="text-subtitle-1">{{ result.Title }}</v-card-title>
                    <v-card-subtitle>{{ result.Year }}</v-card-subtitle>
                    <v-spacer></v-spacer>
                    <v-card-actions>
                      <v-chip size="small" prepend-icon="mdi-information-outline">{{
                        result.Type
                      }}</v-chip>
                    </v-card-actions>
                  </div>
                </v-card>
              </v-col>
            </v-row>
            <!-- FIN DE LA SECCIÓN AÑADIDA -->

            <!-- Tarjeta de la Película (sin cambios en la estructura interna) -->
            <v-card v-if="movie" :loading="loading" class="mt-4">
              <!-- ... Todo el código de la tarjeta de detalles que ya tienes está perfecto ... -->
              <v-row no-gutters>
                <v-col cols="12" sm="4">
                  <v-img :src="movie.Poster" cover height="100%">
                    <template v-slot:error>
                      <v-img
                        src="https://via.placeholder.com/300x450.png?text=No+Poster"
                        height="100%"
                      ></v-img>
                    </template>
                  </v-img>
                </v-col>

                <v-col cols="12" sm="8">
                  <v-card-title class="text-h4 mt-2">
                    {{ movie.Title }}
                  </v-card-title>
                  <v-card-subtitle class="text-h6">
                    {{ movie.Year }} · {{ movie.Genre }}
                  </v-card-subtitle>

                  <v-card-text>
                    <div class="d-flex flex-wrap ga-2 my-4">
                      <v-chip
                        v-for="rating in movie.Ratings"
                        :key="rating.Source"
                        variant="outlined"
                        prepend-icon="mdi-star-circle"
                      >
                        <span v-if="rating.Source === 'Rotten Tomatoes'">
                          <strong>Crítica (RT):</strong> {{ rating.Value }}
                        </span>
                        <span v-else>
                          <strong>{{ rating.Source }}:</strong> {{ rating.Value }}
                        </span>
                      </v-chip>
                    </div>

                    <h3 class="text-h6 text-primary mb-2">Sinopsis</h3>
                    <p>{{ movie.Plot }}</p>

                    <div class="mt-4 text-body-2">
                      <div><strong>Director:</strong> {{ movie.Director }}</div>
                      <div><strong>Actores:</strong> {{ movie.Actors }}</div>
                    </div>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-card>

            <!-- MODIFICAR ESTO: Mensaje Inicial -->
            <!-- Ahora debe comprobar que no se esté mostrando NADA (ni resultados, ni película, ni cargando, ni error) -->
            <div
              v-if="!movie && searchResults.length === 0 && !loading && !error"
              class="text-center text-grey mt-16"
            >
              <v-icon size="64" icon="mdi-movie-search-outline"></v-icon>
              <p class="mt-4 text-h6">Usa el buscador para encontrar una película</p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
/* ¡Casi no necesitamos CSS! Vuetify se encarga de casi todo. */
/* Podemos añadir pequeños ajustes si es necesario */
.v-card {
  transition: all 0.3s ease-in-out;
}
</style>
