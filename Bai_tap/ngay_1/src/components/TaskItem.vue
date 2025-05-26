<template>
  <!-- Một thẻ <li> đại diện cho 1 công việc -->
  <!-- Nếu công việc đã hoàn thành thì thêm class 'done' để gạch ngang -->
  <li :class="{ done: task.completed }">
    <label>
      <!-- Checkbox kiểm tra trạng thái hoàn thành -->
      <input
        type="checkbox"
        :checked="task.completed"
        @change="$emit('toggle', task.id)"
      />
      {{ task.title }}
    </label>

    <!-- Nút xóa công việc -->
    <button class="delete" @click="$emit('delete', task.id)">Delete</button>
  </li>
</template>

<script>
export default {
  props: {
    task: Object,
  },
};
</script>

<style>
li {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}
.done {
  text-decoration: line-through;
  color: #888;
}
.delete {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
