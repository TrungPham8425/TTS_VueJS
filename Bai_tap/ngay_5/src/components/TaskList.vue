<template>
  <!--
    transition-group để tạo hiệu ứng chuyển động khi danh sách thay đổi
    tag="ul" dùng thẻ ul làm container
  -->
  <transition-group name="task" tag="ul" class="mt-4">
    <!-- Lặp qua tasks và render TaskItem cho mỗi task -->
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @toggle="$emit('toggle', $event)"
      @delete="$emit('delete', $event)"
    />
  </transition-group>
</template>

<script>
import TaskItem from "./TaskItem.vue";

export default {
  name: "TaskList",
  components: { TaskItem },
  props: {
    // Nhận mảng task từ component cha
    tasks: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Hiệu ứng khi phần tử được thêm vào hoặc xóa khỏi danh sách */
.task-enter-active,
.task-leave-active {
  transition: all 0.3s;
}

/* Khi bắt đầu xuất hiện (enter-from) hoặc biến mất (leave-to) sẽ mờ dần và dịch sang phải */
.task-enter-from,
.task-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* Hiệu ứng di chuyển khi sắp xếp lại danh sách */
.task-move {
  transition: transform 0.3s;
}
</style>
