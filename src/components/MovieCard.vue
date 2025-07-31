<script setup>
defineProps({
  result: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['click'])
</script>

<template>
  <v-card hover class="fill-height d-flex flex-column" @click="emit('click')">
    <v-img :src="result.poster" aspect-ratio="2/3" cover>
      <template v-slot:error>
        <v-sheet color="grey-darken-3" class="d-flex align-center justify-center fill-height">
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
        <v-chip size="small" prepend-icon="mdi-television-play" class="text-capitalize">{{
          result.type
        }}</v-chip>
      </v-card-actions>
    </div>
  </v-card>
</template>

<style scoped></style>
