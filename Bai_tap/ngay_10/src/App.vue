<template>
  <!-- Container chính với class động dựa vào theme -->
  <div class="app" :data-bs-theme="userSettings.theme">
    <!-- Header chứa tiêu đề và nút chuyển đổi theme -->
    <nav
      class="navbar navbar-expand-lg"
      :class="
        userSettings.theme === 'dark'
          ? 'navbar-dark bg-dark'
          : 'navbar-light bg-light'
      "
    >
      <div class="container">
        <span class="navbar-brand">Task Manager</span>
        <button class="btn btn-link" @click="toggleTheme">
          <i
            class="bi"
            :class="userSettings.theme === 'light' ? 'bi-moon-stars' : 'bi-sun'"
          ></i>
        </button>
      </div>
    </nav>

    <!-- Phần nội dung chính -->
    <main class="container py-4">
      <TaskForm @add="addTask" />
      <TaskList />
    </main>

    <!-- Footer -->
    <footer class="footer mt-auto py-3 bg-body-tertiary">
      <div class="container text-center">
        <span class="text-muted">Made with Vue.js 3 + Composition API</span>
      </div>
    </footer>
  </div>
</template>

<script>
import { defineComponent, reactive, provide, watch } from "vue";
import TaskForm from "./components/TaskForm.vue";
import TaskList from "./components/TaskList.vue";
import { useTasks } from "./composables/useTasks";

export default defineComponent({
  name: "App",
  components: {
    TaskForm,
    TaskList,
  },
  setup() {
    // Khởi tạo cài đặt người dùng với theme mặc định và cấu hình API
    const userSettings = reactive({
      theme: localStorage.getItem("theme") || "light",
      apiConfig: {
        baseUrl: "http://localhost:3000",
      },
    });

    // Theo dõi thay đổi theme để lưu vào localStorage
    watch(
      () => userSettings.theme,
      (newTheme) => {
        localStorage.setItem("theme", newTheme);
      }
    );

    // Cung cấp cài đặt cho các component con
    provide("userSettings", userSettings);
    provide("apiConfig", userSettings.apiConfig);

    // Lấy hàm thêm task từ composable
    const { addTask } = useTasks();

    // Hàm chuyển đổi theme sáng/tối
    const toggleTheme = () => {
      userSettings.theme = userSettings.theme === "light" ? "dark" : "light";
    };

    return {
      userSettings,
      addTask,
      toggleTheme,
    };
  },
});
</script>

<style>
/* Định nghĩa biến màu sắc cho theme sáng */
:root {
  --bg-color: #f5f5f5;
  --text-color: #333;
  --primary-color: #4caf50;
  --secondary-color: #9e9e9e;
  --border-color: #ddd;
  --card-bg: #ffffff;
  --shadow-color: rgba(0, 0, 0, 0.1);
}

/* Ghi đè biến màu sắc cho theme tối */
.dark {
  --bg-color: #1a1a1a;
  --text-color: #333;
  --primary-color: #66bb6a;
  --secondary-color: #757575;
  --border-color: #404040;
  --card-bg: #f5f5f5;
  --shadow-color: rgba(255, 255, 255, 0.05);
}

/* Reset CSS cơ bản */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Thiết lập font chữ và line-height cho toàn bộ ứng dụng */
body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
}

/* Style cho container chính */
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Style cho header */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: var(--primary-color);
  color: white;
}

/* Style cho tiêu đề */
h1 {
  font-size: 24px;
  font-weight: 600;
}

/* Style cho nút chuyển đổi theme */
.theme-toggle {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.theme-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Style cho phần nội dung chính */
main {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

/* Style cho footer */
footer {
  text-align: center;
  padding: 20px;
  color: var(--text-color);
  border-top: 1px solid var(--border-color);
  margin-top: 40px;
}

.navbar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-link {
  color: inherit;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 50%;
}

.btn-link:hover {
  background-color: rgba(var(--bs-primary-rgb), 0.1);
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
