<template>
  <div>
    <!-- Tiêu đề hiển thị ID project hiện tại -->
    <h3>Tasks for Project {{ id }}</h3>
    <!-- Component con TaskList nhận props tasks để hiển thị danh sách công việc -->
    <TaskList :tasks="tasks" />
  </div>
</template>

<script>
import TaskList from "../components/TaskList.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Tasks",

  // Nhận id project làm props từ router hoặc component cha
  props: ["id"],

  data() {
    return {
      // Mảng lưu tasks của project, ban đầu rỗng
      tasks: [],
    };
  },

  mounted() {
    // Khi component mount lên, lấy dữ liệu projects từ localStorage (hoặc mock nếu chưa có)
    const projectsData = JSON.parse(localStorage.getItem("projects") || "[]");

    // Tìm project theo id
    const project = projectsData.find((p) => p.id === this.id);

    // Nếu tìm thấy project thì lấy tasks của project, nếu không có thì dùng mock tasks
    this.tasks = project?.tasks || [
      { id: 1, title: "Sample Task 1" },
      { id: 2, title: "Sample Task 2" },
    ];
  },

  components: {
    TaskList,
  },
};
</script>

<style scoped>
.tasks-container {
  padding: 16px 0;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.task-item {
  padding: 12px 16px;
  border: 1.2px solid #ddd;
  border-radius: 8px;
  margin-bottom: 12px;
  background: #f9f9f9;
  transition: box-shadow 0.3s ease;
}

.task-item:hover {
  box-shadow: 0 4px 10px rgb(25 118 210 / 0.15);
}

.task-title {
  font-weight: 600;
  color: #1976d2;
}

.task-desc {
  font-size: 0.95rem;
  color: #555;
  margin-top: 4px;
}
</style>
