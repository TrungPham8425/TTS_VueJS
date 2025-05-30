<template>
  <div v-if="task">
    <h2>{{ task.title }}</h2>
    <p>Status: {{ task.completed ? "Done" : "Pending" }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getTask } from "@/api/api";

const route = useRoute();
const task = ref(null);

onMounted(async () => {
  task.value = await getTask(route.params.id);
});
</script>
