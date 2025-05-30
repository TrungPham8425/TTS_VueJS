<!-- Component form thêm công việc mới -->
<template>
  <form @submit.prevent="handleSubmit" class="task-form">
    <div class="input-group">
      <!-- Input nhập tiêu đề công việc với directive focus tự động -->
      <input
        v-focus
        type="text"
        v-model="title"
        placeholder="Thêm công việc mới..."
        :class="{ 'is-invalid': showError }"
        class="form-control"
      />
      <!-- Nút thêm công việc, disable khi không có nội dung -->
      <button type="submit" class="btn btn-primary" :disabled="!title.trim()">
        <i class="bi bi-plus-lg me-1"></i>
        Thêm
      </button>
    </div>
    <!-- Hiển thị thông báo lỗi khi cần -->
    <div v-if="showError" class="invalid-feedback d-block">
      Vui lòng nhập tiêu đề công việc
    </div>
  </form>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import { vFocus } from "../directives/v-focus";

export default defineComponent({
  name: "TaskForm",
  // Đăng ký directive focus
  directives: {
    focus: vFocus,
  },
  // Khai báo events
  emits: ["add"],
  setup(_, { emit }) {
    // Khai báo reactive data
    const title = ref("");
    const showError = ref(false);

    // Theo dõi thay đổi của title để ẩn thông báo lỗi
    watch(title, () => {
      if (title.value.trim()) {
        showError.value = false;
      }
    });

    // Xử lý sự kiện submit form
    const handleSubmit = () => {
      // Kiểm tra và hiển thị lỗi nếu không có nội dung
      if (!title.value.trim()) {
        showError.value = true;
        return;
      }

      // Emit sự kiện add với nội dung đã trim
      emit("add", title.value.trim());
      // Reset form
      title.value = "";
      showError.value = false;
    };

    return {
      title,
      showError,
      handleSubmit,
    };
  },
});
</script>

<style scoped>
/* Style cho form */
.task-form {
  margin-bottom: 1.5rem;
}

/* Container cho input và button */
.input-group {
  display: flex;
  gap: 8px;
}

/* Style cho input */
input {
  flex: 1;
  padding: 8px 12px;
  border: 2px solid var(--border-color);
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.2s;
  background-color: var(--card-bg);
  color: var(--text-color);
}

input:focus {
  outline: none;
  border-color: var(--primary-color);
}

/* Style cho trạng thái lỗi */
input.error {
  border-color: #f44336;
}

/* Style cho button */
button {
  padding: 8px 16px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

/* Hiệu ứng hover cho button */
button:hover:not(:disabled) {
  filter: brightness(1.1);
}

/* Style cho button bị disable */
button:disabled {
  background-color: var(--border-color);
  cursor: not-allowed;
}

/* Style cho thông báo lỗi */
.error-message {
  color: #f44336;
  margin-top: 4px;
  font-size: 14px;
}

/* Style cho dark mode */
:root[data-bs-theme="dark"] .form-control {
  background-color: var(--bs-dark);
  border-color: var(--bs-border-color);
  color: var(--bs-light);
}

:root[data-bs-theme="dark"] .form-control:focus {
  background-color: var(--bs-dark);
  color: var(--bs-light);
}
</style>
