<template>
  <div>
    <MyForm v-bind="searchFormConfig" v-model="formData">
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
import { ref } from "vue";
import { ElButton } from "element-plus";
import { Search, Refresh } from "@element-plus/icons-vue";
import { useEventStore } from "@/store";
import { storeToRefs } from "pinia";

const eventStore = useEventStore();
const { eventPageSize, eventPageNum, eventList, eventTotal } =
  storeToRefs(eventStore);
const formItems = searchFormConfig.formItems ?? [];
const formOrigin: any = {};
formItems.forEach((item) => {
  if (
    item.field === "assignTime" ||
    item.field === "responseTime" ||
    item.field === "finishTime"
  ) {
    formOrigin[item.field] = [];
  } else {
    formOrigin[item.field] = "";
  }
});
const formData = ref(formOrigin);

const handleSearch = () => {
  const data = { ...formData.value };
  console.log(data);
  eventStore.searchEventRequest(eventPageNum.value, eventPageSize.value, data);
};

const handleReset = (value: any) => {
  const keys = Object.keys(value);
  for (const key of keys) {
    if (
      key === "assignTime" ||
      key === "responseTime" ||
      key === "finishTime"
    ) {
      value[key] = [];
    } else {
      value[key] = "";
    }
  }
  // 刷新数据
  eventStore.getEventTotalRequest();
  eventPageNum.value = 1;
  eventStore.getEventRequest(eventPageNum.value, eventPageSize.value);
};
</script>

<style scoped lang="less">
.action-row {
  display: flex;
  justify-content: flex-end;
  padding: 5px 20px;
}
</style>
