import { createPinia } from "pinia";
import { useUserStore } from "./system/user";
import { useKubeStore } from "./kube/kube";
import { useBudgetStore } from "./fault/budget";

const pinia = createPinia();

export default pinia;
export { useUserStore, useKubeStore, useBudgetStore };
