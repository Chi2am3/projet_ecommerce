<template>
  <div class="page-container">
    <h1 class="page-title text-h4">Commande</h1>

    <div v-if="!authStore.isLoggedIn" class="section">
      <v-alert type="warning" variant="tonal">
        Tu dois être connecté pour valider une commande.
      </v-alert>
      <v-btn color="primary" class="mt-4" to="/login">Se connecter</v-btn>
    </div>

    <div v-else-if="cartStore.items.length === 0 && !confirmed" class="section">
      <v-alert type="info" variant="tonal">Ton panier est vide.</v-alert>
      <v-btn color="primary" class="mt-4" to="/">Retour au catalogue</v-btn>
    </div>

    <div v-else-if="confirmed" class="section">
      <v-alert type="success" variant="tonal">
        Commande validée avec succès ! Numéro de commande : {{ orderId }}
      </v-alert>
      <v-btn color="primary" class="mt-4" to="/">Retour au catalogue</v-btn>
    </div>

    <div v-else>
      <v-card class="section" elevation="1">
        <v-list lines="one">
          <template
            v-for="(item, index) in cartStore.items"
            :key="item.product.id"
          >
            <v-list-item>
              {{ item.product.name }} — {{ item.quantity }} ×
              {{ item.product.price }} €
            </v-list-item>
            <v-divider v-if="index < cartStore.items.length - 1"></v-divider>
          </template>
        </v-list>
      </v-card>

      <v-card class="section" elevation="1">
        <v-card-text
          class="d-flex flex-column flex-sm-row align-center justify-space-between"
        >
          <h2 class="text-h5">
            Total :
            <span class="text-primary"
              >{{ cartStore.totalPrice.toFixed(2) }} €</span
            >
          </h2>
          <v-btn
            color="primary"
            size="large"
            class="mt-4 mt-sm-0"
            :loading="loading"
            @click="handleValidateOrder"
          >
            Valider la commande
          </v-btn>
        </v-card-text>
      </v-card>

      <v-alert v-if="errorMessage" type="error" class="section">
        {{ errorMessage }}
      </v-alert>
    </div>
  </div>
</template>

<script setup>
const authStore = useAuthStore();
const cartStore = useCartStore();

const loading = ref(false);
const errorMessage = ref("");
const confirmed = ref(false);
const orderId = ref(null);

async function handleValidateOrder() {
  errorMessage.value = "";
  loading.value = true;

  try {
    const response = await $fetch("http://localhost:3001/api/orders", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
      body: {
        items: cartStore.items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      },
    });

    orderId.value = response.orderId;
    confirmed.value = true;
    cartStore.clearCart();
  } catch (err) {
    errorMessage.value =
      "Une erreur est survenue lors de la validation de la commande.";
  } finally {
    loading.value = false;
  }
}
</script>
