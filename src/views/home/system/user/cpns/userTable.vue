<template>
  <div class="user-table">
    <MyTable :table-data="userList" :prop-list="propList">
      <template #header>
        <div class="user-add">
          <span>用户列表</span>
          <div>
            <el-button type="primary" @click="handleAddUser" :icon="Plus"
              >添加用户</el-button
            >
          </div>
        </div>
      </template>
      <template #createTime="scope">
        <span>{{ $filters.formatCSTTime(scope.row.metadata.CreatedAt) }}</span>
      </template>
      <template #updateTime="scope">
        <span>{{ $filters.formatCSTTime(scope.row.metadata.UpdatedAt) }}</span>
      </template>
      <template #edit="scope">
        <el-button link type="primary" @click="handleEditUser(scope.row)"
          >编辑</el-button
        >
      </template>
      <template #delete="scope">
        <el-button link type="danger" @click="handleDelUser(scope.row)"
          >删除</el-button
        >
      </template>
      <template #footer>
        <el-pagination
          style="margin-top: 5px; display: flex; justify-content: center"
          layout="prev, pager, next, jumper"
          :total="userTotal"
          :current-page="userPageNum"
          :default-page-size="userPageSize"
          @current-change="handleCurrentChange"
        />
      </template>
    </MyTable>

    <userAddUserDialog ref="pageAddUserModalRef"></userAddUserDialog>
    <userDelUserDialog
      ref="pageDelUserModalRef"
      :row-data="rowData"
    ></userDelUserDialog>
    <userEditUserDialog
      ref="pageEditUserModalRef"
      :row-data="rowData"
    ></userEditUserDialog>
  </div>
</template>

<script setup lang="ts">
import { MyTable } from "@/base-ui/table";
import { propList } from "../config/table.config";
import { ref, watch } from "vue";
import { useUserStore } from "@/store";
import { storeToRefs } from "pinia";
import { Plus } from "@element-plus/icons-vue";
import userAddUserDialog from "./userAddUserDialog.vue";
import userDelUserDialog from "./userDelUserDialog.vue";
import userEditUserDialog from "./userEditUserDialog.vue";

const pageAddUserModalRef = ref<InstanceType<typeof userAddUserDialog>>();
const pageDelUserModalRef = ref<InstanceType<typeof userDelUserDialog>>();
const pageEditUserModalRef = ref<InstanceType<typeof userEditUserDialog>>();
const userStore = useUserStore();
const rowData = ref();
const { userList, userTotal, userPageNum, userPageSize } =
  storeToRefs(userStore);
// 首次加载数据
userStore.getUserListRequest(userPageNum.value, userPageSize.value);

// 分页加载数据
watch(
  () => userPageNum,
  (val) => {
    userStore.getUserListRequest(userPageNum.value, userPageSize.value);
  }
);

const handleCurrentChange = (val: number) => {
  userPageNum.value = val;
};

const handleAddUser = () => {
  if (pageAddUserModalRef.value) {
    pageAddUserModalRef.value.dialogVisible = true;
  }
};

const handleDelUser = (row: any) => {
  rowData.value = row;
  if (pageDelUserModalRef.value) {
    pageDelUserModalRef.value.dialogVisible = true;
  }
};

const handleEditUser = (row: any) => {
  rowData.value = row;
  if (pageEditUserModalRef.value) {
    pageEditUserModalRef.value.dialogVisible = true;
  }
};
</script>

<style scoped lang="less">
.user-add {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
