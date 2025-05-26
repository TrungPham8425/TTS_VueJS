<template>
  <div id="app" class="container">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import { reactive, computed, watch, provide } from "vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
  setup() {
    // Tạo reactive object cho projects
    const state = reactive({
      projects: [],
    });

    // Load projects từ localStorage lúc khởi tạo
    const storedProjects = localStorage.getItem("projects");
    if (storedProjects) {
      state.projects = JSON.parse(storedProjects);
    }

    // Watch thủ công để lưu localStorage khi projects thay đổi
    watch(
      () => state.projects,
      (newProjects) => {
        localStorage.setItem("projects", JSON.stringify(newProjects));
      },
      { deep: true }
    );

    // Hàm cập nhật projects giữ reactive
    function updateProjects(newProjects) {
      state.projects.splice(0, state.projects.length, ...newProjects);
    }

    // Cung cấp reactive state và updateProjects qua provide
    provide(
      "projects",
      computed(() => state.projects)
    );
    provide("updateProjects", updateProjects);

    return {};
  },
};
</script>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
}
</style>
