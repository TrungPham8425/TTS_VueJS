<!-- Component hiển thị một công việc -->
<template>
  <div class="task-item card" :class="{ 'border-success': task.completed }">
    <div class="card-body d-flex align-items-center justify-content-between">
      <div class="task-content d-flex align-items-center gap-3">
        <!-- Checkbox đánh dấu hoàn thành -->
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            :checked="task.completed"
            @change="$emit('toggle', task.id)"
          />
        </div>
        <!-- Hiển thị tiêu đề công việc hoặc form chỉnh sửa -->
        <div
          v-if="!isEditing"
          class="task-title"
          :class="{ 'text-decoration-line-through text-muted': task.completed }"
          @dblclick="startEditing"
        >
          {{ task.title }}
        </div>
        <input
          v-else
          v-focus
          type="text"
          v-model="editedTitle"
          @blur="finishEditing"
          @keyup.enter="finishEditing"
          @keyup.esc="cancelEditing"
          class="form-control"
        />
      </div>
      <!-- Các nút hành động -->
      <div class="task-actions d-flex gap-2">
        <button
          class="btn btn-outline-primary btn-sm"
          v-tooltip="'Sửa công việc'"
          @click="startEditing"
        >
          <i class="bi bi-pencil-square"></i>
        </button>
        <button
          class="btn btn-outline-danger btn-sm"
          v-tooltip="'Xóa công việc'"
          @click="$emit('delete', task.id)"
        >
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { vTooltip } from "../directives/v-tooltip";
import { vFocus } from "../directives/v-focus";

export default defineComponent({
  name: "TaskItem",
  // Đăng ký các directive
  directives: {
    tooltip: vTooltip,
    focus: vFocus,
  },
  // Khai báo props
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  // Khai báo events
  emits: ["toggle", "update", "delete"],
  setup(props, { emit }) {
    // Khai báo reactive data cho chức năng chỉnh sửa
    const isEditing = ref(false);
    const editedTitle = ref("");

    // Bắt đầu chỉnh sửa
    const startEditing = () => {
      editedTitle.value = props.task.title;
      isEditing.value = true;
    };

    // Hoàn thành chỉnh sửa
    const finishEditing = () => {
      if (editedTitle.value.trim() && editedTitle.value !== props.task.title) {
        emit("update", props.task.id, { title: editedTitle.value.trim() });
      }
      isEditing.value = false;
    };

    // Hủy chỉnh sửa
    const cancelEditing = () => {
      isEditing.value = false;
    };

    return {
      isEditing,
      editedTitle,
      startEditing,
      finishEditing,
      cancelEditing,
    };
  },
});
</script>

<style scoped>
.task-item {
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
}

.task-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.task-title {
  font-size: 1rem;
  margin: 0;
  cursor: pointer;
}

/* Giữ nguyên màu icon trong dark mode */
.btn-outline-primary i,
.btn-outline-danger i {
  color: inherit;
}

/* Style cho dark mode */
:root[data-bs-theme="dark"] .task-item {
  background-color: var(--bs-dark);
  border-color: var(--bs-border-color);
}

:root[data-bs-theme="dark"] .task-title {
  color: var(--bs-light);
}
</style>
