<template>
  <v-app>
    <v-app-bar color="primary" :elevation="0">
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-app-bar-title class="font-heading">Café en grains</v-app-bar-title>

      <template v-if="authStore.isLoggedIn">
        <span class="mr-4 d-none d-sm-inline"
          >Bonjour {{ authStore.user.firstName }}</span
        >
        <v-btn
          variant="outlined"
          color="on-primary"
          size="small"
          class="mr-2"
          @click="handleLogout"
          >Déconnexion</v-btn
        >
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary color="cream">
      <v-list bg-color="cream" color="espresso" active-color="gold">
        <v-list-item to="/" title="Accueil" prepend-icon="mdi-home"></v-list-item>

        <template v-if="!authStore.isLoggedIn">
          <v-list-item
            to="/login"
            title="Connexion"
            prepend-icon="mdi-login"
          ></v-list-item>
          <v-list-item
            to="/register"
            title="Inscription"
            prepend-icon="mdi-account-plus"
          ></v-list-item>
        </template>

        <v-list-item
          to="/cart"
          title="Panier"
          prepend-icon="mdi-cart"
        ></v-list-item>
        <v-list-item
          to="/order"
          title="Commande"
          prepend-icon="mdi-receipt"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="bg-cream">
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
