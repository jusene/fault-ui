<template>
  <div v-loading="isLoading" element-loading-text="拼命请求中...">
    <div class="search-pane">
      <podForm @search="handleSearch"></podForm>
    </div>
    <div class="content">
      <podTable ref="pd" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useKubeStore } from "@/store";
import { ref } from "vue";
import podTable from "./cpns/podTable.vue";
import podForm from "./cpns/podForm.vue";

const kubeStore = useKubeStore();
const isLoading = ref(true);
kubeStore.requestPod().then((res) => {
  isLoading.value = false;
});

const handleSearch = (app: any) => {
  isLoading.value = true;
  kubeStore.requestAppPod(app).then((res) => {
    isLoading.value = false;
  });
};
</script>

<style scoped>
.content {
  padding: 20px;
}
</style>
