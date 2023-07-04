import httpRequest from "../index";

enum FaultApi {
  ReportFault = "/report/fault",
  getFault = "/get/fault",
  getFaultTotal = "/get/fault/total",
  updateFault = "/update/fault",
  getFaultHistory = "/get/fault/history",
  searchFault = "/search/fault",
  getDomain = "/get/fault/domain",
  getDomainLevel = "/get/fault/domain/level",
  getLevel = "/get/fault/level",
  getStatus = "/get/fault/status",
  getTag = "/get/fault/tag",
  getSource = "/get/fault/source",
  getPerson = "/get/fault/person",
}

// 上报故障
export function reportFault(faultInfo: any) {
  return httpRequest.post({
    url: FaultApi.ReportFault,
    data: faultInfo,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}

// 获取故障列表
export function getFault(pageNum: number, pageSize: number) {
  return httpRequest.get({
    url: FaultApi.getFault,
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

// 获取故障总数
export function getFaultTotal() {
  return httpRequest.get({
    url: FaultApi.getFaultTotal,
    headers: {
      Accept: "application/json",
    },
  });
}

// 更新故障数据
export function updateFault(faultInfo: any, notice: boolean) {
  return httpRequest.post({
    url: FaultApi.updateFault,
    data: faultInfo,
    params: {
      notice: notice,
    },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}

// 获取制定故障的历史处理数据
export function getFaultHistory(faultInfo: any) {
  return httpRequest.get({
    url: FaultApi.getFaultHistory,
    params: {
      faultId: faultInfo.id,
    },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}

// 搜索故障
export function searchFault(faultInfo: any) {
  return httpRequest.post({
    url: FaultApi.searchFault,
    data: faultInfo,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}

// 获取业务等级信息
export function getDomainLevel() {
  return httpRequest.get({
    url: FaultApi.getDomainLevel,
    headers: {
      Accept: "application/json",
    },
  });
}

// 获取业务域信息
export function getDomain() {
  return httpRequest.get({
    url: FaultApi.getDomain,
    headers: {
      Accept: "application/json",
    },
  });
}

// 获取故障等级信息
export function getLevel() {
  return httpRequest.get({
    url: FaultApi.getLevel,
    headers: {
      Accept: "application/json",
    },
  });
}

// 获取故障状态
export function getStatus() {
  return httpRequest.get({
    url: FaultApi.getStatus,
    headers: {
      Accept: "application/json",
    },
  });
}

// 获取故障标签
export function getTag() {
  return httpRequest.get({
    url: FaultApi.getTag,
    headers: {
      Accept: "application/json",
    },
  });
}

// 获取故障上报渠道
export function getSource() {
  return httpRequest.get({
    url: FaultApi.getSource,
    headers: {
      Accept: "application/json",
    },
  });
}

// 获取故障人员
export function requestPerson() {
  return httpRequest.get({
    url: FaultApi.getPerson,
    headers: {
      Accept: "application/json",
    },
  });
}
