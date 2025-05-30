<template>
  <div class="tasks-container">
    <h1 class="page-title">Quản lý công việc</h1>
    <div class="tasks-content">
      <!-- Form thêm/sửa công việc -->
      <TaskForm :editTask="editTask" @saved="fetchTasks" />

      <!-- Danh sách công việc -->
      <TaskList
        :tasks="tasks"
        @edit="editTask = $event"
        @delete="handleDelete"
        @toggle="toggleComplete"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getTasks, deleteTask, updateTask } from "@/api/api";
import TaskForm from "@/components/TaskForm.vue";
import TaskList from "@/components/TaskList.vue";

// Khai báo reactive data
const tasks = ref([]);
const editTask = ref(null);

// Lấy danh sách công việc từ API
async function fetchTasks() {
  try {
    tasks.value = await getTasks();
  } catch (error) {
    console.error("Lỗi khi lấy danh sách công việc:", error);
    alert("Có lỗi xảy ra khi tải danh sách công việc!");
  }
}

// Xử lý xóa công việc
async function handleDelete(id) {
  try {
    await deleteTask(id);
    fetchTasks();
  } catch (error) {
    console.error("Lỗi khi xóa công việc:", error);
    alert("Có lỗi xảy ra khi xóa công việc!");
  }
}

// Xử lý cập nhật trạng thái hoàn thành
async function toggleComplete(id) {
  const task = tasks.value.find((t) => t.id === id);
  if (task) {
    try {
      await updateTask(id, { ...task, completed: !task.completed });
      fetchTasks();
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      alert("Có lỗi xảy ra khi cập nhật trạng thái!");
    }
  }
}

// Gọi API lấy danh sách khi component được mount
onMounted(fetchTasks);
</script>

<style scoped>
.tasks-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.page-title {
  color: #2c3e50;
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid #42b883;
}

.tasks-content {
  background: #f8fafc;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

@media (max-width: 640px) {
  .tasks-container {
    padding: 1rem;
  }

  .page-title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .tasks-content {
    padding: 1rem;
  }
}
</style>
