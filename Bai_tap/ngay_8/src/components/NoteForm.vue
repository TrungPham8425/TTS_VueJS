<template>
  <form @submit.prevent="handleSubmit" class="note-form">
    <div class="form-group">
      <label for="title" class="form-label">Tiêu đề</label>
      <input
        id="title"
        v-model="title"
        type="text"
        class="form-input"
        :class="{ error: titleError }"
        aria-describedby="titleError"
        required
      />
      <span id="titleError" v-if="titleError" class="error-message">
        {{ titleError }}
      </span>
    </div>

    <div class="form-group">
      <label for="content" class="form-label">Nội dung</label>
      <textarea
        id="content"
        v-model="content"
        class="form-input form-textarea"
        required
      ></textarea>
    </div>

    <button type="submit" class="submit-button">
      {{ isEdit ? "Cập nhật" : "Thêm" }} ghi chú
    </button>
  </form>
</template>

<script setup>
/* eslint-disable no-undef */

import { ref, watch } from "vue";

// Xóa import toRefs vì không dùng
// import { toRefs } from 'vue'

const props = defineProps({
  noteToEdit: Object,
});

const emit = defineEmits(["submitNote"]);

const title = ref(props.noteToEdit?.title || "");
const content = ref(props.noteToEdit?.content || "");
const isEdit = ref(!!props.noteToEdit);

const titleError = ref("");

watch(
  () => props.noteToEdit,
  (newVal) => {
    title.value = newVal?.title || "";
    content.value = newVal?.content || "";
    isEdit.value = !!newVal;
  }
);

function handleSubmit() {
  if (!title.value.trim()) {
    titleError.value = "Tiêu đề không được để trống";
    return;
  }
  titleError.value = "";
  emit("submitNote", {
    title: title.value,
    content: content.value,
  });
  // Clear form sau khi submit
  title.value = "";
  content.value = "";
  isEdit.value = false;
}
</script>

<style scoped>
.note-form {
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
  font-size: 0.95rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  background-color: #f8fafc;
}

.form-input:focus {
  outline: none;
  border-color: #42b883;
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.1);
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
}

.form-input.error {
  border-color: #ef4444;
}

.error-message {
  display: block;
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.submit-button {
  background-color: #42b883;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
}

.submit-button:hover {
  background-color: #3aa876;
}

.submit-button:active {
  background-color: #359469;
}

@media (max-width: 768px) {
  .note-form {
    padding: 1rem;
  }

  .form-input {
    padding: 0.625rem;
  }

  .submit-button {
    padding: 0.625rem 1.25rem;
  }
}
</style>
