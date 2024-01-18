<template>
  <div class="login-panel">
    <div class="banner">
      <img
        src="https://gumingnc.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-black.e685cbb2.png&w=384&q=75"
        alt=""
        style="height: 45px; margin-right: 10px"
      />
      <h1 class="title">稳定性平台</h1>
    </div>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <!-- <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账号登录</span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane> -->
      <el-tab-pane name="ding">
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 钉钉登录</span>
        </template>
        <login-ding ref="dingRef" />
      </el-tab-pane>
    </el-tabs>

    <div v-if="currentTab === 'account'">
      <div class="account-control">
        <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
        <el-link type="primary">忘记密码</el-link>
      </div>

      <el-button type="primary" class="login-btn" @click="handleLoginClick"
        >立即登录</el-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import LoginAccount from "./login-account.vue";
import LoginDing from "./login-ding.vue";

const isKeepPassword = ref(true);
const accountRef = ref<InstanceType<typeof LoginAccount>>();
const dingRef = ref<InstanceType<typeof LoginDing>>();
const currentTab = ref<string>("ding");

const handleLoginClick = () => {
  if (currentTab.value === "account") {
    accountRef.value?.loginAction(isKeepPassword.value);
  }
};
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 320px;
  .banner {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .title {
    text-align: center;
  }

  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
