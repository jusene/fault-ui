<template>
  <div v-loading="isLoading">
    <MyDialog
      :dialogConfig="dialogConfig"
      :dialogVisible="dialogVisible"
      @close="handleClose"
    >
      <template #dialog-content>
        <MyForm v-bind="NewFormConfig" v-model="formData">
          <template #prepend-content>{{ nowDate }}</template>
          <template #processPeople="scope">
            <el-select
              v-model="processPeople"
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
          <template #fllowPeople="scope">
            <el-select
              v-model="fllowPeople"
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
import { FormConfig } from "../config/form.config";
import { ElMessage, dayjs } from "element-plus";
import { storeToRefs } from "pinia";
import { useFormConfig } from "@/hooks/useFormConfig";
import { useUserStore } from "@/store";
import httpRequest from "@/services/axios";
import { requestPerson } from "@/services/axios/fault/fault";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const faultStore = useFaultStore();
const { faultPageNum, faultPageSize } = storeToRefs(faultStore);
const isLoading = ref(false);
const nowDate = dayjs().format("YYYY-MM-DD");
const dialogConfig = {
  title: "上报故障",
  destroyOnClose: true,
  width: "40%",
  center: true,
};

const dialogVisible = ref(false);
defineExpose({ dialogVisible });

const loading = ref(false);
const fllowPeople = ref<string[]>([]);
const processPeople = ref<string[]>([]);
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

const handleClose = () => {
  dialogVisible.value = false;
};

const formItems = FormConfig.formItems ?? [];
const formOrigin: any = {};
formItems.forEach((item) => {
  if (item.field === "fllowPeople") {
    formOrigin[item.field] = fllowPeople.value.push(user.value);
  } else if (item.field === "faultStartAt") {
    formOrigin[item.field] = dayjs().format("YYYY-MM-DD HH:mm:ss");
  } else {
    formOrigin[item.field] = "";
  }
});
const formData = ref(formOrigin);

const NewFormConfig = computed(() => {
  return useFormConfig(FormConfig, ["domain"]);
});

const handleSubmit = () => {
  const data = { ...formData.value };
  data.name = nowDate + data.name;
  data.fllowPeople = fllowPeople.value;
  data.processPeople = processPeople.value;
  data.faultStartAt = dayjs().utc().format("YYYY-MM-DD HH:mm:ss");
  faultStore.reportFaultrRequest(data).then((res) => {
    if (res.code === 200) {
      ElMessage.success({
        message: "故障上报成功",
        type: "success",
      });
      dialogVisible.value = false;
    }
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
