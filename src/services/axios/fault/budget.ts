import httpRequest from "../index";

enum BudgetApi {
  GetBudget = "/get/fault/budget",
  AddBudget = "/add/fault/budget",
  GetBudgetDomain = "/get/fault/budget/domain",
  UpdateBudget = "/update/fault/budget",
  GetBudgetAll = "/get/budget/info",
  GetGroupFault = "/get/fault/group/list",
  GetFaultTrend = "/get/fault/trend",
}

export function getBudgetInfo() {
  return httpRequest.get({
    url: BudgetApi.GetBudgetAll,
    headers: {
      Accept: "application/json",
    },
  });
}

export function getBudget(budget: string) {
  return httpRequest.get({
    url: BudgetApi.GetBudget,
    params: {
      budget: budget,
    },
    headers: {
      Accept: "application/json",
    },
  });
}

export function addBudget(budget: string) {
  return httpRequest.post({
    url: BudgetApi.AddBudget,
    data: {
      name: budget,
    },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}

export function getBudgetDomainList() {
  return httpRequest.get({
    url: BudgetApi.GetBudgetDomain,
    headers: {
      Accept: "application/json",
    },
  });
}

export function updateBudget(budgetInfo: any) {
  return httpRequest.post({
    url: BudgetApi.UpdateBudget,
    data: budgetInfo,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}

export function GetBudgetAll() {
  return httpRequest.get({
    url: BudgetApi.GetBudgetAll,
    headers: {
      Accept: "application/json",
    },
  });
}

export function getGroupFault() {
  return httpRequest.get({
    url: BudgetApi.GetGroupFault,
    headers: {
      Accept: "application/json",
    },
  });
}

export function getFaultTrend() {
  return httpRequest.get({
    url: BudgetApi.GetFaultTrend,
    headers: {
      Accept: "application/json",
    },
  });
}
