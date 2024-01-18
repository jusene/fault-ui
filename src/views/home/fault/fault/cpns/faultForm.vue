<template>
  <div>
    <MyForm v-bind="NewFormConfig" v-model="formData">
      <template #name="scope">
        <el-autocomplete
          v-model="fault"
          style="width: 100%"
          :fetch-suggestions="querySearchFault"
          :trigger-on-focus="false"
          clearable
          :placeholder="scope.placeholder"
          @select="handleSelectFault"
        />
      </template>
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
import { useFaultStore, useImproveStore } from "@/store";
import { storeToRefs } from "pinia";
import { useFormConfig } from "@/hooks/useFormConfig";

const faultStore = useFaultStore();
const improveStore = useImproveStore();
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
    "source",
    "tag",
    "group",
  ]);
});

const fault = ref();
const handleSelectFault = (item: any) => {
  fault.value = item.value;
};
const querySearchFault = (queryString: string, cb: any) => {
  improveStore.GetAllFaultsRequest().then((res) => {
    if (res.code === 200) {
      const results = res.msg.filter((fault: string) => {
        if (fault.toLowerCase().includes(queryString.toLowerCase())) {
          return fault;
        }
      });

      const cbResult = results.map((item: any) => ({
        value: item,
      }));

      cb(cbResult);
    }
  });
};

const handleSearch = () => {
  const data = { ...formData.value };
  data.name = fault.value;
  faultStore.searchFaultRequest(data).then((res) => {
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
  fault.value = "";
  // 刷新数据
  faultStore.getFaultTotalRequest();
  faultPageNum.value = 1;
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
