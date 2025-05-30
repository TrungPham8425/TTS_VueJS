<script setup>
import { ref, onMounted } from "vue";
import { useInventoryStore } from "./stores/inventory";
import ProductForm from "./components/ProductForm.vue";
import ProductList from "./components/ProductList.vue";

const store = useInventoryStore();
const editingProduct = ref(null);

// 👉 Load sản phẩm khi khởi động
onMounted(() => {
  store.fetchProducts();
});

// 👉 Xử lý submit form (thêm hoặc sửa)
function handleSubmit(product) {
  if (editingProduct.value) {
    store.updateProduct(editingProduct.value.id, product);
    editingProduct.value = null;
  } else {
    store.addProduct(product);
  }
}

// Sua san pham
function handleEdit(product) {
  editingProduct.value = product;
}
</script>

<template>
  <div class="app">
    <h1>Quản lý Kho hàng</h1>
    <!-- Hien thi thong tin san pham trong kho  -->
    <p>Tổng sản phẩm: {{ store.productCount }}</p>
    <p>Tổng giá trị: {{ store.totalValue.toLocaleString() }}</p>

    <!-- Form them/ sua san pham -->
    <ProductForm :initialData="editingProduct" @submit="handleSubmit" />

    <!-- Danh sach san pham -->
    <ProductList @edit="handleEdit" />
  </div>
</template>

<style scoped>
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
}
</style>
