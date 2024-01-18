<template>
  <div v-loading="isLoading">
    <MyDialog
      :dialogConfig="dialogConfig"
      :dialogVisible="dialogVisible"
      @close="handleClose"
    >
      <template #dialog-content>
        <MyForm v-bind="FormConfig" v-model="formData">
          <template #creator="scope">
            <el-select
              v-model="creator"
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
        </MyForm>
      </template>
      <template #footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </template>
    </MyDialog>
  </div>
</template>

<script setup lang="ts">
import { MyDialog } from "@/base-ui/dialog";
import { MyForm } from "@/base-ui/form";
import { ref, defineExpose, defineProps, watch } from "vue";
import { FormConfig } from "../config/action.config";
import { useUserStore, useImproveStore } from "@/store";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";
import { requestPerson } from "@/services/axios/fault/fault";

const isLoading = ref(false);
const userStore = useUserStore();
const improveStore = useImproveStore();
const { user } = storeToRefs(userStore);
const { actionPageNum, actionPageSize } = storeToRefs(improveStore);
const fault = ref();
const creator = ref<string[]>([]);
const executor = ref<string[]>([]);
const loading = ref(false);
const options = ref();
const dialogConfig = {
  title: "添加Action",
  destroyOnClose: true,
  width: "40%",
  center: true,
};
const dialogVisible = ref(false);
defineExpose({ dialogVisible });

const handleClose = () => {
  dialogVisible.value = false;
};

const name = ref<string>();
const props = defineProps({
  rowData: {
    type: Object,
    default: () => ({}),
  },
});

const formData = ref({});
watch(
  () => props.rowData,
  (val) => {
    console.log(val.name);
    const newVal = { ...val };
    creator.value[0] = user.value;
    newVal.creator = creator;
    formData.value = newVal;
  }
);

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

const handleSubmit = () => {
  const data: any = { ...formData.value };
  data.creator = creator.value;
  data.executor = executor.value;
  console.log(data);
  improveStore.AddActionRequest(data).then((res) => {
    if (res.code === 200) {
      ElMessage.success({
        message: "添加成功",
        type: "success",
      });
    } else {
      ElMessage.warning(res.error);
    }
    dialogVisible.value = false;
    // // 更新action列表
    // isLoading.value = true;
    // improveStore.getActionRequest(actionPageNum.value, actionPageSize.value);
    // isLoading.value = false;
  });
};

const handleSelect = (item: any) => {
  fault.value = item.value;
};
</script>

<style scoped></style>
