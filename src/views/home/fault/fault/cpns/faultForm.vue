<template>
  <div>
    <MyForm v-bind="NewFormConfig" v-model="formData">
      <template #footer>
        <div class="action-row">
          <el-button :icon="Refresh" @click="handleReset(formData)"
            >重置</el-button
          >
          <el-button type="primary" :icon="Search" @click="handleSearch"
            >搜索</el-button
          >
        </div>
      </template>
    </MyForm>
  </div>
</template>

<script setup lang="ts">
import { MyForm } from "@/base-ui/form";
import { searchFormConfig } from "../config/search.config";
import { computed, ref } from "vue";
import { ElButton } from "element-plus";
import { Search, Refresh } from "@element-plus/icons-vue";
import { useFaultStore } from "@/store/fault/fault";
import { storeToRefs } from "pinia";
import { useFormConfig } from "@/hooks/useFormConfig";

const faultStore = useFaultStore();
const { faultPageSize, faultPageNum, faultList, faultTotal } =
  storeToRefs(faultStore);
const formItems = searchFormConfig.formItems ?? [];
const formOrigin: any = {};
formItems.forEach((item) => {
  if (item.field === "time") {
    formOrigin[item.field] = [];
  } else {
    formOrigin[item.field] = "";
  }
});
const formData = ref(formOrigin);

const NewFormConfig = computed(() => {
  return useFormConfig(searchFormConfig, [
    "domain",
    "level",
    "domainLevel",
    "status",
  ]);
});

const handleSearch = () => {
  faultStore.searchFaultRequest(formData.value).then((res) => {
    faultList.value = res.msg;
    faultTotal.value = res.msg.length ?? 0;
  });
};

const handleReset = (value: any) => {
  const keys = Object.keys(value);
  for (const key of keys) {
    if (key === "time") {
      value[key] = [];
    } else {
      value[key] = "";
    }
  }
  // 刷新数据
  faultStore.getFaultTotalRequest();
  faultStore.getFaultRequest(faultPageNum.value, faultPageSize.value);
};
</script>

<style scoped lang="less">
.action-row {
  display: flex;
  justify-content: flex-end;
  padding: 5px 20px;
}
</style>
