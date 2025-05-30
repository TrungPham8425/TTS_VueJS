<template>
  <div class="product-list">
    <!-- Danh sách sản phẩm -->
    <ProductItem
      v-for="product in store.products"
      :key="product.id"
      :product="product"
      @edit="handleEdit"
      @delete="handleDelete"
    />
  </div>
</template>

<script setup>
/* eslint-disable */
import { useInventoryStore } from "../stores/inventory";
import ProductItem from "./ProductItem.vue";

//  Khai báo emit để sử dụng
const emit = defineEmits(["edit"]);

const store = useInventoryStore();

// Xử lý sự kiện Edit
function handleEdit(product) {
  emit("edit", product);
}

// Xử lý sự kiện Delete
function handleDelete(id) {
  store.deleteProduct(id);
}
</script>

<style scoped>
.product-list {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
