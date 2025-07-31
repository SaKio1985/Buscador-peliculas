<script setup></script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="10" lg="8"> <router-view /></v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.source-card {
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
.source-card:hover {
  transform: translateY(-5px);
  border-color: rgb(var(--v-theme-primary));
}

.v-card {
  transition: transform 0.2s ease-in-out;
}
.actor-card {
  width: 100px; /* Ancho fijo para cada tarjeta de actor */
}
.actor-name {
  font-weight: 500;
  white-space: normal; /* Permite que el nombre ocupe varias líneas */
  line-height: 1.2;
}
.character-name {
  color: #aaa; /* Un color más suave para el nombre del personaje */
}
</style>
