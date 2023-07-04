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
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return loginResult;
}
