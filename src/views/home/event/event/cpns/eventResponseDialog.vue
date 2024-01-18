<template>
  <div>
    <MyDialog
      :dialogConfig="dialogConfig"
      :dialogVisible="dialogVisible"
      @close="handleClose"
    >
      <template #dialog-content>
        <MyForm v-bind="FormConfig" v-model="formData">
          <template #assignUserName="scope">
            <el-select
              v-model="assignUserName"
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
        <el-button type="primary" @click="handleResponse">接手</el-button>
      </template>
    </MyDialog>
  </div>
</template>

<script setup lang="ts">
import { MyDialog } from "@/base-ui/dialog";
import { MyForm } from "@/base-ui/form";
import { ref, defineExpose, defineProps, watch } from "vue";
import { FormConfig } from "../config/response.config";
import { requestPerson } from "@/services/axios/fault/fault";
import { useUserStore } from "@/store";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const loading = ref(false);
const assignUserName = ref<string>();
const options = ref();
const dialogConfig = {
  title: "事件接手",
  destroyOnClose: true,
  width: "40%",
  center: true,
};

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
    const newVal = { ...val };
    assignUserName.value = user.value;
    newVal.assignUserName = assignUserName.value;
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

const dialogVisible = ref(false);
defineExpose({ dialogVisible });

const handleClose = () => {
  dialogVisible.value = false;
};

const handleResponse = () => {
  dialogVisible.value = false;
};
</script>

<style scoped></style>
