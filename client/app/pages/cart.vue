<template>
  <v-container>
    <h1>Panier</h1>

    <div v-if="cartStore.items.length === 0">
      <p>Votre panier est vide.</p>
    </div>

    <div v-else>
      <v-list>
        <v-list-item v-for="item in cartStore.items" :key="item.product.id">
          <v-row align="center">
            <v-col cols="4">
              <strong>{{ item.product.name }}</strong>
            </v-col>
            <v-col cols="3"> {{ item.product.price }} € / unité </v-col>
            <v-col cols="3">
              <v-btn
                icon="mdi-minus"
                size="small"
                @click="cartStore.decreaseQuantity(item.product.id)"
              ></v-btn>
              {{ item.quantity }}
              <v-btn
                icon="mdi-plus"
                size="small"
                @click="cartStore.increaseQuantity(item.product.id)"
              ></v-btn>
            </v-col>
            <v-col cols="2">
              <v-btn
                icon="mdi-delete"
                size="small"
                color="error"
                @click="cartStore.removeFromCart(item.product.id)"
              ></v-btn>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>

      <v-divider class="my-4"></v-divider>

      <h2>Total : {{ cartStore.totalPrice.toFixed(2) }} €</h2>

      <v-btn color="primary" class="mt-4" to="/order">
        Passer la commande
      </v-btn>
    </div>
  </v-container>
</template>

<script setup>
const cartStore = useCartStore();
</script>
