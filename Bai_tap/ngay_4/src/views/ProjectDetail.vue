<template>
  <div class="project-detail">
    <!-- Nếu project tồn tại thì hiển thị nội dung chi tiết -->
    <div v-if="project">
      <!-- Phần tiêu đề và mô tả -->
      <div class="project-header">
        <h2 class="project-title">{{ project.title }}</h2>
        <p class="project-description">{{ project.description }}</p>
      </div>

      <!-- Tabs điều hướng: Tasks và Edit -->
      <div class="tabs">
        <router-link class="tab-link" :to="`${$route.fullPath}/tasks`">
          Tasks
        </router-link>
        <router-link class="tab-link" :to="`/projects/${project.id}/edit`">
          Edit Project
        </router-link>
      </div>

      <!-- Nơi hiển thị component con theo route -->
      <router-view />
    </div>

    <!-- Nếu không tìm thấy project -->
    <div v-else>
      <p class="not-found">Project not found.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectDetail",

  // Nhận prop từ route để biết ID của project đang xem
  props: ["id"],

  // Inject danh sách projects từ App thông qua provide/inject
  inject: ["projects"],

  data() {
    return {
      project: null, // Biến lưu thông tin project hiện tại
    };
  },

  // Khi prop id thay đổi (hoặc lần đầu), tìm project phù hợp
  watch: {
    id: {
      immediate: true,
      handler(newId) {
        this.project = this.projects.find((p) => p.id === newId);
      },
    },
  },

  // Khi component được gắn vào DOM, tìm lại project
  mounted() {
    this.project = this.projects.find((p) => p.id === this.id);
  },
};
</script>

<style scoped>
.project-detail {
  max-width: 800px;
  margin: 32px auto;
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(25, 118, 210, 0.1);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.project-header {
  border-bottom: 2px solid #1976d2;
  padding-bottom: 16px;
  margin-bottom: 24px;
}

.project-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #1976d2;
  margin: 0;
}

.project-description {
  font-size: 1.1rem;
  margin-top: 10px;
  color: #555;
  line-height: 1.5;
}

.tabs {
  display: flex;
  gap: 24px;
  margin-top: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid #eee;
}

.tab-link {
  font-size: 1rem;
  font-weight: 600;
  color: #1976d2;
  text-decoration: none;
  padding-bottom: 8px;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
}

.tab-link:hover {
  border-bottom-color: #90caf9;
}

.tab-link.router-link-exact-active {
  border-bottom-color: #1976d2;
  color: #0d47a1;
}

.not-found {
  text-align: center;
  font-size: 1.2rem;
  color: #999;
}
</style>
