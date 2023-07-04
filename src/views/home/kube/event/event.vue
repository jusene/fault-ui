<template>
  <div v-loading="isLoading" element-loading-text="拼命请求中...">
    <div class="content">
      <eventForm @search="handleSearch" />
      <eventTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import eventTable from "./cpns/eventTable.vue";
import eventForm from "./cpns/eventForm.vue";
import { ref } from "vue";

const isLoading = ref(false);
const handleSearch = (val: boolean) => {
  isLoading.value = val;
};
</script>

<style scoped>
.content {
  padding: 20px;
}
</style>
