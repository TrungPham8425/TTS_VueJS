<template>
  <form @submit.prevent="handleSubmit" class="task-form">
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    <div class="form-group">
      <input
        v-model="form.title"
        placeholder="Nhập tên công việc"
        class="task-input"
        :disabled="loading"
      />
    </div>
    <div class="form-group checkbox-group">
      <label class="checkbox-label">
        <input type="checkbox" v-model="form.completed" :disabled="loading" />
        <span>Đã hoàn thành</span>
      </label>
    </div>
    <button type="submit" class="submit-button" :disabled="loading">
      <span v-if="loading">Đang xử lý...</span>
      <span v-else>{{ props.editTask ? "Cập nhật" : "Thêm mới" }}</span>
    </button>
  </form>
</template>

<script setup>
import { reactive, ref, watchEffect } from "vue";
import { createTask, updateTask } from "@/api/api";

// Định nghĩa props và events
const props = defineProps({ editTask: Object });
const emit = defineEmits(["saved"]);

// Khởi tạo form data và trạng thái
const form = reactive({ title: "", completed: false });
const loading = ref(false);
const error = ref("");

// Theo dõi thay đổi của editTask để cập nhật form
watchEffect(() => {
  if (props.editTask) {
    form.title = props.editTask.title;
    form.completed = props.editTask.completed;
  }
});

// Xử lý sự kiện submit form
async function handleSubmit() {
  // Reset error
  error.value = "";

  // Kiểm tra title không được để trống
  if (!form.title.trim()) {
    error.value = "Vui lòng nhập tên công việc";
    return;
  }

  try {
    loading.value = true;

    // Nếu có editTask thì cập nhật, không thì tạo mới
    if (props.editTask) {
      await updateTask(props.editTask.id, form);
    } else {
      await createTask(form);
    }

    // Reset form và emit event saved
    form.title = "";
    form.completed = false;
    emit("saved");
  } catch (err) {
    error.value = err.message || "Có lỗi xảy ra khi lưu công việc";
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.task-form {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

.task-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.task-input:focus {
  outline: none;
  border-color: #42b883;
  box-shadow: 0 0 0 2px rgba(66, 184, 131, 0.2);
}

.checkbox-group {
  display: flex;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
  color: #4a5568;
}

.checkbox-label input[type="checkbox"] {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 4px;
  border: 2px solid #42b883;
  cursor: pointer;
}

.submit-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-button:hover {
  background-color: #3aa876;
}

.submit-button:active {
  transform: translateY(1px);
}

.error-message {
  background-color: #fee2e2;
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.submit-button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

input:disabled,
button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
