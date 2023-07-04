import { defineStore } from "pinia";
import {
  getBudget,
  addBudget,
  getBudgetDomainList,
  updateBudget,
  GetBudgetAll,
  getGroupFault,
  getFaultTrend,
} from "@/services/axios/fault/budget";

interface IState {
  budgetList: any[];
  groupFault: any[];
  faultTrend: any[];
}

export const useBudgetStore = defineStore("budget", {
  state: (): IState => {
    return {
      budgetList: [],
      groupFault: [],
      faultTrend: [],
    };
  },
  actions: {
    async getBudgetRequest(budget: string) {
      const getBudgetResult = await getBudget(budget);
      return getBudgetResult;
    },

    async addBudgetRequest(budget: string) {
      const addBudgetResult = await addBudget(budget);
      return addBudgetResult;
    },

    async getBudgetDomainListRequest() {
      const getBudgetDomainListResult = await getBudgetDomainList();
      return getBudgetDomainListResult;
    },

    async updateBudgetRequest(budgetInfo: any) {
      const updateBudgetResult = await updateBudget(budgetInfo);
      return updateBudgetResult;
    },

    async getBudgetAllRequest() {
      const getBudgetAllResult = await GetBudgetAll();
      if (getBudgetAllResult.data.code === 200 && getBudgetAllResult.data.msg) {
        this.budgetList = getBudgetAllResult.data.msg;
      }
      return getBudgetAllResult;
    },

    async getGroupFaultRequest() {
      const getGroupFaultResult = await getGroupFault();
      if (
        getGroupFaultResult.data.code === 200 &&
        getGroupFaultResult.data.msg
      ) {
        this.groupFault = getGroupFaultResult.data.msg;
      }
      return getGroupFaultResult;
    },

    async getFaultTrendRequest() {
      const getFaultTrendResult = await getFaultTrend();
      if (
        getFaultTrendResult.data.code === 200 &&
        getFaultTrendResult.data.msg
      ) {
        this.faultTrend = getFaultTrendResult.data.msg;
      }
      return getFaultTrendResult;
    },
  },
});
