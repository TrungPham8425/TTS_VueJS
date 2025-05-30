<template>
  <div class="home">
    <h1>Chào mừng bạn đến với ứng dụng Quản lý Ghi chú</h1>
    <router-link to="/notes">
      <md-button class="md-primary">Xem danh sách ghi chú</md-button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 40px;
}
</style>
