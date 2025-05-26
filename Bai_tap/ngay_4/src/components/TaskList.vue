<template>
  <!-- Hiển thị danh sách các task  -->
  <ul class="task-list">
    <!-- Duyệt qua mảng tasks truyền vào để hiển thị từng task -->
    <li v-for="task in tasks" :key="task.id">
      {{ task.title }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "TaskList",

  // Nhận prop từ component cha
  props: {
    tasks: {
      type: Array, // tasks phải là mảng
      required: true, // bắt buộc phải có
    },
  },
};
</script>

<style scoped>
/* Giao diện đơn giản cho danh sách task */
.task-list {
  padding: 8px;
  list-style-type: disc;
  padding-left: 20px;
  font-size: 16px;
  font-family: Arial, sans-serif;
}

.task-list li {
  margin-bottom: 8px;
  color: #333;
}
</style>
