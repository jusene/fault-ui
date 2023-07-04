<template>
  <div class="app">
    <el-config-provider :locale="locale">
      <router-view />
    </el-config-provider>
  </div>
</template>

<script lang="ts" setup>
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { ref } from "vue";

const locale = ref(zhCn);
</script>

<style lang="less" scoped>
.app {
  height: 100%;
  width: 100%;
}
</style>
