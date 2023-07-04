const user = () => import("@/views/home/system/user/user.vue");
export default {
  path: "/system/user/list",
  name: "user",
  component: user,
  children: [],
};
