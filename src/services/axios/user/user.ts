import httpRequest from "../index";

enum UserApi {
  UserList = "/get/user/list",
  RegisterUser = "/register",
  DelUser = "/del/user/",
  UpdateUser = "/update/user",
}

export function getUserList(pageNum: number, pageSize: number) {
  const UserListResult = httpRequest.get({
    url: UserApi.UserList,
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
    },
    headers: {
      Accept: "application/json",
    },
  });

  return UserListResult;
}

export function addUser(userInfo: any) {
  const addUserResult = httpRequest.post({
    url: UserApi.RegisterUser,
    data: userInfo,
    headers: {
      "Content-Type": "application/json",
      Accept: "applicetion/json",
    },
  });

  return addUserResult;
}

export function delUser(userId: number) {
  const delUserResult = httpRequest.delete({
    url: UserApi.DelUser + userId,
    headers: {
      Accept: "applicetion/json",
    },
  });

  return delUserResult;
}

export function updateUser(userInfo: any) {
  const updateUserResult = httpRequest.put({
    url: UserApi.UpdateUser,
    data: userInfo,
    headers: {
      "Content-Type": "application/json",
      Accept: "applicetion/json",
    },
  });

  return updateUserResult;
}
