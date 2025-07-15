import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import "./assets/main.css";
import router from "./router";
import { useAuthStore } from "./stores/authStore";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

const auth = useAuthStore();
auth.restoreAuthFromLocalStorage();

app.use(router);
app.mount("#app");
