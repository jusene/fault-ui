import { defineStore } from "pinia";
import httpRequest from "@/services/axios";

interface IState {
  lastDeploymentList: any[];
  deploymentList: any[];
  podList: any[];
  deploymentTotal: number;
  podTotal: number;
  eventList: any[];
}

export const useKubeStore = defineStore("kube", {
  state: (): IState => {
    return {
      lastDeploymentList: [],
      deploymentList: [],
      podList: [],
      deploymentTotal: 1,
      podTotal: 1,
      eventList: [],
    };
  },
  actions: {
    // 清空event
    clearEvent() {
      this.eventList = [];
    },
    // 搜索event
    async requestEvent(name: any) {
      if (name === "") {
        return [];
      }
      const eventResult = await httpRequest.post({
        baseURL: "http://kube-center.iguming.net/apis",
        url: "/event/search/" + name,
      });
      this.eventList = eventResult.data;
      return this.eventList;
    },
    // 请求deployment信息
    async requestDeployment() {
      const deploymentResult = await httpRequest.get({
        baseURL: "http://kube-center.iguming.net/apis",
        url: "/deployment/list",
        params: {
          namespace: "pro",
        },
        headers: {
          Accept: "application/json",
        },
      });
      this.lastDeploymentList = deploymentResult.data.items;
      this.deploymentList = deploymentResult.data.items;
      this.deploymentTotal = deploymentResult.data.items.length;
      return this.deploymentList;
    },
    // 获取deployment分页数据
    getDeploymentShowList(pageNum: number, pageSize: number) {
      return this.deploymentList.slice(
        (pageNum - 1) * pageSize,
        pageNum * pageSize
      );
    },
    // 请求pod信息
    async requestPod() {
      const podResult = await httpRequest.get({
        baseURL: "http://kube-center.iguming.net/apis",
        url: "/pod/list",
        params: {
          namespace: "pro",
        },
      });
      this.podList = podResult.data.items;
      this.podTotal = podResult.data.items.length;
      return this.podList;
    },
    // 获取pod的分页数据
    getPodShowList(pageNum: number, pageSize: number) {
      return this.podList.slice((pageNum - 1) * pageSize, pageNum * pageSize);
    },
    // 搜索特定应用的pod数据
    async requestAppPod(app: string) {
      const appPodResult = await httpRequest.get({
        baseURL: "http://kube-center.iguming.net/apis",
        url: "/pod/list/" + app,
        params: {
          namespace: "pro",
        },
      });
      this.podList = appPodResult.data.items;
      this.podTotal = appPodResult.data.items.length;
      return this.podList;
    },
    // deployment伸缩容
    async scaleDeployment(app: string, replicas: number) {
      const scaleDeploymentResult = await httpRequest.put({
        baseURL: "http://kube-center.iguming.net/apis",
        url: "/deployment/update/replicas",
        data: {
          app: app,
          namespace: "pro",
          profile: "pro",
          replicas: Number(replicas),
        },
      });
      return scaleDeploymentResult;
    },
    // 搜索特定要求的deployemnt数据
    updateDeploymentList(deploymentList: any) {
      this.deploymentList = deploymentList;
      this.deploymentTotal = deploymentList.length;
    },
  },
});
