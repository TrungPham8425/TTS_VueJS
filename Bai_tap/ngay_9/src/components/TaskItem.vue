<template>
  <div class="task-item" :class="{ completed: task.completed }">
    <div class="task-content">
      <label class="checkbox-label">
        <input
          type="checkbox"
          :checked="task.completed"
          @change="$emit('toggle', task.id)"
        />
        <span class="task-title">{{ task.title }}</span>
      </label>
    </div>

    <div class="task-actions">
      <button
        class="action-btn edit-btn"
        @click="$emit('edit', task)"
        title="Sửa công việc"
      >
        <span class="btn-text">Sửa</span>
      </button>
      <button
        class="action-btn delete-btn"
        @click="$emit('delete', task.id)"
        title="Xóa công việc"
      >
        <span class="btn-text">Xóa</span>
      </button>
    </div>
  </div>
</template>

<script setup>
// Định nghĩa props và events
defineProps({
  task: {
    type: Object,
    required: true,
  },
});

defineEmits(["edit", "delete", "toggle"]);
</script>

<style scoped>
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
}

.task-item:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  transform: translateY(-1px);
}

.task-item.completed .task-title {
  text-decoration: line-through;
  color: #9ca3af;
}

.task-content {
  flex: 1;
  min-width: 0;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 4px;
  border: 2px solid #42b883;
  cursor: pointer;
}

.task-title {
  font-size: 1rem;
  color: #1f2937;
  word-break: break-word;
}

.task-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.edit-btn {
  background-color: #60a5fa;
  color: white;
}

.edit-btn:hover {
  background-color: #3b82f6;
}

.delete-btn {
  background-color: #ef4444;
  color: white;
}

.delete-btn:hover {
  background-color: #dc2626;
}

@media (max-width: 640px) {
  .task-item {
    padding: 0.75rem;
  }

  .btn-text {
    display: none;
  }

  .action-btn {
    padding: 0.5rem;
  }

  .edit-btn::before {
    content: "✏️";
  }

  .delete-btn::before {
    content: "��️";
  }
}
</style>
