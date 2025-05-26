<template>
  <!-- Hiển thị một item dự án -->
  <div class="project-item">
    <!-- Thông tin tiêu đề và mô tả -->
    <div>
      <h3>{{ project.title }}</h3>
      <p>{{ project.description }}</p>
    </div>

    <!-- Các nút thao tác: xem chi tiết và xóa -->
    <div>
      <!-- Gửi event "view" với project khi bấm nút View -->
      <button class="btn edit-btn" @click="$emit('view', project)">View</button>

      <!-- Gửi event "delete" với project.id khi bấm nút Delete -->
      <button class="btn delete-btn" @click="$emit('delete', project.id)">
        Delete
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectItem",

  // Nhận prop từ component cha: object dự án
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Container dùng cho layout chung (có thể bị dư nếu không sử dụng trong file này) */
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
}

/* Giao diện nút chung */
.btn {
  padding: 6px 16px;
  border: none;
  border-radius: 4px;
  margin-right: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

/* Nút chỉnh sửa */
.edit-btn {
  background: #1976d2;
  color: #fff;
}

.edit-btn:hover {
  background: #1565c0;
}

/* Nút xóa */
.delete-btn {
  background: #e53935;
  color: #fff;
}

.delete-btn:hover {
  background: #b71c1c;
}

/* Giao diện card dự án */
.project-item {
  background: white;
  padding: 16px 20px;
  border-radius: 10px;
  border: 1.5px solid #e0e0e0;
  box-shadow: 0 4px 10px rgb(25 118 210 / 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: box-shadow 0.3s ease;
}

.project-item:hover {
  box-shadow: 0 6px 14px rgb(25 118 210 / 0.25);
}

/* Nếu dùng slot riêng cho info thì thêm class project-info */
.project-info {
  flex: 1;
  cursor: pointer;
}

.project-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1976d2;
}

.project-description {
  font-size: 1rem;
  color: #555;
  margin-top: 4px;
}

/* Group nút (hiện không được dùng) */
.buttons {
  display: flex;
  gap: 12px;
}

/* Nút chung (đang bị trùng với .btn ở trên, nên có thể xóa đoạn này nếu không dùng) */
button {
  background-color: #1976d2;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0f4a90;
}
</style>
