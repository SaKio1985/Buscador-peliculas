<script setup>
import SearchBar from '@/components/SearchBar.vue'
import MoviesContainer from '@/components/MoviesContainer.vue'
import MovieDetails from '@/components/MovieDetails.vue'
import { ref, computed } from 'vue'
import { searchOMDb, getOMDbDetails } from '@/services/omdb.js'
import { searchTMDB, getTMDBDetails } from '@/services/tmdb.js'
import { searchJikan, getJikanDetails } from '@/services/jikan.js'
import { adaptSearchResults, adaptDetails } from '@/services/dataAdapter.js'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const searchType = route.params.type
const searchTerm = ref('')
const loading = ref(false)
const error = ref(null)
const searchResults = ref([])
const selectedItem = ref(null)

const placeholderText = computed(() => {
  /*   if (searchType.value === 'tmdb') return 'Buscar películas en español...'
  if (searchType.value === 'omdb') return 'Buscar películas en inglés...'
  if (searchType.value === 'jikan') return 'Buscar anime...' */
  return 'Buscar...'
})

const handleSearch = async (searchTerm) => {
  console.log(searchTerm)
  /*  searchTerm.value = searchTerm */
  if (searchTerm === '') {
    error.value = 'Por favor, escribe un término de búsqueda.'
    return
  }
  loading.value = true
  selectedItem.value = null
  searchResults.value = []
  error.value = null

  try {
    let rawResults
    switch (searchType) {
      case 'omdb':
        console.log('buscando  en OMDB')
        rawResults = await searchOMDb(searchTerm)
        console.log(rawResults)
        break
      case 'tmdb':
        console.log('buscando  en TMDB')
        rawResults = await searchTMDB(searchTerm)
        console.log(rawResults)
        break
      case 'jikan':
        console.log('buscando  en Jikan')
        rawResults = await searchJikan(searchTerm)
        console.log(rawResults)
        break
    }
    searchResults.value = adaptSearchResults(rawResults, searchType)
    if (searchResults.value.length === 0) {
      error.value = 'No se encontraron resultados para tu búsqueda.'
    }
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
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
const goBack = () => {
  router.push('/')
}
</script>

<template>
  <div>
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
      <MoviesContainer :searchResults="searchResults" @item-selected="handleItemSelected" />
    </v-row>

    <!-- Tarjeta de Detalles del Item Seleccionado -->
  </div>

  <MovieDetails :selectedItem="selectedItem" :loading="loading" />

  <div class="text-center mt-12" v-if="searchType === 'tmdb' || selectedItem?.source === 'tmdb'">
    <p class="text-caption text-grey">
      This product uses the TMDB API but is not endorsed or certified by TMDB.
    </p>
    <v-img src="/images/tmdb-logo.svg" height="20" contain></v-img>
  </div>
</template>

<style scoped></style>
