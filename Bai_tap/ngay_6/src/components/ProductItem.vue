<template>
  <div class="product-item">
    <div class="info">
      <div class="name">{{ product.name }}</div>
      <div class="details">
        Giá: {{ formatCurrency(product.price) }} | Số lượng:
        {{ product.quantity }} | Thành tiền:
        {{ formatCurrency(product.price * product.quantity) }}
      </div>
    </div>
    <div class="actions">
      <button @click="$emit('edit', product)">Sửa</button>
      <button @click="$emit('delete', product.id)">Xóa</button>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
const props = defineProps(["product"]);
defineEmits(["edit", "delete"]);

const formatCurrency = (value) => {
  return value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};
</script>

<style scoped>
.product-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease;
}

.product-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
}

.info {
  flex: 1;
}

.name {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 4px;
}

.details {
  font-size: 14px;
  color: #374151;
}

.actions {
  display: flex;
}

button {
  margin-left: 8px;
  padding: 6px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease, transform 0.2s ease;
}

button:hover {
  transform: translateY(-1px);
}

button:first-of-type {
  background-color: #3b82f6;
  color: white;
}

button:first-of-type:hover {
  background-color: #2563eb;
}

button:last-of-type {
  background-color: #ef4444;
  color: white;
}

button:last-of-type:hover {
  background-color: #dc2626;
}
</style>
