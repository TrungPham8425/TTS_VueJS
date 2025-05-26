<template>
  <!-- Các tab lọc danh sách -->
  <div class="filter-tabs">
    <!-- Lặp qua mảng tabs để tạo các nút bấm -->
    <button
      v-for="tab in tabs"
      :key="tab.value"
      :class="{ active: activeFilter === tab.value }"
      @click="$emit('change-filter', tab.value)"
    >
      {{ tab.label }}
      <!-- Nhãn hiển thị cho từng tab -->
    </button>
  </div>
</template>

<script>
export default {
  name: "FilterTabs",
  /* Props nhận từ component cha */
  props: {
    activeFilter: {
      type: String,
      required: true, // Bắt buộc phải truyền activeFilter để biết tab nào đang active
    },
  },
  /* Dữ liệu local chứa danh sách các tab */
  data() {
    return {
      tabs: [
        { label: "Tất cả", value: "all" },
        { label: "Đã mua", value: "purchased" },
        { label: "Chưa mua", value: "not-purchased" },
      ],
    };
  },
};
</script>

<style scoped>
/* Style container chứa các tab */
.filter-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

/* Style chung cho các nút */
button {
  padding: 8px 16px;
  border: none;
  background: none;
  cursor: pointer;
}

/* Style nút active (tab đang chọn) */
button.active {
  font-weight: bold;
  border-bottom: 2px solid blue;
}
</style>
