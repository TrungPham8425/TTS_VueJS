<template>
  <div>
    <h2>AppCounter Component</h2>
    <p>Giá trị hiện tại: {{ count }}</p>
    <p>Gấp đôi: {{ doubleCount }}</p>
    <button @click="increment">Tăng</button>
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";

const counter = useCounterStore();
const { count, doubleCount, increment } = counter;
</script>

<style scoped>
button {
  padding: 6px 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
