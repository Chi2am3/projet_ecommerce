import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
  }),

  getters: {
    totalItems: (state) =>
      state.items.reduce((sum, item) => sum + item.quantity, 0),

    totalPrice: (state) =>
      state.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      ),
  },

  actions: {
    addToCart(product) {
      const existingItem = this.items.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push({ product, quantity: 1 });
      }
    },

    increaseQuantity(productId) {
      const item = this.items.find((item) => item.product.id === productId);
      if (item) item.quantity++;
    },

    decreaseQuantity(productId) {
      const item = this.items.find((item) => item.product.id === productId);
      if (item) {
        item.quantity--;
        if (item.quantity <= 0) {
          this.removeFromCart(productId);
        }
      }
    },

    removeFromCart(productId) {
      this.items = this.items.filter((item) => item.product.id !== productId);
    },

    clearCart() {
      this.items = [];
    },
  },
});
