<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="login-page">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Username" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

const login = () => {
  // Kiểm tra thông tin đăng nhập
  if (username.value === "admin" && password.value === "admin123") {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("role", "admin");
    router.push("/projects");
  } else if (username.value === "user" && password.value === "user123") {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("role", "user");
    router.push("/projects");
  } else {
    error.value = "Invalid username or password";
  }
};
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 100px auto;
  padding: 24px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  /* thêm: để đảm bảo chiều ngang */
  width: 100%;
  box-sizing: border-box;
}

h2 {
  text-align: center;
  color: #1976d2;
  margin-bottom: 8px;
  font-weight: 600;
}

/* input chiếm 100% chiều ngang form */
input {
  padding: 12px 14px;
  font-size: 1rem;
  border: 1.5px solid #ccc;
  border-radius: 6px;
  transition: border-color 0.3s ease;
  width: 100%; /* sửa width = 100% */
  box-sizing: border-box; /* tính padding, border vào width */
  max-length: 30;
}

input:focus {
  outline: none;
  border-color: #1976d2;
  box-shadow: 0 0 6px #1976d2aa;
}

/* nút đăng nhập cũng chiếm 100% */
button {
  padding: 12px;
  font-size: 1.1rem;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
  width: 100%;
  margin-top: 8px;
}

button:hover {
  background-color: #125a9c;
}

p {
  text-align: center;
  font-weight: 500;
}
</style>
