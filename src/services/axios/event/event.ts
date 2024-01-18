import httpRequest from "../index";

enum EventApi {
  getEvent = "/get/event",
  getEventTotal = "/get/event/total",
  searchEvent = "/search/event",
}

/**
 * 获取事件列表
 * @param pageNum 页码
 * @param pageSize 每页事件数量
 * @returns Promise 返回事件列表
 */
export function getEvent(pageNum: number, pageSize: number) {
  return httpRequest.get({
    url: EventApi.getEvent,
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
    },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}

/**
 * 获取事件总数
 * @returns {Promise} 返回一个Promise对象，该对象的响应主体包含事件总数的信息
 */
export function getEventTotal() {
  return httpRequest.get({
    url: EventApi.getEventTotal,
    headers: {
      Accept: "application/json",
    },
  });
}

/**
 * 搜索事件
 * @param pageNum 页码
 * @param pageSize 每页大小
 * @param search 搜索条件
 * @returns 返回http请求
 */
export function searchEvent(pageNum: number, pageSize: number, search: any) {
  return httpRequest.post({
    url: EventApi.searchEvent,
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
    },
    data: search,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}
