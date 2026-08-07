<template>
  <div class="auth-container">
    <v-card class="auth-card" elevation="3">
      <v-card-text class="pa-8">
        <h1 class="text-h4 text-center mb-6">Inscription</h1>

        <v-form @submit.prevent="handleRegister">
          <v-text-field
            v-model="firstName"
            label="Prénom"
            class="mb-2"
            required
          />
          <v-text-field
            v-model="lastName"
            label="Nom"
            class="mb-2"
            required
          />
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            class="mb-2"
            required
          />
          <v-text-field
            v-model="password"
            label="Mot de passe"
            type="password"
            class="mb-2"
            required
          />

          <v-btn
            type="submit"
            color="primary"
            block
            size="large"
            class="mt-4"
          >
            S'inscrire
          </v-btn>
        </v-form>

        <v-alert v-if="errorMessage" type="error" class="mt-6">
          {{ errorMessage }}
        </v-alert>

        <v-alert v-if="successMessage" type="success" class="mt-6">
          {{ successMessage }}
        </v-alert>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
const authStore = useAuthStore();
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const errorMessage = ref("");
const successMessage = ref("");

async function handleRegister() {
  errorMessage.value = "";
  successMessage.value = "";

  try {
    const response = await $fetch("http://localhost:3001/api/register", {
      method: "POST",
      body: {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
      },
    });

    successMessage.value = "Inscription réussie ! Redirection...";

    setTimeout(() => {
      navigateTo("/login");
    }, 1500);
  } catch (err) {
    errorMessage.value =
      err.data?.message || "Une erreur est survenue lors de l'inscription.";
  }
}
</script>
