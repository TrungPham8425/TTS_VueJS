<template>
  <div>
    <!-- Form -->
    <form @submit.prevent="submitForm" class="product-form">
      <input v-model="name" placeholder="Tên sản phẩm" />
      <input type="number" v-model="price" placeholder="Giá" />
      <input type="number" v-model="quantity" placeholder="Số lượng" />
      <button type="submit">Lưu</button>
    </form>
  </div>
</template>
<script setup>
/* eslint-disable */
import { ref, watch } from "vue";

// Lay du lieu tu form sua
const props = defineProps({
  initialData: Object,
});
const emit = defineEmits(["submit"]);

// Khoi tao state cho form
const name = ref("");
const price = ref(0);
const quantity = ref(1);

// Gan du lieu form sua
watch(
  () => props.initialData,
  (data) => {
    if (data) {
      name.value = data.name;
      price.value = data.price;
      quantity.value = data.quantity;
    }
  },
  { immediate: true }
);

// Cap nhat them moi san pham sau khi nguoi dung submit
function submitForm() {
  emit("submit", {
    name: name.value,
    price: price.value,
    quantity: quantity.value,
  });
}

// reset form sau khi submit
name.value = "";
price.value = 0;
quantity.value = 1;
</script>
<style scoped>
.product-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: #fff;
  padding: 16px;
  border-radius: 10px;
  border: 1px solid #ddd;
  margin-bottom: 24px;
}
.product-form input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.product-form button {
  padding: 10px;
  background-color: #2ecc71;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.product-form button:hover {
  background-color: #27ae60;
}
</style>
