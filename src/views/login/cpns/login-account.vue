<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" type="password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, defineExpose } from "vue";
import { FormInstance, ElMessage } from "element-plus";
import { rules } from "../config/account-config";
import localCache from "@/utils/cache";
import { useUserStore } from "@/store/index";
import router from "@/router";
const account = reactive({
  name: localCache.getCache("name") ?? "",
  password: localCache.getCache("password") ?? "",
});

const userStore = useUserStore();
const formRef = ref<FormInstance>();

const loginAction = (isKeepPassword: boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      if (isKeepPassword) {
        // 本地缓存
        localCache.setCache("name", account.name);
        localCache.setCache("password", account.password);
      } else {
        localCache.deleteCache("name");
        localCache.deleteCache("password");
      }

      // 执行登陆操作
      userStore.accountLoginAction(account).then((res) => {
        if (res.loginStatus) {
          ElMessage.success({
            message: res.msg,
            type: "success",
          });
          router.push("/main");
        } else {
          ElMessage.warning({
            message: res.msg,
          });
        }
      });
    }
  });
};

defineExpose({
  loginAction,
});
</script>

<style scoped></style>
