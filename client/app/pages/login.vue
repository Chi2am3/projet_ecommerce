<template>
  <v-container>
    <h1>Connexion</h1>
    <v-form @submit.prevent="handleLogin">
      <v-text-field v-model="email" label="Email" type="email" required />
      <v-text-field
        v-model="password"
        label="Mot de passe"
        type="password"
        required
      />
      <v-btn type="submit" color="primary">Se connecter</v-btn>
    </v-form>

    <v-alert v-if="errorMessage" type="error" class="mt-4">
      {{ errorMessage }}
    </v-alert>
  </v-container>
</template>

<script setup>
const authStore = useAuthStore();
const email = ref("");
const password = ref("");
const errorMessage = ref("");

async function handleLogin() {
  errorMessage.value = "";

  try {
    const response = await $fetch("http://localhost:3001/api/login", {
      method: "POST",
      body: {
        email: email.value,
        password: password.value,
      },
    });

    authStore.setAuth(response.user, response.token);
    navigateTo("/");
  } catch (err) {
    console.error("Erreur détaillée:", err);
    errorMessage.value = "Email ou mot de passe incorrect.";
  }
}
</script>
