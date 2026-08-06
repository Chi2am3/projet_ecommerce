<template>
  <v-container>
    <div v-if="pending">
      <p>Chargement...</p>
    </div>

    <div v-else-if="error">
      <v-alert type="error">Produit introuvable.</v-alert>
    </div>

    <v-card v-else-if="product">
      <v-card-title>{{ product.name }}</v-card-title>
      <v-card-subtitle
        >{{ product.origin }} — {{ product.roast }}</v-card-subtitle
      >
      <v-card-text>
        <p>{{ product.description }}</p>
        <p><strong>Variété :</strong> {{ product.variety }}</p>
        <p><strong>Poids :</strong> {{ product.weight }}g</p>
        <p><strong>Prix :</strong> {{ product.price }} €</p>
        <p><strong>Stock :</strong> {{ product.stock }}</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
const route = useRoute();

const {
  data: product,
  pending,
  error,
} = await useFetch(`http://localhost:3001/api/products/${route.params.id}`);
</script>
