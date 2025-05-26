<template>
  <div class="container">
    <!-- Thanh điều hướng chính -->
    <NavigationBar />
    <!-- Tabs lọc mặt hàng theo trạng thái -->
    <FilterTabs :active-filter="activeFilter" @change-filter="updateFilter" />

    <!-- Nút thêm mặt hàng mới -->
    <button class="add-button" @click="showForm">+ Thêm mặt hàng</button>

    <!-- Giữ trạng thái các component con khi chuyển đổi -->
    <keep-alive>
      <component
        :is="currentView"
        :items="currentView === 'ItemList' ? filteredItems : undefined"
        :initial-data="currentView === 'ItemForm' ? editingItem : undefined"
        @submit="handleSubmit"
        @toggle="toggleItem"
        @edit="editItem"
        @delete="deleteItem"
      >
        <!-- Slot mặc định hiển thị khi là danh sách mặt hàng -->
        <template #default v-if="currentView === 'ItemList'">
          <h2>Danh sách mua sắm</h2>
        </template>

        <!-- Slot hiển thị khi danh sách mặt hàng rỗng -->
        <template #empty v-if="currentView === 'ItemList'">
          <p>Không có mặt hàng trong danh sách</p>
        </template>
      </component>
    </keep-alive>
  </div>
</template>

<script>
import ItemList from "./components/ItemList.vue";
import ItemForm from "./components/ItemForm.vue";
import FilterTabs from "./components/FilterTabs.vue";

export default {
  name: "App",
  components: {
    ItemList,
    ItemForm,
    FilterTabs,
  },
  data() {
    return {
      items: [], // Mảng chứa các mặt hàng
      activeFilter: "all", // Bộ lọc hiện tại ("all", "purchased", "not-purchased")
      currentView: "ItemList", // View đang hiển thị ("ItemList" hoặc "ItemForm")
      editingItem: null, // Mặt hàng đang được chỉnh sửa (nếu có)
    };
  },
  computed: {
    filteredItems() {
      // Lọc danh sách mặt hàng theo bộ lọc đang chọn
      if (!this.items) return [];
      if (this.activeFilter === "purchased") {
        return this.items.filter((item) => item.purchased);
      } else if (this.activeFilter === "not-purchased") {
        return this.items.filter((item) => !item.purchased);
      }
      return this.items;
    },
  },
  watch: {
    items: {
      // Tự động lưu danh sách mặt hàng vào localStorage mỗi khi thay đổi
      handler(newItems) {
        localStorage.setItem("shoppingList", JSON.stringify(newItems));
      },
      deep: true,
    },
  },
  mounted() {
    // Khi component được mount, tải dữ liệu từ localStorage nếu có
    const savedItems = localStorage.getItem("shoppingList");
    if (savedItems) {
      this.items = JSON.parse(savedItems) || [];
    }
  },
  methods: {
    handleSubmit(item) {
      // Xử lý khi form được submit (thêm mới hoặc cập nhật mặt hàng)
      if (!item || !item.name || item.name.trim() === "") return;

      if (this.editingItem) {
        // Cập nhật mặt hàng đã chỉnh sửa
        const index = this.items.findIndex((i) => i.id === item.id);
        if (index !== -1) {
          this.items[index] = item;
        }
      } else {
        // Thêm mặt hàng mới, tự tạo id bằng timestamp, mặc định chưa mua
        this.items.push({ ...item, id: Date.now(), purchased: false });
      }
      // Quay về danh sách và reset trạng thái chỉnh sửa
      this.currentView = "ItemList";
      this.editingItem = null;
    },
    toggleItem(id) {
      // Đổi trạng thái mua/chưa mua của mặt hàng theo id
      const item = this.items.find((i) => i.id === id);
      if (item) {
        item.purchased = !item.purchased;
      }
    },
    editItem(item) {
      // Bắt đầu chỉnh sửa mặt hàng: lưu mặt hàng và chuyển sang form
      this.editingItem = { ...item };
      this.currentView = "ItemForm";
    },
    deleteItem(id) {
      // Xóa mặt hàng theo id khỏi danh sách
      this.items = this.items.filter((i) => i.id !== id);
    },
    updateFilter(filter) {
      // Cập nhật bộ lọc trạng thái (all, purchased, not-purchased)
      this.activeFilter = filter;
    },
    showForm() {
      // Hiển thị form thêm mặt hàng mới, reset trạng thái chỉnh sửa
      this.editingItem = null;
      this.currentView = "ItemForm";
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
}

.add-button {
  display: block;
  margin: 12px 0;
  padding: 10px 18px;
  background-color: #28a745; /* Màu xanh lá */
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

.add-button:hover {
  background-color: #218838; /* Màu xanh đậm khi hover */
}
</style>
