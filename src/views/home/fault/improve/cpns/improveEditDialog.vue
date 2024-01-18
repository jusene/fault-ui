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

<script lang="ts" setup>
import { MyDialog } from "@/base-ui/dialog";
import { MyForm } from "@/base-ui/form";
import { ref, defineExpose, computed, defineProps, watch } from "vue";
import { requestPerson } from "@/services/axios/fault/fault";
import { useImproveStore } from "@/store";
import { storeToRefs } from "pinia";
import { FormConfig } from "../config/edit.config";
import { da } from "element-plus/es/locale";
import { ElMessage } from "element-plus";

const isLoading = ref(false);
const loading = ref(false);
const creator = ref<string[]>([]);
const executor = ref<string[]>([]);
const options = ref();
const improveStore = useImproveStore();
const { actionPageNum, actionPageSize } = storeToRefs(improveStore);
const dialogVisible = ref(false);

const dialogConfig = {
  title: "编辑Action",
  destroyOnClose: true,
  width: "40%",
  center: true,
};

const handleClose = () => {
  dialogVisible.value = false;
};

const props = defineProps({
  rowData: {
    type: Object,
    default: () => ({}),
  },
});

defineExpose({ dialogVisible });

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

const formData = ref();
watch(
  () => props.rowData,
  (val) => {
    const data = { ...val };
    const executorArray = data.executor?.split(",");
    const creatorArray = data.creator?.split(",");
    creator.value = creatorArray;
    executor.value = executorArray;
    formData.value = data;
  }
);

const handleSubmit = () => {
  const data = { ...formData.value };
  data.creator = creator.value;
  data.executor = executor.value;
  improveStore.updateActionRequest(data).then((res) => {
    if (res.code === 200) {
      ElMessage.success("更新成功");
    } else {
      ElMessage.warning(res.error);
    }

    dialogVisible.value = false;
    // 更新action列表
    isLoading.value = true;
    improveStore.getActionRequest(actionPageNum.value, actionPageSize.value);
    isLoading.value = false;
  });
};
</script>

<style scoped></style>
