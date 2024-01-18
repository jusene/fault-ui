<template>
  <div>
    <MyDialog
      :dialogConfig="dialogConfig"
      :dialogVisible="dialogVisible"
      @close="handleClose"
    >
      <template #dialog-content>
        <MyForm v-bind="FormConfig" v-model="formData"></MyForm>
      </template>

      <template #footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleFinish">完成</el-button>
      </template>
    </MyDialog>
  </div>
</template>

<script setup lang="ts">
import { MyDialog } from "@/base-ui/dialog";
import { MyForm } from "@/base-ui/form";
import { ref, defineExpose, watch, defineProps } from "vue";
import { FormConfig } from "../config/finish.config";

const dialogConfig = {
  title: "事件完成",
  destroyOnClose: true,
  width: "40%",
  center: true,
};
const dialogVisible = ref(false);
defineExpose({ dialogVisible });

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
    formData.value = newVal;
  }
);

const handleClose = () => {
  dialogVisible.value = false;
};

const handleFinish = () => {
  dialogVisible.value = false;
};
</script>

<style scoped></style>
