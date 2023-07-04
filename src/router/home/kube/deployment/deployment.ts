const deployment = () => import("@/views/home/kube/deployment/deployment.vue");
export default {
  path: "/main/kube/deployment",
  name: "deployment",
  component: deployment,
  children: [],
};
