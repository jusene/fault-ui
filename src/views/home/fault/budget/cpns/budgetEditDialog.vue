<template>
  <div>
    <MyDialog
      :dialogConfig="dialogConfig"
      :dialogVisible="dialogVisible"
      @close="handleClose"
    >
      <template #dialog-content>
        <MyForm v-bind="editFormConfig" v-model="formData"></MyForm>
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
import { ref, defineExpose, defineProps, watch, withDefaults } from "vue";
import { useBudgetStore } from "@/store";
import { storeToRefs } from "pinia";
import { editFormConfig } from "../config/edit.config";

const budgetStore = useBudgetStore();
const { budgetList } = storeToRefs(budgetStore);
const dialogVisible = ref(false);
const dialogConfig = {
  title: "编辑故障预算周期",
  destroyOnClose: true,
  width: "25%",
  center: true,
};
const props = withDefaults(defineProps<{ rowData: object }>(), {
  rowData: () => ({}),
});

const formData = ref<any>({});
watch(
  () => props.rowData,
  (val) => {
    console.log(val);
    formData.value = val;
  }
);

const handleClose = () => {
  dialogVisible.value = false;
};

defineExpose({ dialogVisible });

const handleSubmit = () => {
  const parentIndex = budgetList.value.findIndex(
    (obj) => obj.name === formData.value.name
  );
  console.log(parentIndex, budgetList.value[parentIndex]);
  const childrenIndex = budgetList.value[parentIndex].children.findIndex(
    (obj: { id: any }) => obj.id === formData.value.id
  );
  const formKeys = Object.keys(formData.value);
  formKeys.forEach((key) => {
    budgetList.value[parentIndex].children[childrenIndex][key] =
      formData.value[key];
  });
  dialogVisible.value = false;
};
</script>
