<template>
  <div>
    <!-- Tiêu đề dựa vào trạng thái chỉnh sửa hay thêm mới -->
    <h2>{{ isEdit ? "Edit Project" : "Add New Project" }}</h2>

    <!-- Sử dụng component ProjectForm, truyền dữ liệu nếu đang chỉnh sửa -->
    <ProjectForm :projectData="project" @submit="handleSubmit" />
  </div>
</template>

<script>
import ProjectForm from "../components/ProjectForm.vue";

export default {
  name: "ProjectFormView",
  components: { ProjectForm },

  // Nhận id từ route params để xác định chỉnh sửa hay thêm mới
  props: {
    id: String,
  },

  // Inject dữ liệu project và hàm cập nhật từ App
  inject: ["projects", "updateProjects"],

  data() {
    return {
      project: null, // Dữ liệu project đang chỉnh sửa (nếu có)
    };
  },

  computed: {
    // Kiểm tra đang ở chế độ chỉnh sửa
    isEdit() {
      return !!this.id;
    },
  },

  mounted() {
    // Nếu chỉnh sửa, tìm project tương ứng từ danh sách
    if (this.isEdit) {
      this.project = this.projects.find((p) => p.id === this.id);

      // Nếu không tìm thấy, cảnh báo và quay lại danh sách
      if (!this.project) {
        alert("Project not found");
        this.$router.push("/projects");
      }
    }
  },

  methods: {
    // Xử lý khi form submit
    handleSubmit(formData) {
      if (this.isEdit) {
        // Nếu là chỉnh sửa: cập nhật lại project trong danh sách
        const index = this.projects.findIndex((p) => p.id === this.id);
        if (index !== -1) {
          const updated = [...this.projects];
          updated[index] = { ...updated[index], ...formData };
          this.updateProjects(updated);
        }
      } else {
        // Nếu là thêm mới: tạo project mới với ID duy nhất
        const newProject = {
          id: Date.now().toString(),
          ...formData,
          tasks: [], // khởi tạo danh sách task rỗng
        };
        this.updateProjects([...this.projects, newProject]);
      }

      // Sau khi lưu, quay lại trang danh sách
      this.$router.push("/projects");
    },
  },
};
</script>

<style scoped>
/* Giao diện danh sách project */
.project-item {
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
  cursor: pointer;
  background: #fafafa;
  transition: box-shadow 0.2s ease;
}

.project-item:hover {
  box-shadow: 0 4px 8px rgb(0 0 0 / 0.1);
}

.project-item h3 {
  margin: 0 0 8px;
  color: #1976d2;
  user-select: none;
}

.project-item p {
  margin: 0 0 12px;
  color: #444;
}

.project-item button {
  padding: 6px 12px;
  background-color: #d32f2f;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-weight: 600;
}

.project-item button:hover {
  background-color: #b71c1c;
}
</style>
