<template>
  <div class="container mx-auto py-6">
    <CategoryFilter :categories="categories" @filter="filterByCategory" />
    <ProductCard :selectedCategory="selectedCategory" />
  </div>
</template>

<script>
import CategoryFilter from "~/components/CategoryFilter.vue";
import ProductCard from "~/components/ProductCard.vue";

export default {
  components: {
    CategoryFilter,
    ProductCard,
  },
  data() {
    return {
      categories: [
        "electronics",
        "jewelery",
        "men's clothing",
        "women's clothing",
      ],
      selectedCategory: "electronics", // Default category on page load
    };
  },
  methods: {
    filterByCategory(category) {
      this.selectedCategory = category;
    },
  },
};
</script>
