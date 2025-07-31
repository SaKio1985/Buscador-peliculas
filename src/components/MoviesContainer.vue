<!-- components/MoviesContainer.vue -->
<script setup>
import MovieCard from './MovieCard.vue'

// La prop que recibe la lista de resultados
defineProps({
  searchResults: {
    type: Array,
    required: true,
  },
})

// Definimos el evento que vamos a emitir hacia el padre
const emit = defineEmits(['item-selected'])

// Función que se llama cuando se hace clic en una tarjeta.
// Recibe el 'item' (la película) y emite el evento con ese item como dato.
const handleCardClick = (item) => {
  emit('item-selected', item)
}
</script>

<template>
  <!-- Iteramos sobre la lista de resultados -->
  <v-col
    v-for="result in searchResults"
    :key="`${result.source}-${result.id}`"
    cols="12"
    sm="6"
    md="4"
  >
    <!-- Al hacer clic en la tarjeta, llamamos a nuestra función local -->
    <MovieCard :result="result" @click="handleCardClick(result)" />
  </v-col>
</template>

<style scoped></style>
