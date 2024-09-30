<template>
  <div
    class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow mx-auto p-6"
  >
    <div v-if="loading" class="loader"></div>
    <div v-else>
      <a href="#">
        <img
          :src="product.image"
          alt="Product Image"
          class="p-8 rounded-t-lg object-contain w-full h-64"
        />
      </a>
      <div class="px-5 pb-5">
        <a href="#">
          <h5 class="text-xl font-semibold tracking-tight text-gray-900">
            {{ product.title }}
          </h5>
        </a>
        <p class="text-gray-600 text-sm mt-2 mb-4">
          {{ truncateText(product.description, 100) }}
        </p>
        <div class="flex items-center mt-2.5 mb-5">
          <div class="flex items-center space-x-1">
            <i
              v-for="n in 5"
              :key="n"
              class="fas"
              :class="{
                'fa-star text-yellow-300': n <= product.rating.rate,
                'fa-star-half-alt text-yellow-300':
                  n - 0.5 === product.rating.rate,
                'fa-star text-gray-300': n > product.rating.rate,
              }"
            ></i>
          </div>
          <span
            class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ml-3"
          >
            {{ product.rating.rate.toFixed(1) }}
          </span>
          <span class="text-gray-600 ml-2"
            >({{ product.rating.count }} reviews)</span
          >
        </div>
        <div class="flex items-center justify-between mb-4">
          <span class="text-3xl font-bold text-gray-900"
            >${{ product.price }}</span
          >
          <a
            href="#"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Buy now
          </a>
        </div>
        <p class="text-sm text-gray-500 mb-4">
          Category: {{ selectedCategory }}
        </p>
        <div class="flex justify-between">
          <button
            @click="getPreviousProduct"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Previous
          </button>
          <button
            @click="getNextProduct"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Next Product
          </button>
        </div>
      </div>
    </div>
    <p v-if="error" class="text-red-500 mt-4">
      Error loading product. Please try again.
    </p>
  </div>
</template>

<script>
export default {
  props: ["selectedCategory"], // Accept category as a prop
  data() {
    return {
      product: {},
      products: [], // Store all products for the selected category
      productIndex: 0, // Adjusted index to work within filtered products
      loading: true,
      error: false,
    };
  },
  watch: {
    // Watch for category change to refetch products
    selectedCategory: {
      handler(newCategory) {
        this.getProductsByCategory(newCategory);
      },
      immediate: true,
    },
  },
  methods: {
    async getProductsByCategory(category) {
      this.loading = true;
      this.error = false;
      try {
        const response = await this.$axios.$get(
          `/products/category/${category}`
        );
        this.products = response;
        this.productIndex = 0;
        this.product = this.products[this.productIndex];
      } catch (error) {
        this.error = true;
        console.error("Error fetching products:", error);
      }
      this.loading = false;
    },
    getNextProduct() {
      if (this.products.length > 0) {
        this.productIndex = (this.productIndex + 1) % this.products.length;
        this.product = this.products[this.productIndex];
      }
    },
    getPreviousProduct() {
      if (this.products.length > 0) {
        this.productIndex =
          this.productIndex === 0
            ? this.products.length - 1
            : this.productIndex - 1;
        this.product = this.products[this.productIndex];
      }
    },
    truncateText(text, length) {
      return text.length > length ? text.substring(0, length) + "..." : text;
    },
  },
};
</script>

<style>
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
