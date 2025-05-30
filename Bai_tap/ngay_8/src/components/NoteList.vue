<template>
  <!-- Container chính cho danh sách ghi chú -->
  <div class="note-list">
    <!-- Lưới hiển thị các ghi chú với layout tự động điều chỉnh -->
    <div class="note-grid">
      <note-item
        v-for="note in notes"
        :key="note.id"
        :note="note"
        @edit="$emit('editNote', $event)"
        @delete="$emit('deleteNote', $event)"
      />
    </div>
    <!-- Hiển thị thông báo khi không có ghi chú nào -->
    <div v-if="!notes.length" class="empty-state">
      <p>Chưa có ghi chú nào. Hãy thêm ghi chú mới!</p>
    </div>
  </div>
</template>

<script>
// Import component hiển thị từng ghi chú riêng lẻ
import NoteItem from "./NoteItem.vue";

export default {
  components: { NoteItem },
  // Định nghĩa props nhận vào là mảng các ghi chú
  props: {
    notes: {
      type: Array,
      required: true,
      default: () => [], // Giá trị mặc định là mảng rỗng
    },
  },
  // Định nghĩa các sự kiện sẽ emit ra component cha
  emits: ["editNote", "deleteNote"],
};
</script>

<style scoped>
/* Khoảng cách phía trên danh sách ghi chú */
.note-list {
  margin-top: 2rem;
}

/* Layout lưới cho các ghi chú:
   - Tự động điều chỉnh số cột dựa trên không gian có sẵn
   - Mỗi ghi chú có độ rộng tối thiểu 300px
   - Tự động căn đều khoảng cách */
.note-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

/* Kiểu dáng cho trạng thái không có ghi chú */
.empty-state {
  text-align: center;
  padding: 2rem;
  color: #64748b;
  font-size: 1.1rem;
}

/* Điều chỉnh layout cho màn hình điện thoại:
   - Chuyển sang 1 cột
   - Giảm khoảng cách giữa các ghi chú */
@media (max-width: 768px) {
  .note-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
