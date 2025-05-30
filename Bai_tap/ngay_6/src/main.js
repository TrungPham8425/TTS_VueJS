import { createApp } from "vue";
import App from "./App.vue";
// import pinia
import { createPinia } from "pinia";
// import autoSave
import { autoSavePlugin } from "./stores/plugins";

const app = createApp(App);
const pinia = createPinia();
pinia.use(autoSavePlugin);
app.use(pinia);
app.mount("#app");
