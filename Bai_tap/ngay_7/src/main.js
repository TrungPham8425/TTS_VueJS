// src/main.js
import { createApp, provide, h } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import App from "./App.vue";
import router from "./router"; // Đã được chuẩn hóa
import apolloClient from "./apollo";

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
    return () => h(App);
  },
});

app.use(router);
app.mount("#app");
