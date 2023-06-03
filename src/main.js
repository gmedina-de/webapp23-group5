import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./controllers/router";
import VueFeather from "vue-feather";

createApp(App).use(router).component(VueFeather.name, VueFeather).mount("#app");
