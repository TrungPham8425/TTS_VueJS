<template>
  <!--
    transition để tạo hiệu ứng bounceIn khi form xuất hiện,
    dùng lớp animation từ animate.css
  -->
  <transition enter-active-class="animate__animated animate__bounceIn">
    <form @submit.prevent="submitForm" class="flex gap-2 mb-4" v-show="visible">
      <!--
        Ô nhập tiêu đề công việc mới
      -->
      <input
        type="text"
        v-model="title"
        placeholder="Nhập công việc mới..."
        class="w-full p-2 border rounded"
      />

      <!--nút Thêm công việc-->
      <button
        type="submit"
        :disabled="!isValid"
        :class="[
          'text-white p-2 rounded',
          isValid
            ? 'bg-green-500 hover:bg-green-600'
            : 'bg-gray-300 cursor-not-allowed',
        ]"
      >
        Thêm
      </button>
    </form>
  </transition>
</template>

<script>
export default {
  name: "TaskForm",
  data() {
    return {
      // Giá trị nhập công việc mới
      title: "",
      // Biến điều khiển hiển thị form (hiện tại luôn true)
      visible: true,
    };
  },
  computed: {
    // Kiểm tra dữ liệu hợp lệ (title không được rỗng)
    isValid() {
      return this.title.trim().length > 0;
    },
  },
  methods: {
    // Xử lý submit form
    submitForm() {
      if (!this.isValid) return; // Nếu không hợp lệ thì không làm gì

      // Tạo object task mới với id là timestamp hiện tại,
      // tiêu đề lấy từ title đã trim khoảng trắng,
      // trạng thái hoàn thành mặc định false
      const newTask = {
        id: Date.now(),
        title: this.title.trim(),
        completed: false,
      };

      // Phát sự kiện submit lên component cha kèm data task mới
      this.$emit("submit", newTask);

      // Reset lại input về rỗng sau khi submit
      this.title = "";
    },
  },
};
</script>

<style scoped>
/* Bạn có thể thêm style riêng nếu muốn */
</style>
