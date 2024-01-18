import httpRequest from "../index";

enum LoginApi {
  AccountLogin = "/login",
  LoginUserInfo = "/users/",
}

export function accountLoginRequest(account: any) {
  const loginResult = httpRequest.post({
    url: LoginApi.AccountLogin,
    data: {
      username: account.name,
      password: account.password,
      loginType: "account",
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return loginResult;
}

export function dingTalkLoginRequest(code: any) {
  const loginResult = httpRequest.post({
    url: LoginApi.AccountLogin,
    data: {
      code: code,
      loginType: "dingTalk",
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return loginResult;
}
