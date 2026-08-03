<template>
  <div>
    <h1>Accueil</h1>
    <v-row>
      <v-col v-for="product in products" :key="product.id">
        <v-card>
          <v-card-title>{{ product.name }}</v-card-title>
          <v-card-subtitle
            >{{ product.origin }} — {{ product.roast }}</v-card-subtitle
          >
          <v-card-text>{{ product.price }} €</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
const { data: products, error } = await useFetch(
  "http://localhost:3001/api/products",
);
console.log("data:", products.value);
console.log("error:", error.value);
</script>
