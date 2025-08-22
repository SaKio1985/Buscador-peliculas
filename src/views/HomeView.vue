<script setup>
import { ref } from 'vue'
import HomeButton from '@/components/HomeButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const selectSearchSource = (source) => {
  console.log(source)
  router.push(`/search/${source}`)
  searchType.value = source
}

const searchType = ref(null)
</script>

<template>
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
</template>

<style scoped></style>
