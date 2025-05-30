<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    :clipped="$vuetify.display.mdAndUp"
    width="256"
  >
    <v-list nav dense>
      <v-list-item link to="/">
        <v-list-item-icon><v-icon>mdi-home</v-icon></v-list-item-icon>
        <v-list-item-title>Trang chủ</v-list-item-title>
      </v-list-item>

      <v-list-item link to="/notes">
        <v-list-item-icon><v-icon>mdi-note-multiple</v-icon></v-list-item-icon>
        <v-list-item-title>Ghi chú</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from "vue";

const drawer = ref(true);
</script>

<style scoped>
/* Bạn có thể tùy chỉnh css cho nav drawer ở đây */
</style>
