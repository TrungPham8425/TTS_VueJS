<template>
  <div class="app">
    <ErrorBoundary>
      <router-view />
    </ErrorBoundary>
  </div>
</template>

<script setup>
import ErrorBoundary from "./components/ErrorBoundary.vue";
</script>

<style>
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
}
</style>
