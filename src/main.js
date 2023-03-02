import { createApp} from "vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from "./App.vue";
import router from "./router";
import "@/assets/index.css";

import "../fa.config"

createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount("#app");
