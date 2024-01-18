import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import localCache from "@/utils/cache";
import { firstMenu } from "@/utils/map-menu";
import jwtTokenParse from "@/utils/parse-jwt";
import dayjs from "dayjs";

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const HomeView = () =>
  import(/* webpackChunkName: "home" */ "@/views/home/homeView.vue");
const LoginView = () =>
  import(/* webpackChunkName: "login" */ "@/views/login/loginView.vue");
const YuQueFrameView = () =>
  import(
    /* webpackChunkName: "frame" */ "@/views/home/fault/frame/frameView.vue"
  );

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/main",
    name: "home",
    component: HomeView,
    children: [
      {
        path: "yuque/index",
        name: "yuque",
        component: YuQueFrameView,
        meta: {
          title: "语雀",
        },
      },
    ],
    meta: {
      title: "主页",
      isShow: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      title: "登陆",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/not-found/not-found.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (_to, _from) => {
  nProgress.start();
  if (_to.meta.title) {
    document.title = _to.meta.title;
  }
  // console.log(_to.fullPath);
  if (_to.path != "/login") {
    const token = localCache.getCache("token");
    if (!token) {
      localCache.setCache("fault_redirect", _to.fullPath);
      router.push("/login?redirect=" + _to.fullPath);
    } else {
      const userinfo = jwtTokenParse(token);
      const nowTimeStamp = dayjs().unix();
      if (!userinfo.id || userinfo.exp < nowTimeStamp) {
        localCache.deleteCache("token");
        router.push("/login?redirect=" + _to.fullPath);
      }
    }
  }

  if (_to.path === "/main") {
    return firstMenu.url;
  }
});

router.afterEach((_to) => {
  nProgress.done();
});

export default router;
