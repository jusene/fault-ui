<template>
  <div v-loading="isLoading" element-loading-text="拼命请求中...">
    <deployForm
      @refresh-table="handleRefreshTable"
      @search-table="handleSearchTable"
    />
    <div class="content">
      <deployTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import deployTable from "./cpns/deployTable.vue";
import deployForm from "./cpns/deployForm.vue";
import { useKubeStore } from "@/store";
import { ref } from "vue";
import { ISOTimeToLocal, toTimeStamp } from "@/utils/time-utils";
import { storeToRefs } from "pinia";

const kubeStore = useKubeStore();
const isLoading = ref(true);
const { deploymentList, lastDeploymentList } = storeToRefs(kubeStore);
kubeStore.requestDeployment().then((res) => {
  console.log(res);
  isLoading.value = false;
});

const handleRefreshTable = (value: boolean) => {
  if (value) {
    isLoading.value = true;
    kubeStore.requestDeployment().then((res) => {
      isLoading.value = false;
    });
  }
};

let startTime = 0;
let endTime = 0;
let createTime = 0;
const handleSearchTable = (formData: any) => {
  const keys = Object.keys(formData.value);
  const filterKeys = keys.filter((key) => {
    return formData.value[key] != "";
  });
  if (filterKeys.length != 0) {
    isLoading.value = true;
    const filterDeployment = lastDeploymentList.value.filter((item: any) => {
      for (const key of filterKeys) {
        switch (key) {
          case "name":
            if (formData.value[key] === item.metadata.name) {
              return item;
            }
            break;
          case "domain":
            if (formData.value[key] === item.metadata.labels.group) {
              return item;
            }
            break;
          case "time":
            startTime = toTimeStamp(formData.value[key][0]);
            endTime = toTimeStamp(formData.value[key][1]);
            createTime = toTimeStamp(
              ISOTimeToLocal(item.metadata.creationTimestamp)
            );
            if (createTime >= startTime && createTime <= endTime) {
              return item;
            }
            break;
        }
      }
    });
    kubeStore.updateDeploymentList(filterDeployment);
    isLoading.value = false;
  }
};
</script>

<style scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
