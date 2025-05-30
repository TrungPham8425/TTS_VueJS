<template>
  <div class="task-list-container">
    <!-- Hiển thị thông báo khi không có công việc -->
    <div v-if="!tasks.length" class="empty-message">
      Chưa có công việc nào. Hãy thêm công việc mới!
    </div>

    <!-- Danh sách các công việc -->
    <div v-else v-memo="[tasks.length]" class="task-list">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @edit="$emit('edit', $event)"
        @delete="$emit('delete', $event)"
        @toggle="$emit('toggle', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import TaskItem from "./TaskItem.vue";

// Định nghĩa props và events
defineProps({
  tasks: {
    type: Array,
    required: true,
    default: () => [],
  },
});

defineEmits(["edit", "delete", "toggle"]);
</script>

<style scoped>
.task-list-container {
  margin-top: 1rem;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.empty-message {
  text-align: center;
  padding: 2rem;
  color: #64748b;
  font-size: 1.1rem;
  background: white;
  border-radius: 8px;
  border: 2px dashed #e2e8f0;
}

@media (max-width: 640px) {
  .task-list {
    gap: 0.75rem;
  }

  .empty-message {
    padding: 1.5rem;
    font-size: 1rem;
  }
}
</style>
