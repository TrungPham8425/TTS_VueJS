// src/main.js
import { createApp, h, provide } from "vue";
import App from "./App.vue";

// Import Apollo Client mặc định để inject vào toàn bộ app
import { DefaultApolloClient } from "@vue/apollo-composable";
import apolloClient from "./services/apollo"; // Cấu hình đã bao gồm WebSocket link

const app = createApp({
  setup() {
    // Inject Apollo Client mặc định
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App), // Render App.vue
});

app.mount("#app");
