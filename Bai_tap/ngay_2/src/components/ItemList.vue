<template>
  <div class="item-list">
    <!-- Slot mặc định để hiển thị tiêu đề hoặc nội dung tùy biến -->
    <slot></slot>

    <!-- Nếu có mặt hàng trong danh sách thì hiển thị lưới mặt hàng -->
    <div v-if="items && items.length" class="item-grid">
      <ShoppingItem
        v-for="item in items"
        :key="item.id"
        :item="item"
        @toggle="$emit('toggle', $event)"
        @edit="$emit('edit', $event)"
        @delete="$emit('delete', $event)"
      />
    </div>

    <!-- Nếu danh sách rỗng, hiển thị nội dung của slot có tên "empty" -->
    <div v-else class="empty-message">
      <slot name="empty" />
    </div>
  </div>
</template>

<script>
import ShoppingItem from "./ShoppingItem.vue";

export default {
  name: "ItemList",
  components: {
    ShoppingItem, // Component con hiển thị từng mặt hàng
  },
  props: {
    items: {
      type: Array,
      required: true, // Bắt buộc phải truyền prop items là mảng
      default: () => [], // Mặc định là mảng rỗng nếu không truyền
    },
  },
};
</script>

<style scoped>
.item-list {
  margin-top: 20px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.item-grid {
  display: flex;
  flex-direction: column;
  gap: 12px; /* Khoảng cách giữa các item */
}

.empty-message {
  text-align: center;
  font-style: italic;
  color: #999;
  padding: 30px 0;
  font-size: 16px;
}
</style>
