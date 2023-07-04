<template>
  <div v-loading="isLoading">
    <MyDialog
      :dialogConfig="dialogConfig"
      :dialogVisible="dialogVisible"
      @close="handleClose"
    >
      <template #dialog-content>
        <MyForm v-bind="FormConfig" v-model="formData" />
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
import { useUserStore } from "@/store";
import { FormConfig } from "../config/form.config";
import { ElMessage } from "element-plus";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { userPageNum, userPageSize } = storeToRefs(userStore);
const isLoading = ref(false);
const dialogConfig = {
  title: "添加用户",
  destroyOnClose: true,
  width: "30%",
  center: true,
};

const dialogVisible = ref(false);
defineExpose({ dialogVisible });

const handleClose = () => {
  dialogVisible.value = false;
};

const formItems = FormConfig.formItems ?? [];
const formOrigin: any = {};
formItems.forEach((item) => {
  formOrigin[item.field] = "";
});
const formData = ref(formOrigin);

const handleSubmit = () => {
  userStore.addUserRequest(formData.value).then((res) => {
    if (res.data.code === 200) {
      ElMessage.success({
        message: "用户添加成功",
        type: "success",
      });
      dialogVisible.value = false;
    }
    // 更新用户列表
    isLoading.value = true;
    userStore.getUserListRequest(userPageNum.value, userPageSize.value);
    isLoading.value = false;
  });
};
</script>

<style scoped></style>
