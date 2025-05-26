<template>
  <div class="max-w-md mx-auto p-4">
    <!-- Form thêm công việc mới -->
    <TaskForm @submit="addTask" />

    <!-- Bộ lọc công việc theo trạng thái -->
    <div class="flex gap-2 mb-4 justify-center">
      <button
        @click="filterStatus = 'all'"
        :class="[
          'px-4 py-1 rounded',
          filterStatus === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200',
        ]"
      >
        Tất cả
      </button>
      <button
        @click="filterStatus = 'completed'"
        :class="[
          'px-4 py-1 rounded',
          filterStatus === 'completed'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200',
        ]"
      >
        Hoàn thành
      </button>
      <button
        @click="filterStatus = 'incomplete'"
        :class="[
          'px-4 py-1 rounded',
          filterStatus === 'incomplete'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200',
        ]"
      >
        Chưa hoàn thành
      </button>
    </div>

    <!-- Danh sách công việc, nhận tasks đã lọc theo trạng thái -->
    <TaskList
      :tasks="filteredTasks"
      @toggle="toggleTask"
      @delete="deleteTask"
    />
  </div>
</template>

<script>
import TaskForm from "./components/TaskForm.vue";
import TaskList from "./components/TaskList.vue";

export default {
  components: { TaskForm, TaskList },
  data() {
    return {
      // Lấy danh sách công việc từ localStorage hoặc khởi tạo mảng rỗng
      tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),

      // Trạng thái bộ lọc: 'all' | 'completed' | 'incomplete'
      filterStatus: "all",
    };
  },
  computed: {
    // Lọc tasks dựa trên trạng thái filterStatus
    filteredTasks() {
      if (this.filterStatus === "completed") {
        return this.tasks.filter((t) => t.completed);
      } else if (this.filterStatus === "incomplete") {
        return this.tasks.filter((t) => !t.completed);
      }
      // Nếu filterStatus là 'all' thì trả về tất cả
      return this.tasks;
    },
  },
  methods: {
    // Thêm task mới vào danh sách
    addTask(newTask) {
      this.tasks.push({
        ...newTask,
        id: Date.now(), // Tạo id duy nhất theo timestamp hiện tại
        completed: false, // Mặc định task mới chưa hoàn thành
      });
    },

    // Đổi trạng thái completed của task theo id
    toggleTask(id) {
      const task = this.tasks.find((t) => t.id === id);
      if (task) task.completed = !task.completed;
    },

    // Xóa task theo id
    deleteTask(id) {
      this.tasks = this.tasks.filter((t) => t.id !== id);
    },
  },
  watch: {
    // Theo dõi tasks thay đổi và lưu lại vào localStorage
    tasks: {
      handler(newTasks) {
        localStorage.setItem("tasks", JSON.stringify(newTasks));
      },
      deep: true,
    },
  },
};
</script>

<style></style>
