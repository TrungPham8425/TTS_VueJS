<template>
  <!--
    transition để tạo hiệu ứng khi phần tử xuất hiện
    sử dụng các lớp Tailwind CSS tùy chỉnh cho hiệu ứng vào (enter)
  -->
  <transition
    enter-active-class="transition-all duration-300"
    enter-from-class="transform scale-80 opacity-0"
    enter-to-class="transform scale-100 opacity-100"
  >
    <!--
      item danh sách task
      :key dùng để Vue tracking phần tử hiệu quả
      class kết hợp nhiều lớp Tailwind + điều kiện hoàn thành task
      animate__animated animate__fadeIn là lớp animation từ animate.css nếu bạn có dùng
    -->
    <li
      :key="task.id"
      :class="[
        'flex justify-between items-center p-2 border-b hover:bg-gray-100',
        task.completed ? 'bg-gray-100' : 'bg-white',
        'animate__animated animate__fadeIn',
      ]"
      :style="{ backgroundColor: task.completed ? '#f0f0f0' : 'white' }"
    >
      <!--
        checkbox để toggle trạng thái hoàn thành
        checked binding với task.completed
        @change phát sự kiện toggle kèm id task lên component cha
      -->
      <label class="flex items-center cursor-pointer">
        <input
          type="checkbox"
          class="mr-2"
          :checked="task.completed"
          @change="$emit('toggle', task.id)"
        />
        <!--
          Tiêu đề task, khi completed sẽ gạch ngang và màu chữ nhạt
        -->
        <span :class="{ 'line-through text-gray-500': task.completed }">
          {{ task.title }}
        </span>
      </label>

      <!--
        Nút xóa task, phát sự kiện delete với id task lên component cha
      -->
      <button
        @click="$emit('delete', task.id)"
        class="text-red-500 hover:text-red-700 font-bold"
        aria-label="Delete task"
      >
        &times;
      </button>
    </li>
  </transition>
</template>

<script>
export default {
  name: "TaskItem",
  props: {
    // Nhận đối tượng task từ component cha
    task: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
/* 
  Các class v-enter-active và v-enter-from dùng cho transition mặc định của Vue,
  bạn có thể giữ hoặc loại bỏ nếu không dùng 
*/
.v-enter-active {
  transition: all 0.3s;
}
.v-enter-from {
  transform: scale(0.8);
  opacity: 0;
}
</style>
