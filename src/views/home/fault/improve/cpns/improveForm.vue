<template>
  <div>
    <MyForm v-bind="searchFormConfig" v-model="formData">
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
      <template #action="scope">
        <el-autocomplete
          v-model="action"
          style="width: 100%"
          :fetch-suggestions="querySearchAction"
          :trigger-on-focus="false"
          clearable
          :placeholder="scope.placeholder"
          @select="handleSelectAction"
        />
      </template>
      <template #executor="scope">
        <el-select
          v-model="executor"
          multiple
          filterable
          remote
          reserve-keyword
          style="width: 100%"
          :placeholder="scope.placeholder"
          :remote-method="queryPerson"
          :loading="loading"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.title"
            :value="item.value"
          />
        </el-select>
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
import { useImproveStore } from "@/store";
import { requestPerson } from "@/services/axios/fault/fault";
import { storeToRefs } from "pinia";
import { da } from "element-plus/es/locale";

const improveStore = useImproveStore();
const { actionPageNum, actionPageSize, actionList, actionTotal } =
  storeToRefs(improveStore);
// 选择故障
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

// 选择action
const action = ref();
const handleSelectAction = (item: any) => {
  action.value = item.value;
};
const querySearchAction = (queryString: string, cb: any) => {
  improveStore.getAllActiosNameRequest().then((res) => {
    if (res.code === 200) {
      const results = res.msg.filter((action: string) => {
        if (action.toLowerCase().includes(queryString.toLowerCase())) {
          return action;
        }
      });

      const cbResult = results.map((item: any) => ({
        value: item,
      }));

      cb(cbResult);
    }
  });
};

// 选择执行者
const executor = ref<string[]>([]);
const loading = ref(false);
const options = ref();
const queryPerson = async (query: string) => {
  if (query) {
    loading.value = true;
    await requestPerson().then((res) => {
      const listItems = res.data.msg.map((item: { title: any; value: any }) => {
        return { title: item, value: item };
      });
      options.value = listItems.filter((item: { title: string }) => {
        return item.title.toLowerCase().includes(query.toLowerCase());
      });
      loading.value = false;
    });
  }
};

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

const handleSearch = () => {
  const data = { ...formData.value };
  data.name = fault.value;
  data.action = action.value;
  data.executor = executor.value;
  improveStore.searchActionRequest(data).then((res) => {
    if (res.code === 200) {
      actionList.value = res.msg ?? [];
      actionTotal.value = res.msg.length;
    }
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
  action.value = "";
  executor.value = [];

  improveStore.getActionRequest(actionPageNum.value, actionPageSize.value);
};
</script>

<style scoped>
.action-row {
  display: flex;
  justify-content: flex-end;
  padding: 5px 20px;
}
</style>
