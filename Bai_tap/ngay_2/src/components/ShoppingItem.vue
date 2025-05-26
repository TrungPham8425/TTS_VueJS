<template>
  <!-- Hiển thị một mặt hàng -->
  <div class="item" :class="{ purchased: item.purchased }">
    <input
      type="checkbox"
      :checked="item.purchased"
      @change="$emit('toggle', item.id)"
    />
    <span>{{ item.name }} ({{ item.quantity }})</span>
    <div>
      <button class="edit-btn" @click="$emit('edit', item)">Chỉnh sửa</button>
      <button class="delete-btn" @click="$emit('delete', item.id)">Xóa</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShoppingItem", // Đổi tên thành ShoppingItem
  /* Props nhận từ parent */
  props: {
    item: {
      type: Object,
      required: true,
      validator: (item) =>
        "id" in item && "name" in item && "purchased" in item,
    },
  },
};
</script>

<style scoped>
/* Style cho mặt hàng */
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}
.item.purchased span {
  text-decoration: line-through;
  color: #888;
}
button {
  margin-left: 8px;
}
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f7f7f7;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.item .details {
  flex: 1;
}

.item .actions {
  display: flex;
  gap: 8px;
}

.item button {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.item .edit-btn {
  background-color: #ffc107;
  color: #000;
}

.item .edit-btn:hover {
  background-color: #e0a800;
}

.item .delete-btn {
  background-color: #dc3545;
  color: #fff;
}

.item .delete-btn:hover {
  background-color: #c82333;
}
</style>
