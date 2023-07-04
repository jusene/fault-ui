const service = () => import("@/views/home/kube/service/service.vue");
export default {
  path: "/main/kube/service",
  name: "service",
  component: service,
  children: [],
};
