<template>
  <div class="container">
    <!-- Tiêu đề ứng dụng -->
    <h1>Danh sách công việc</h1>

    <!-- Component form nhập công việc mới, dùng v-model để liên kết với biến newTaskTitle -->
    <TaskForm v-model="newTaskTitle" @add="addTask" />

    <!-- Các nút lọc danh sách công việc -->
    <div class="filters">
      <!-- Nút "Tất cả" sẽ hiện tất cả công việc -->
      <button :class="{ active: filter === 'all' }" @click="filter = 'all'">
        Tất cả
      </button>

      <!-- Nút "Hoàn thành" sẽ chỉ hiện các công việc đã hoàn thành -->
      <button
        :class="{ active: filter === 'completed' }"
        @click="filter = 'completed'"
      >
        Hoàn thành
      </button>

      <!-- Nút "Chưa hoàn thành" sẽ chỉ hiện các công việc chưa hoàn thành -->
      <button
        :class="{ active: filter === 'incomplete' }"
        @click="filter = 'incomplete'"
      >
        Chưa hoàn thành
      </button>
    </div>

    <!-- Hiển thị danh sách công việc sau khi lọc -->
    <ul>
      <!-- Lặp qua từng công việc trong danh sách đã lọc -->
      <TaskItem
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @toggle="toggleTask"
        @delete="deleteTask"
      />
    </ul>

    <!-- Hiển thị số lượng công việc chưa hoàn thành -->
    <p>Còn {{ remainingTasks }} công việc chưa hoàn thành</p>
  </div>
</template>

<script>
// Import 2 component con
import TaskItem from "./components/TaskItem.vue";
import TaskForm from "./components/TaskForm.vue";

export default {
  components: {
    TaskItem, // Hiển thị từng công việc
    TaskForm, // Form để thêm công việc mới
  },
  data() {
    return {
      tasks: [], // Mảng chứa danh sách công việc
      newTaskTitle: "", // Dữ liệu ô input cho công việc mới
      filter: "all", // Trạng thái lọc: 'all', 'completed', 'incomplete'
    };
  },
  computed: {
    // Tính số công việc chưa hoàn thành
    remainingTasks() {
      return this.tasks.filter((t) => !t.completed).length;
    },
    // Trả về danh sách công việc đã được lọc theo filter
    filteredTasks() {
      if (this.filter === "completed") {
        return this.tasks.filter((t) => t.completed);
      } else if (this.filter === "incomplete") {
        return this.tasks.filter((t) => !t.completed);
      }
      return this.tasks;
    },
  },
  methods: {
    // Thêm công việc mới vào danh sách
    addTask(title) {
      if (!title.trim()) return; // Nếu tiêu đề trống thì không thêm
      this.tasks.push({
        id: Date.now(), // Tạo ID duy nhất dựa trên thời gian
        title, // Tiêu đề công việc
        completed: false, // Mặc định là chưa hoàn thành
      });
      this.newTaskTitle = ""; // Xóa ô input sau khi thêm
    },
    // Đổi trạng thái hoàn thành của công việc (true <=> false)
    toggleTask(id) {
      const task = this.tasks.find((t) => t.id === id);
      if (task) task.completed = !task.completed;
    },
    // Xóa công việc khỏi danh sách
    deleteTask(id) {
      this.tasks = this.tasks.filter((t) => t.id !== id);
    },
  },
  mounted() {
    // Khi ứng dụng vừa mở, kiểm tra xem có dữ liệu trong localStorage không
    const saved = localStorage.getItem("tasks");
    if (saved) {
      this.tasks = JSON.parse(saved); // Nếu có thì nạp lại danh sách
    }
  },
  watch: {
    // Theo dõi sự thay đổi trong tasks để lưu vào localStorage
    tasks: {
      handler(newTasks) {
        localStorage.setItem("tasks", JSON.stringify(newTasks));
      },
      deep: true, // Theo dõi sâu bên trong mảng (ví dụ: thay đổi completed)
    },
  },
};
</script>

<style>
/* Giao diện tổng thể */
.container {
  max-width: 600px;
  margin: 0 auto;
}

/* Gỡ bỏ style mặc định của danh sách */
ul {
  list-style: none;
  padding: 0;
}

/* Các nút lọc */
.filters {
  margin-bottom: 16px;
  display: flex;
  gap: 8px;
}

/* Style cho nút lọc */
.filters button {
  padding: 6px 12px;
  cursor: pointer;
}

/* Style cho nút đang được chọn */
.filters button.active {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
}
</style>
