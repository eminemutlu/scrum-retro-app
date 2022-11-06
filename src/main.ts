import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Service  from "./service/service"

library.add(fas);

const app = createApp(App);
app.use(store);
app.use(router)
app.component("font-awesome-icon", FontAwesomeIcon);
Service.init();
app.mount("#app");
