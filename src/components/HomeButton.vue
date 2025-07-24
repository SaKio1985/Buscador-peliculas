<script setup>
defineProps({
  imagen: {
    type: String,
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  api: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['selectSearchSource'])
const selectSearchSource = (api) => {
  emit('selectSearchSource', api)
}
</script>

<template>
  <v-card @click="selectSearchSource(api)" class="source-card" hover>
    <v-img :src="imagen" contain height="80" class="my-4"></v-img>
    <v-card-text class="text-center font-weight-bold"> {{ titulo }} </v-card-text>
  </v-card>
</template>

<style scoped></style>
