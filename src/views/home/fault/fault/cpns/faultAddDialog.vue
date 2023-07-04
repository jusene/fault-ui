<template>
  <div v-loading="isLoading">
    <MyDialog
      :dialogConfig="dialogConfig"
      :dialogVisible="dialogVisible"
      @close="handleClose"
    >
      <template #dialog-content>
        <MyForm v-bind="NewFormConfig" v-model="formData">
          <template #mainResponsibility="scope">
            <el-select
              v-model="mainResponsibility"
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
          <template #secondResponsibility="scope">
            <el-select
              v-model="secondResponsibility"
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
import { ref, defineExpose, computed } from "vue";
import { useFaultStore } from "@/store/fault/fault";
import { editFormConfig } from "../config/edit.config";
import { ElMessage, dayjs } from "element-plus";
import { storeToRefs } from "pinia";
import { useFormConfig } from "@/hooks/useFormConfig";
import { useUserStore } from "@/store";
import { requestPerson } from "@/services/axios/fault/fault";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const faultStore = useFaultStore();
const { faultPageNum, faultPageSize } = storeToRefs(faultStore);
const isLoading = ref(false);
const dialogConfig = {
  title: "录入故障",
  destroyOnClose: true,
  width: "40%",
  center: true,
};

const dialogVisible = ref(false);
defineExpose({ dialogVisible });

const handleClose = () => {
  dialogVisible.value = false;
};

const mainResponsibility = ref([]);
const secondResponsibility = ref([]);
const loading = ref(false);
const options = ref<any[]>([]);
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

const formItems = editFormConfig.formItems ?? [];
const formOrigin: any = {};
formItems.forEach((item) => {
  formOrigin[item.field] = "";
});
const formData = ref(formOrigin);

const NewFormConfig = computed(() => {
  const formConfig = useFormConfig(editFormConfig, [
    "domain",
    "domainLevel",
    "tag",
    "status",
    "level",
    "source",
    "group",
  ]);

  const newFilterFormItems = formConfig.formItems.filter((item: any) => {
    return (
      item.field != "processPeople" &&
      item.field != "fllowPeople" &&
      item.field != "sla"
    );
  });
  formConfig.formItems = newFilterFormItems;
  return formConfig;
});

const handleSubmit = () => {
  const data = { ...formData.value };
  data.mainResponsibility = mainResponsibility.value;
  data.secondResponsibility = secondResponsibility.value;
  // 更新故障信息
  faultStore.updateFaultRequest(data).then((res) => {
    if (res.code === 200) {
      ElMessage.success({
        message: "录入成功",
        type: "success",
      });
    }
    dialogVisible.value = false;
    // 更新故障列表
    isLoading.value = true;
    faultStore.getFaultRequest(faultPageNum.value, faultPageSize.value);
    // 重新计算故障总数
    faultStore.getFaultTotalRequest();
    isLoading.value = false;
  });
};
</script>

<style scoped></style>
