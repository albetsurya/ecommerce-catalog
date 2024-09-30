<template>
  <div class="flex justify-center space-x-4 my-4">
    <button
      v-for="category in categories"
      :key="category"
      @click="$emit('filter', category)"
      class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
    >
      {{ category }}
    </button>
  </div>
</template>

<script>
export default {
  props: ["categories"],
};
</script>
