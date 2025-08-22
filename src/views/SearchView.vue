<script setup>
import SearchBar from '@/components/SearchBar.vue'
import MoviesContainer from '@/components/MoviesContainer.vue'
import { ref, computed } from 'vue'
import { searchOMDb } from '@/services/omdb.js'
import { searchTMDB } from '@/services/tmdb.js'
import { searchJikan } from '@/services/jikan.js'
import { adaptSearchResults } from '@/services/dataAdapter.js'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const searchType = route.params.type
const searchTerm = ref('')
const loading = ref(false)
const error = ref(null)
const searchResults = ref([])
const placeholderText = computed(() => {
  return 'Buscar...'
})

const handleSearch = async (searchTerm) => {
  // Validación mejorada: verifica si el término está vacío (incluso con espacios)
  const trimmedTerm = searchTerm?.trim() || ''
  if (!trimmedTerm) {
    error.value = 'Por favor, escribe un término de búsqueda.'
    return // Detenemos la ejecución aquí para evitar continuar
  }
  loading.value = true
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
const handleItemSelected = (item) => {
  router.push(`/details/${searchType}/${item.id}`)
}
const goBack = () => {
  router.push('/')
}
</script>

<template>
  <div>
    <!-- Botón para volver a la selección de fuente -->
    <v-btn @click="goBack" prepend-icon="mdi-arrow-left" variant="text" class="mb-4">
      Cambiar fuente
    </v-btn>

    <SearchBar
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
  </div>
</template>

<style scoped></style>
