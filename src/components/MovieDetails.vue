<script setup>
defineProps({
  selectedItem: {
    type: Object, // Puede ser null, por lo que no es 'required'
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <!-- El componente solo se muestra si selectedItem tiene datos -->
  <v-card v-if="selectedItem" :loading="loading" class="mt-4">
    <v-row no-gutters>
      <v-col cols="12" md="4">
        <v-img :src="selectedItem.poster" cover class="fill-height">
          <template v-slot:error>
            <v-sheet color="grey-darken-3" class="d-flex align-center justify-center fill-height">
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
                <v-slide-group-item v-for="(actor, index) in selectedItem.cast" :key="index">
                  <div class="actor-card text-center mx-2">
                    <v-avatar size="80">
                      <v-img :src="actor.photo" :alt="actor.name">
                        <template v-slot:error>
                          <v-icon color="grey-darken-1" size="60">mdi-account-circle</v-icon>
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
</template>

<style scoped></style>
