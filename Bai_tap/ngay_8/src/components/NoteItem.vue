<template>
  <!-- Card hiển thị một ghi chú -->
  <div class="note-item" role="article">
    <!-- Phần nội dung ghi chú -->
    <div class="note-content">
      <h3 class="note-title">{{ note.title }}</h3>
      <p class="note-text">{{ note.content }}</p>
    </div>
    <!-- Phần chứa các nút tương tác -->
    <div class="note-actions">
      <!-- Nút chỉnh sửa ghi chú -->
      <button
        @click="$emit('edit', note)"
        class="action-button edit"
        aria-label="Chỉnh sửa ghi chú"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
          ></path>
          <path
            d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
          ></path>
        </svg>
      </button>
      <!-- Nút xóa ghi chú -->
      <button
        @click="$emit('delete', note.id)"
        class="action-button delete"
        aria-label="Xóa ghi chú"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M3 6h18"></path>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  // Định nghĩa props nhận vào là đối tượng ghi chú
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
  // Định nghĩa các sự kiện emit: chỉnh sửa và xóa
  emits: ["edit", "delete"],
};
</script>

<style scoped>
/* Card ghi chú:
   - Nền trắng với viền bo tròn
   - Hiệu ứng bóng đổ nhẹ
   - Animation khi hover */
.note-item {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* Hiệu ứng khi hover vào card:
   - Nâng nhẹ card lên
   - Tăng độ đậm của bóng đổ */
.note-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Phần nội dung của ghi chú */
.note-content {
  padding: 1.5rem;
  flex-grow: 1;
}

/* Tiêu đề ghi chú */
.note-title {
  color: #2c3e50;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

/* Nội dung ghi chú:
   - Giới hạn hiển thị 3 dòng
   - Thêm dấu ... nếu nội dung dài */
.note-text {
  color: #4b5563;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

/* Vùng chứa các nút tương tác */
.note-actions {
  display: flex;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background-color: #f8fafc;
  border-top: 1px solid #e2e8f0;
}

/* Kiểu dáng chung cho các nút */
.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
}

/* Hiệu ứng cho icon trong nút */
.action-button svg {
  transition: stroke 0.2s;
}

/* Nút chỉnh sửa - màu xanh Vue */
.action-button.edit {
  color: #42b883;
}

/* Hiệu ứng hover nút chỉnh sửa */
.action-button.edit:hover {
  background-color: #42b88320;
}

/* Nút xóa - màu đỏ */
.action-button.delete {
  color: #ef4444;
}

/* Hiệu ứng hover nút xóa */
.action-button.delete:hover {
  background-color: #ef444420;
}

/* Điều chỉnh kích thước cho màn hình điện thoại */
@media (max-width: 768px) {
  .note-content {
    padding: 1rem;
  }

  .note-actions {
    padding: 0.75rem 1rem;
  }
}
</style>
