<script setup>
import MovieDetails from '@/components/MovieDetails.vue'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getOMDbDetails } from '@/services/omdb.js'
import { getTMDBDetails } from '@/services/tmdb.js'
import { getJikanDetails } from '@/services/jikan.js'
import { adaptDetails } from '@/services/dataAdapter.js'
import { onMounted } from 'vue'

const loading = ref(false)
const selectedItem = ref(null)
const error = ref(null)
const searchResults = ref([])
const searchType = ref(null)
const route = useRoute()
const router = useRouter()

onMounted(() => {
  searchType.value = route.params.type
  handleItemSelected(route.params.id)
})
const handleItemSelected = async (id) => {
  loading.value = true
  selectedItem.value = null
  error.value = null
  try {
    let rawDetails
    switch (searchType.value) {
      case 'omdb':
        rawDetails = await getOMDbDetails(id)
        break
      case 'tmdb':
        rawDetails = await getTMDBDetails(id)
        break
      case 'jikan':
        rawDetails = await getJikanDetails(id)
        break
    }
    selectedItem.value = adaptDetails(rawDetails, searchType.value)
    searchResults.value = []
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
const goBack = () => {
  router.push('/search/' + searchType.value)
}
</script>
<template>
  <!-- Botón para volver a los resultados de búsqueda -->
  <v-btn @click="goBack" prepend-icon="mdi-arrow-left" variant="text" class="mb-4">
    Volver a la busqueda
  </v-btn>
  <MovieDetails :loading="loading" :selectedItem="selectedItem" />
</template>

<style scoped></style>
