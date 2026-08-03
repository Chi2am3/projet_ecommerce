<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Café en grains</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-list-item to="/" title="Accueil"></v-list-item>
        <v-list-item to="/login" title="Connexion"></v-list-item>
        <v-list-item to="/register" title="Inscription"></v-list-item>
        <v-list-item to="/cart" title="Panier"></v-list-item>
        <v-list-item to="/order" title="Commande"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script setup>
const drawer = ref(false);
</script>
