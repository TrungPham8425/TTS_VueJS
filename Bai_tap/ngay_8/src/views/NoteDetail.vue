<template>
  <div class="note-detail" v-if="note">
    <h2>{{ note.title }}</h2>
    <p>{{ note.content }}</p>
    <router-link to="/notes">
      <md-button class="md-primary">Quay lại danh sách</md-button>
    </router-link>
  </div>
  <div v-else>
    <p>Không tìm thấy ghi chú.</p>
    <router-link to="/notes">
      <md-button class="md-primary">Quay lại danh sách</md-button>
    </router-link>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import useNotes from "@/composables/useNotes.js";

const route = useRoute();
const { notes } = useNotes();

const note = computed(() => notes.value.find((n) => n.id === route.params.id));
</script>

<style scoped>
.note-detail {
  max-width: 600px;
  margin: 24px auto;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
</style>
