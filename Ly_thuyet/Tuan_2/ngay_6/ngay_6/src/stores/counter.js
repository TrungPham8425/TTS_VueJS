import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    count: 0,
    name: "Vue User",
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
    greeting: (state) => `Hello, ${state.name}`,
  },
  actions: {
    increment() {
      this.count++;
    },
    async fetchCountFromApi() {
      const response = await fetch("https://api.example.com/count");
      const data = await response.json();
      this.count = data.count;
    },
  },
});
