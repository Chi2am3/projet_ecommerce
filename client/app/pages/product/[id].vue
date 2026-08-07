<template>
  <div class="page-container" style="max-width: 700px">
    <div v-if="pending" class="section text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
      <p class="mt-4">Chargement...</p>
    </div>

    <v-alert v-else-if="error" type="error" variant="tonal"
      >Produit introuvable.</v-alert
    >

    <v-card v-else-if="product" elevation="2">
      <v-card-item class="pt-6 px-6">
        <v-card-title class="text-h4">{{ product.name }}</v-card-title>
        <v-card-subtitle class="text-body-1 mt-1"
          >{{ product.origin }} — {{ product.roast }}</v-card-subtitle
        >
      </v-card-item>

      <v-card-text class="px-6">
        <p class="mb-4">{{ product.description }}</p>

        <v-divider class="mb-4"></v-divider>

        <v-row dense>
          <v-col cols="6" sm="4">
            <span class="text-medium-emphasis">Variété</span>
            <div class="font-weight-medium">{{ product.variety }}</div>
          </v-col>
          <v-col cols="6" sm="4">
            <span class="text-medium-emphasis">Poids</span>
            <div class="font-weight-medium">{{ product.weight }}g</div>
          </v-col>
          <v-col cols="6" sm="4">
            <span class="text-medium-emphasis">Stock</span>
            <div class="font-weight-medium">{{ product.stock }}</div>
          </v-col>
        </v-row>

        <div class="text-h4 text-primary mt-6">{{ product.price }} €</div>
      </v-card-text>

      <v-card-actions class="px-6 pb-6">
        <v-btn color="primary" size="large" block @click="handleAddToCart"
          >Ajouter au panier</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>
const route = useRoute();
const cartStore = useCartStore();

const {
  data: product,
  pending,
  error,
} = await useFetch(`http://localhost:3001/api/products/${route.params.id}`);

function handleAddToCart() {
  cartStore.addToCart(product.value);
}
</script>
