import { defineStore } from "pinia";
import {
  getEvent,
  getEventTotal,
  searchEvent,
} from "@/services/axios/event/event";

interface IState {
  eventList: any[];
  eventTotal: number;
  eventPageNum: number;
  eventPageSize: number;
}

export const useEventStore = defineStore("event", {
  state: (): IState => {
    return {
      eventList: [],
      eventPageNum: 1,
      eventPageSize: 10,
      eventTotal: 0,
    };
  },
  actions: {
    async getEventRequest(pageNum: number, pageSize: number) {
      const getEventResult = await getEvent(pageNum, pageSize);
      this.eventList = getEventResult.data.msg ?? [];
      return getEventResult.data;
    },

    async getEventTotalRequest() {
      const getEventTotalResult = await getEventTotal();
      this.eventTotal = getEventTotalResult.data.msg ?? 0;
      return getEventTotalResult.data;
    },

    async searchEventRequest(pageNum: number, pageSize: number, search: any) {
      const searchEventResult = await searchEvent(pageNum, pageSize, search);
      this.eventList = searchEventResult.data.msg.events ?? [];
      this.eventTotal = searchEventResult.data.msg.total ?? 0;
      return searchEventResult.data;
    },
  },
});
