<template>
  <div class="page-container">
    <h1 class="page-title text-h4">Nos cafés en grains</h1>

    <v-row v-if="products && products.length">
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card :to="`/product/${product.id}`" class="product-card">
          <v-card-item>
            <v-card-title>{{ product.name }}</v-card-title>
            <v-card-subtitle
              >{{ product.origin }} — {{ product.roast }}</v-card-subtitle
            >
          </v-card-item>
          <v-card-text>
            <span class="text-h6 text-primary">{{ product.price }} €</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-alert v-else-if="error" type="error" class="section"
      >Impossible de charger les produits.</v-alert
    >
  </div>
</template>

<script setup>
const { data: products, error } = await useFetch(
  "http://localhost:3001/api/products",
);
</script>
