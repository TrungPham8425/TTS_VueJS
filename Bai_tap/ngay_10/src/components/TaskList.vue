<template>
  <div class="task-list">
    <div class="task-filters">
      <button
        v-for="filter in filters"
        :key="filter.value"
        :class="{ active: currentFilter === filter.value }"
        @click="currentFilter = filter.value"
      >
        {{ filter.label }}
      </button>
    </div>

    <div class="tasks-container">
      <TransitionGroup name="list">
        <TaskItem
          v-for="task in filteredTasks"
          :key="task.id"
          :task="task"
          @toggle="toggleTask"
          @update="updateTask"
          @delete="confirmDelete"
        />
      </TransitionGroup>
    </div>

    <p v-if="filteredTasks.length === 0" class="empty-message">
      No tasks found
    </p>

    <Modal
      :is-open="showDeleteModal"
      title="Delete Task"
      @close="cancelDelete"
      @confirm="deleteTask"
    >
      <p>Are you sure you want to delete this task?</p>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import TaskItem from "./TaskItem.vue";
import Modal from "./Modal.vue";
import { useTasks } from "../composables/useTasks";

const {
  tasks,
  updateTask: updateTaskFn,
  deleteTask: deleteTaskFn,
  toggleTaskComplete,
} = useTasks();

const filters = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
];

const currentFilter = ref("all");
const showDeleteModal = ref(false);
const taskToDelete = ref(null);

const filteredTasks = computed(() => {
  switch (currentFilter.value) {
    case "active":
      return tasks.value.filter((task) => !task.completed);
    case "completed":
      return tasks.value.filter((task) => task.completed);
    default:
      return tasks.value;
  }
});

const toggleTask = (taskId) => {
  toggleTaskComplete(taskId);
};

const updateTask = (taskId, updates) => {
  updateTaskFn(taskId, updates);
};

const confirmDelete = (taskId) => {
  taskToDelete.value = taskId;
  showDeleteModal.value = true;
};

const deleteTask = () => {
  if (taskToDelete.value) {
    deleteTaskFn(taskToDelete.value);
    taskToDelete.value = null;
  }
  showDeleteModal.value = false;
};

const cancelDelete = () => {
  taskToDelete.value = null;
  showDeleteModal.value = false;
};
</script>

<style scoped>
.task-list {
  margin-top: 20px;
}

.task-filters {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.task-filters button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background-color: #f0f0f0;
  cursor: pointer;
  transition: background-color 0.2s;
}

.task-filters button.active {
  background-color: #4caf50;
  color: white;
}

.empty-message {
  text-align: center;
  color: #666;
  margin-top: 20px;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
