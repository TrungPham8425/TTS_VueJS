import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createApp } from "vue";
import App from "./App.vue";
import { vFocus } from "./directives/v-focus";
import { vTooltip } from "./directives/v-tooltip";

const app = createApp(App);

// Register custom directives
app.directive("focus", vFocus);
app.directive("tooltip", vTooltip);

app.mount("#app");
