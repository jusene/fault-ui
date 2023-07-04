<template>
  <div v-loading="isLoading">
    <MyDialog
      :dialogConfig="dialogConfig"
      :dialogVisible="dialogVisible"
      @close="handleClose"
    >
      <template #dialog-content>
        <span>确定删除用户{{ username }}?</span>
      </template>
      <template #footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </MyDialog>
  </div>
</template>

<script setup lang="ts">
import { MyDialog } from "@/base-ui/dialog";
import { ref, defineExpose, defineProps, watch } from "vue";
import { useUserStore } from "@/store";
import { ElMessage } from "element-plus";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { userPageNum, userPageSize } = storeToRefs(userStore);
const isLoading = ref(false);
const username = ref<string>();
const dialogConfig = {
  title: "删除用户",
  destroyOnClose: true,
  width: "30%",
  center: true,
};
const dialogVisible = ref(false);
defineExpose({ dialogVisible });

const props = defineProps<{ rowData: any }>();

watch(
  () => props.rowData,
  (val: { username: string | undefined }) => {
    username.value = val.username;
  }
);

const handleClose = () => {
  dialogVisible.value = false;
};

const handleSubmit = () => {
  userStore.delUserRequest(props.rowData.metadata.ID).then((res) => {
    if (res.data.code === 200) {
      ElMessage.success({
        message: "用户删除成功",
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
