<template>
  <!-- Form nhập thông tin dự án -->
  <form @submit.prevent="onSubmit" class="project-form">
    <!-- Nhập tiêu đề dự án -->
    <label>
      Title:
      <input type="text" v-model="form.title" required />
    </label>

    <!-- Nhập mô tả dự án -->
    <label>
      Description:
      <textarea v-model="form.description" required></textarea>
    </label>

    <!-- Nút submit: "Add Project" hoặc "Update Project" tùy theo trạng thái -->
    <button type="submit">{{ isEdit ? "Update" : "Add" }} Project</button>
  </form>
</template>

<script>
export default {
  name: "ProjectForm",

  // Nhận dữ liệu dự án (nếu có) từ component cha để xử lý update
  props: {
    projectData: {
      type: Object,
      default: null,
    },
  },

  // Khởi tạo dữ liệu form
  data() {
    return {
      form: {
        title: "",
        description: "",
      },
    };
  },

  // Xác định form đang ở chế độ "chỉnh sửa" hay "thêm mới"
  computed: {
    isEdit() {
      return !!this.projectData;
    },
  },

  // Nếu là chế độ edit, gán dữ liệu ban đầu từ props vào form
  mounted() {
    if (this.isEdit) {
      this.form = { ...this.projectData };
    }
  },

  methods: {
    // Xử lý khi submit form
    onSubmit() {
      const trimmedTitle = this.form.title.trim();
      const trimmedDesc = this.form.description.trim();

      // Kiểm tra dữ liệu không được để trống
      if (!trimmedTitle || !trimmedDesc) {
        alert("Vui lòng nhập đầy đủ tiêu đề và mô tả");
        return;
      }

      // Gửi dữ liệu lên component cha thông qua emit
      this.$emit("submit", {
        title: trimmedTitle,
        description: trimmedDesc,
      });
    },
  },
};
</script>

<style scoped>
/* Giao diện form dự án */
.project-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
}

/* Label bao input/textarea */
.project-form label {
  display: flex;
  flex-direction: column;
  font-weight: 600;
  font-size: 14px;
}

/* Input và textarea: bo tròn, padding, font cơ bản */
.project-form input,
.project-form textarea {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

/* Nút gửi form */
.project-form button {
  align-self: flex-start;
  padding: 8px 16px;
  font-weight: 700;
  cursor: pointer;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
}

/* Hover khi rê chuột vào nút */
.project-form button:hover {
  background-color: #155a9c;
}
</style>
