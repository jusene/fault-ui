import { defineStore } from "pinia";
import {
  getCategory,
  getFault,
  getFaultHistory,
  getFaultTotal,
  reportFault,
  searchFault,
  updateFault,
} from "@/services/axios/fault/fault";

interface IState {
  faultList: any[];
  faultTotal: number;
  faultPageNum: number;
  faultPageSize: number;
}

export const useFaultStore = defineStore("fault", {
  state: (): IState => {
    return {
      faultList: [],
      faultPageNum: 1,
      faultPageSize: 10,
      faultTotal: 0,
    };
  },
  getters: {},
  actions: {
    // 上报故障
    async reportFaultrRequest(faultInfo: any) {
      const reportFaultResult = await reportFault(faultInfo);
      return reportFaultResult.data;
    },

    // 获取故障列表
    async getFaultRequest(pageNum: number, pageSize: number) {
      const getFaultRequestResult = await getFault(pageNum, pageSize);
      this.faultList = getFaultRequestResult.data.msg ?? [];
      return getFaultRequestResult.data;
    },

    // 获取故障总数
    async getFaultTotalRequest() {
      const getFaultTotalResult = await getFaultTotal();
      this.faultTotal = getFaultTotalResult.data.msg;
      return getFaultTotalResult.data;
    },

    // 更新故障数据
    async updateFaultRequest(faultInfo: any, notice = false) {
      const updateFaultResult = await updateFault(faultInfo, notice);
      return updateFaultResult.data;
    },

    // 根据故障获取历史数据
    async getFaultHistoryRequest(faultInfo: any) {
      const getFaultHistoryResult = await getFaultHistory(faultInfo);
      return getFaultHistoryResult.data;
    },

    // 搜索故障
    async searchFaultRequest(faultInfo: any) {
      const searchFaultResult = await searchFault(faultInfo);
      return searchFaultResult.data;
    },

    // 获取故障类别
    async getFaultCategoryRequest() {
      const getFaultCategoryResult = await getCategory();
      return getFaultCategoryResult.data;
    },
  },
});
