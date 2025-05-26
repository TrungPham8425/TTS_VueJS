<template>
  <div class="projects-container">
    <!-- Tiêu đề chính -->
    <h2>Projects</h2>

    <!-- Danh sách các project -->
    <div class="project-list">
      <ProjectItem
        v-for="project in projectsList"
        :key="project.id"
        :project="project"
        @delete="deleteProject"
        @view="viewProject"
      />
    </div>
  </div>
</template>

<script>
import ProjectItem from "../components/ProjectItem.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Projects",
  components: { ProjectItem },

  // Sử dụng inject để lấy dữ liệu projects và hàm update từ App cha
  inject: ["projects", "updateProjects"],

  computed: {
    // Lọc danh sách project: loại bỏ project thiếu title/description hoặc để trống
    projectsList() {
      return this.projects.filter(
        (p) =>
          p.title &&
          p.description &&
          p.title.trim() !== "" &&
          p.description.trim() !== ""
      );
    },
  },

  methods: {
    // Xử lý xóa project
    deleteProject(id) {
      // Lọc ra những project không bị xóa
      const updated = this.projectsList.filter((p) => p.id !== id);

      // Cập nhật lại danh sách
      this.updateProjects(updated);
    },

    // Điều hướng đến trang chi tiết của project
    viewProject(project) {
      this.$router.push({ name: "project-detail", params: { id: project.id } });
    },
  },
};
</script>

<style scoped>
.projects-container {
  max-width: 900px;
  margin: 40px auto;
  padding: 0 24px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 24px;
  font-weight: 700;
  color: #1565c0;
  font-size: 2.4rem;
}

.project-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
