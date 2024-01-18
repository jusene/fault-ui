import httpRequest from "../index";

enum ActionApi {
  CreateTodo = "/todo/create",
  UpdateTodo = "/todo/update",
  GetAllFaults = "/todo/get/faults",
  GetAllActions = "/todo/get/actions",
  GetAllActionsName = "/todo/get/actions/name",
  SearchAction = "/todo/search/action",
}

export function addAction(actionInfo: any) {
  return httpRequest.post({
    url: ActionApi.CreateTodo,
    data: actionInfo,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}

export function getAllFaults() {
  return httpRequest.get({
    url: ActionApi.GetAllFaults,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}

export function getActions(pageNum: number, pageSize: number) {
  return httpRequest.get({
    url: ActionApi.GetAllActions,
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

export function updateAction(update: any) {
  return httpRequest.post({
    url: ActionApi.UpdateTodo,
    data: update,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}

export function getAllActionsName() {
  return httpRequest.get({
    url: ActionApi.GetAllActionsName,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}

export function searchAction(search: any) {
  return httpRequest.post({
    url: ActionApi.SearchAction,
    data: search,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}
