<template>
  <AddUser />
  <div class="container">
    <h1>Danh sách người dùng</h1>
    <ul v-if="users.length">
      <li v-for="user in users" :key="user.id">
        <strong>{{ user.name }}</strong> - {{ user.email }}
      </li>
    </ul>
    <p v-else-if="error">Không thể tải dữ liệu: {{ error }}</p>
    <p v-else>Đang tải dữ liệu...</p>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import AddUser from "./components/AddUser.vue";
import api from "./services/api";

// Import useSubscription từ Apollo
import { useSubscription } from "@vue/apollo-composable";
import { NEW_USER_SUBSCRIPTION } from "./graphql/subscriptions";

const users = ref([]);
const error = ref(null);

// Gọi REST API ban đầu
api
  .get("") // baseURL đã là /users
  .then((response) => {
    users.value = response.data;
  })
  .catch((err) => {
    console.error("Lỗi khi lấy dữ liệu:", err);
    error.value = err.message || "Lỗi không xác định";
  });

// Đăng ký subscription để nhận user mới theo thời gian thực
const { result: newUserResult } = useSubscription(NEW_USER_SUBSCRIPTION);

watch(newUserResult, (val) => {
  if (val?.newUser) {
    users.value.push(val.newUser);
  }
});
</script>

<style>
.container {
  max-width: 600px;
  margin: 50px auto;
  font-family: Arial, sans-serif;
}
h1 {
  text-align: center;
  color: #2c3e50;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
</style>
