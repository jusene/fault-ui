<template>
  <div class="login">
    <loginPanel />
    <p class="banner">{{ banner }}</p>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import loginPanel from "./cpns/login-panel.vue";
import { ref } from "vue";

const banner = ref("Copyright © 2023 - " + dayjs().year() + " GOODME SRE");
</script>

<style scoped lang="less">
.login {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: url("@/assets/img/login-bg.svg");
  .banner {
    position: fixed;
    bottom: 5px;
  }
}
</style>
