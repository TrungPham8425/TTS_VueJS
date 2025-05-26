/* Nhập và khởi tạo ứng dụng Vue */
import { createApp } from "vue";
import App from "./App.vue";
/* Nhập component NavigationBar để đăng ký toàn cục */
import NavigationBar from "./components/NavigationBar.vue";

/* Tạo instance Vue */
const app = createApp(App);

/* Đăng ký global component NavigationBar */
app.component("NavigationBar", NavigationBar);

/* Mount ứng dụng vào #app */
app.mount("#app");
