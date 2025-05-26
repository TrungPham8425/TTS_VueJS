<!-- src/components/TaskForm.vue -->
<template>
  <!-- Khi submit form, gọi hàm submit() và ngăn không reload trang -->
  <form @submit.prevent="submit">
    <input v-model="input" type="text" placeholder="Thêm công việc mới..." />
    <button>+ Thêm</button>
  </form>
</template>

<script>
export default {
  // Lấy giá trị nhập ở ô input
  props: {
    modelValue: String,
  },
  // Khai báo các sự kiện mà component này sẽ phát ra
  emits: ["update:modelValue", "add"],

  computed: {
    input: {
      get() {
        // Lấy giá trị từ modelValue truyền từ component cha
        return this.modelValue;
      },
      set(value) {
        // Khi giá trị thay đổi, phát sự kiện để cập nhật cho cha
        this.$emit("update:modelValue", value);
      },
    },
  },

  methods: {
    submit() {
      // Tạo sự kiện sử lý thêm công việc
      this.$emit("add", this.input);
    },
  },
};
</script>

<style>
/* CSS cho form nhập */
form {
  display: flex;
  gap: 8px; /* khoảng cách giữa các phần tử */
  margin-bottom: 16px;
}

/* CSS cho ô nhập */
input {
  flex: 1; /* chiếm hết phần còn lại */
  padding: 6px;
}

/* CSS cho nút */
button {
  padding: 6px 12px;
}
</style>
