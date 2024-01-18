import { createApp } from "vue";
import App from "./App.vue";
import pinia from "./store";
import router from "./router";
import "normalize.css";
import "./assets/css/index.less";
import "element-plus/theme-chalk/el-message.css";
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-notification.css";
import "element-plus/theme-chalk/el-tooltip.css";
import { menuLst } from "@/components/nav-menu/src/config/menu-lst";
import { mapMenusToRoutes } from "@/utils/map-menu";
import { globalProperties } from "./global";
import VueECharts from "vue-echarts";

const initRouter = async () => {
  mapMenusToRoutes(menuLst).forEach((route) => {
    router.addRoute("home", route);
  });
};

const boot = async () => {
  await initRouter();
  const app = createApp(App);
  app.use(globalProperties);
  app.component("v-chart", VueECharts);
  app.use(pinia).use(router).mount("#app");
};

boot();
