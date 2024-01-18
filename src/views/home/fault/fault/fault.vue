<template>
  <div>
    <div style="display: flex; padding: 5px">
      <el-link
        type="primary"
        href="https://gumingnc.yuque.com/voph0x/db04y1/ife8vf5kid87cf7y"
        target="_blank"
        >使用文档</el-link
      >
    </div>
    <div class="fault-page">
      <faultForm />
    </div>
    <div class="fault-page">
      <faultTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import faultTable from "./cpns/faultTable.vue";
import faultForm from "./cpns/faultForm.vue";
</script>

<style scoped lang="less">
.fault-page {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
