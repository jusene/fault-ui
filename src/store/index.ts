import { createPinia } from "pinia";
import { useUserStore } from "./system/user";
import { useKubeStore } from "./kube/kube";
import { useBudgetStore } from "./fault/budget";
import { useFaultStore } from "./fault/fault";
import { useImproveStore } from "./fault/improve";

const pinia = createPinia();

export default pinia;
export {
  useUserStore,
  useKubeStore,
  useBudgetStore,
  useImproveStore,
  useFaultStore,
};
