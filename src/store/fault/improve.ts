import {
  addAction,
  getActions,
  getAllActionsName,
  getAllFaults,
  searchAction,
  updateAction,
} from "@/services/axios/fault/improve";
import { defineStore } from "pinia";

interface IState {
  actionList: any[];
  actionTotal: number;
  actionPageNum: number;
  actionPageSize: number;
}

export const useImproveStore = defineStore("improve", {
  state: (): IState => {
    return {
      actionList: [],
      actionTotal: 0,
      actionPageNum: 1,
      actionPageSize: 10,
    };
  },
  actions: {
    // 添加故障action
    async AddActionRequest(actionInfo: any) {
      const addActionResult = await addAction(actionInfo);
      return addActionResult.data;
    },

    async GetAllFaultsRequest() {
      const getAllFaultsResult = await getAllFaults();
      return getAllFaultsResult.data;
    },

    async getActionRequest(pageNum: number, pageSize: number) {
      const getActionResult = await getActions(pageNum, pageSize);
      this.actionList = getActionResult.data.msg ?? [];
      return getActionResult.data;
    },

    async getActionTotal() {
      const getActionTotal = await getAllActionsName();
      this.actionTotal = getActionTotal.data.msg.length;
      return getActionTotal.data;
    },

    async updateActionRequest(update: any) {
      const updateActionResult = await updateAction(update);
      return updateActionResult.data;
    },

    async getAllActiosNameRequest() {
      const getAllActiosNameResult = await getAllActionsName();
      return getAllActiosNameResult.data;
    },

    async searchActionRequest(search: any) {
      const searchActionResult = await searchAction(search);
      return searchActionResult.data;
    },
  },
});
