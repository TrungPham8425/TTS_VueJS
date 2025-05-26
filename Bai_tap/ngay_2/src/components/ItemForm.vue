<template>
  <!-- Form thêm/chỉnh sửa mặt hàng -->
  <form class="item-form" @submit.prevent="handleSubmit">
    <!-- Input nhập tên mặt hàng, ràng buộc 2 chiều với formData.name -->
    <input
      v-model="formData.name"
      type="text"
      placeholder="Tên mặt hàng"
      required
    />
    <!-- Input nhập số lượng, kiểu số, tối thiểu 1, ràng buộc với formData.quantity -->
    <input
      v-model.number="formData.quantity"
      type="number"
      min="1"
      placeholder="Số lượng"
      required
    />
    <!-- Nút submit, nội dung thay đổi theo trạng thái thêm mới hay chỉnh sửa -->
    <button type="submit">
      {{ initialData && initialData.id ? "Cập nhật" : "Thêm" }}
    </button>
  </form>
</template>

<script>
export default {
  name: "ItemForm",
  props: {
    // Nhận dữ liệu mặt hàng ban đầu để chỉnh sửa (hoặc mặc định cho thêm mới)
    initialData: {
      type: Object,
      required: false,
      default: () => ({ name: "", quantity: 1, purchased: false }),
    },
  },
  data() {
    return {
      // Khởi tạo dữ liệu form bằng bản sao của initialData để tránh thay đổi trực tiếp prop
      formData: { ...this.initialData },
    };
  },
  watch: {
    // Khi prop initialData thay đổi (ví dụ chọn mặt hàng khác để chỉnh sửa), cập nhật lại formData
    initialData(newData) {
      this.formData = { ...newData };
    },
  },
  methods: {
    // Xử lý submit form: phát sự kiện 'submit' kèm dữ liệu mặt hàng formData
    handleSubmit() {
      this.$emit("submit", { ...this.formData });

      // Nếu là thêm mới (không có id ban đầu), reset form về mặc định
      if (!this.initialData || !this.initialData.id) {
        this.formData = { name: "", quantity: 1, purchased: false };
      }
    },
  },
};
</script>

<style scoped>
.item-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.item-form input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
}

.item-form button {
  padding: 10px 16px;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.item-form button:hover {
  background-color: #0056b3;
}
</style>
