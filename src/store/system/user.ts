import { defineStore } from "pinia";
import localCache from "@/utils/cache";
import {
  addUser,
  delUser,
  getUserList,
  updateUser,
} from "@/services/axios/user/user";
import { accountLoginRequest } from "@/services/axios/user/login";

interface IUserState {
  user: string;
  userList: any[];
  userTotal: number;
  userPageNum: number;
  userPageSize: number;
}

export const useUserStore = defineStore("user", {
  state: (): IUserState => {
    return {
      user: "",
      userList: [],
      userTotal: 0,
      userPageNum: 1,
      userPageSize: 10,
    };
  },
  actions: {
    // 获取用户列表
    async getUserListRequest(pageNum: number, pageSize: number) {
      const UserListResult = await getUserList(pageNum, pageSize);
      this.userList = UserListResult.data.msg.users;
      this.userTotal = UserListResult.data.msg.total;
      this.userPageNum = pageNum;
      this.userPageSize = pageSize;
      return UserListResult;
    },

    // 添加新用户
    async addUserRequest(userInfo: any) {
      const addUserResult = await addUser(userInfo);
      return addUserResult;
    },

    // 删除用户
    async delUserRequest(userId: number) {
      const delUserResult = await delUser(userId);
      return delUserResult;
    },

    // 编辑用户
    async updateUserRequest(userInfo: any) {
      const updateUserResult = await updateUser(userInfo);
      return updateUserResult;
    },

    async accountLoginAction(payload: any) {
      // 1. 实现登陆逻辑
      const loginResult = await accountLoginRequest(payload);

      if (loginResult.data.code === 200) {
        localCache.setCache("token", loginResult.data.token);
        return { loginStatus: true, msg: "登陆成功" };
      }
      return { loginStatus: false, msg: loginResult.data.message };
    },
  },
});
