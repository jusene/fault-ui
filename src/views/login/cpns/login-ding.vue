<template>
  <div class="ding-login">
    <iframe
      :src="DDLoginUrl"
      width="300px"
      height="300px"
      frameborder="0"
      allowtransparency="true"
      scrolling="no"
    >
    </iframe>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/store";
import { ElMessage } from "element-plus";

const userStore = useUserStore();
const DDLoginUrl = ref("");
const AppId = ref("dingxok0ap08tbqcegmf");

/**
 * @function addListener()
 * @description 添加事件监听
 */
const addListener = () => {
  window.addEventListener("message", handleReceiveTempCode, false);
};

/**
 * @function removeListener()
 * @description 移除监听事件 登陆成功之后 跳转之前主动调用一次
 */
const removeListener = () => {
  window.removeEventListener("message", handleReceiveTempCode);
};

/**
 * @function getQRCode()
 * @description 获取登陆二维码
 */
const getQRCode = () => {
  const t = new Date().getTime();
  const redirect_uri = encodeURIComponent(window.location.origin + "/#/login");
  console.log(redirect_uri);
  const goto = encodeURIComponent(
    "https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=" +
      AppId.value +
      "&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=" +
      redirect_uri
  );
  DDLoginUrl.value = `https://login.dingtalk.com/login/qrcode.htm?goto=${goto}&t=${t}`;
};

/**
 * @function handleReceiveTempCode
 * @description 获取临时登录code
 */
function handleReceiveTempCode(resp: { origin: any; data: any }) {
  console.log(resp);
  const { origin, data: code } = resp;
  // 判断是否是来自ddLogin的扫码事件
  if (origin === "https://login.dingtalk.com") {
    removeListener();
    const redirect_uri = encodeURIComponent(
      window.location.origin + "/#/login"
    );
    window.location.href =
      "https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=" +
      AppId.value +
      "&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=" +
      redirect_uri +
      "&loginTmpCode=" +
      code;
  }
}

onMounted(() => {
  const route = useRoute();
  const router = useRouter();
  const { code } = route.query;
  if (code) {
    router.replace(window.location.origin + "/#/login");
    userStore.dingTalkLoginAction(code).then((res) => {
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
  } else {
    addListener();
    getQRCode();
  }
});
</script>

<style scoped>
.ding-login {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
