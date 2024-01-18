<template>
  <div style="display: flex; padding: 5px">
    <el-link
      type="primary"
      href="https://gumingnc.yuque.com/voph0x/db04y1/ife8vf5kid87cf7y"
      target="_blank"
      >使用文档</el-link
    >
  </div>
  <div class="improve-page">
    <improveForm />
  </div>
  <div class="improve-page">
    <improveTable></improveTable>
  </div>
</template>

<script setup lang="ts">
import improveTable from "./cpns/improveTable.vue";
import improveForm from "./cpns/improveForm.vue";
</script>

<style scoped>
.improve-page {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
