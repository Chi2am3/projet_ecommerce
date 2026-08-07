<template>
  <div class="page-container">
    <h1 class="page-title text-h4">Panier</h1>

    <v-alert v-if="cartStore.items.length === 0" type="info" variant="tonal">
      Votre panier est vide.
    </v-alert>

    <div v-else>
      <v-card class="section" elevation="1">
        <v-list lines="two">
          <template
            v-for="(item, index) in cartStore.items"
            :key="item.product.id"
          >
            <v-list-item>
              <v-row align="center" no-gutters>
                <v-col cols="12" sm="4">
                  <strong>{{ item.product.name }}</strong>
                </v-col>
                <v-col cols="6" sm="3" class="text-medium-emphasis">
                  {{ item.product.price }} € / unité
                </v-col>
                <v-col cols="6" sm="3" class="d-flex align-center">
                  <v-btn
                    icon="mdi-minus"
                    size="small"
                    variant="outlined"
                    @click="cartStore.decreaseQuantity(item.product.id)"
                  ></v-btn>
                  <span class="mx-3">{{ item.quantity }}</span>
                  <v-btn
                    icon="mdi-plus"
                    size="small"
                    variant="outlined"
                    @click="cartStore.increaseQuantity(item.product.id)"
                  ></v-btn>
                </v-col>
                <v-col cols="12" sm="2" class="text-sm-right">
                  <v-btn
                    icon="mdi-delete"
                    size="small"
                    variant="text"
                    color="error"
                    @click="cartStore.removeFromCart(item.product.id)"
                  ></v-btn>
                </v-col>
              </v-row>
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
          <v-btn color="primary" size="large" to="/order" class="mt-4 mt-sm-0">
            Passer la commande
          </v-btn>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup>
const cartStore = useCartStore();
</script>
