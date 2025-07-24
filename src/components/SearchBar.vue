<script setup>
import { computed } from 'vue'

// Definimos las props que recibirá el componente
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholderText: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
})

// Definimos los eventos que puede emitir este componente
const emit = defineEmits(['update:modelValue', 'search'])

// Creamos una computed property para manejar v-model correctamente
// Lee el valor de props.modelValue y emite 'update:modelValue' cuando se cambia internamente
const searchTerm = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

// Función para manejar el envío del formulario
const handleSubmit = () => {
  // Emitimos el evento 'search' cuando el usuario envía la búsqueda
  emit('search')
}
</script>

<template>
  <!-- El formulario con prevent.default para evitar recargar la página -->
  <form @submit.prevent="handleSubmit" class="d-flex ga-2 mb-8">
    <!-- El campo de texto, vinculado a searchTerm (que maneja v-model) -->
    <v-text-field
      v-model="searchTerm"
      :label="placeholderText"
      variant="solo-filled"
      hide-details
      clearable
      autofocus
    ></v-text-field>
    <!-- El botón de búsqueda, deshabilitado y con loading según la prop -->
    <v-btn type="submit" color="primary" size="large" :loading="loading" :disabled="loading">
      Buscar
    </v-btn>
  </form>
</template>

<style scoped>
/* Puedes agregar estilos específicos del componente aquí si los necesitas */
</style>
