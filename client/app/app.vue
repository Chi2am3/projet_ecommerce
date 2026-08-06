<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Café en grains</v-app-bar-title>

      <template v-if="authStore.isLoggedIn">
        <span class="mr-4">Bonjour {{ authStore.user.firstName }}</span>
        <v-btn @click="handleLogout">Déconnexion</v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-list-item to="/" title="Accueil"></v-list-item>

        <template v-if="!authStore.isLoggedIn">
          <v-list-item to="/login" title="Connexion"></v-list-item>
          <v-list-item to="/register" title="Inscription"></v-list-item>
        </template>

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
const authStore = useAuthStore();

function handleLogout() {
  authStore.logout();
  navigateTo("/");
}
</script>
