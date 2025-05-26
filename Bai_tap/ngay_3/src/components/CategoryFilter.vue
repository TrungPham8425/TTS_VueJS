<template>
  <select @change="onChange" :value="selectedCategory">
    <option value="">Tất cả</option>
    <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
  </select>
</template>

<script>
export default {
  props: {
    categories: Array,
    selectedCategory: String,
  },
  methods: {
    onChange(event) {
      this.$emit("update:selectedCategory", event.target.value);
    },
  },
};
</script>
