<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav class="navbar">
    <router-link to="/projects">Projects</router-link>
    <router-link v-if="role === 'admin'" to="/projects/new"
      >Add Project</router-link
    >
    <button v-if="isAuthenticated" @click="logout">Logout</button>
  </nav>
</template>

<script setup>
/* eslint-disable vue/multi-word-component-names */
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Reactive trạng thái đăng nhập và role
const isAuthenticated = ref(false);
const role = ref(null);

// Khi component được mount, load trạng thái từ localStorage
onMounted(() => {
  isAuthenticated.value = localStorage.getItem("isAuthenticated") === "true";
  role.value = localStorage.getItem("role");
});

// Hàm đăng xuất
const logout = () => {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("role");

  isAuthenticated.value = false;
  role.value = null;

  router.push("/");
};
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 18px 32px;
  background-color: #1565c0;
  color: white;
  font-weight: 600;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

router-link {
  color: white;
  text-decoration: none;
  font-size: 1.05rem;
  transition: color 0.3s ease;
}

router-link:hover {
  color: #90caf9;
}

button {
  margin-left: auto;
  background: transparent;
  border: 1.5px solid white;
  color: white;
  padding: 6px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease, color 0.3s ease;
}

button:hover {
  background-color: white;
  color: #1565c0;
}
</style>
