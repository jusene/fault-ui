<template>
  <div class="improve-table">
    <MyTable :prop-list="propList" :table-data="actionList">
      <template #header>
        <div class="improve-add">
          <span>故障action</span>
          <div>
            <el-button type="primary" @click="handleAddAction" :icon="Plus"
              >新增action</el-button
            >
          </div>
        </div>
      </template>
      <template #action="scope">
        <el-link
          :href="'http://jira.iguming.net:8080/browse/' + scope.row.jiraKey"
          type="primary"
          target="_blank"
        >
          {{ scope.row.action }}</el-link
        >
      </template>
      <template #dueTime="scope">
        <span>{{ $filters.formatCSTTime(scope.row.dueTime) }}</span>
      </template>
      <template #createTime="scope">
        <span>{{ $filters.formatCSTTime(scope.row.metadata.CreatedAt) }}</span>
      </template>
      <template #footer>
        <el-pagination
          style="margin-top: 5px; display: flex; justify-content: center"
          layout="prev, pager, next, jumper"
          :total="actionTotal"
          :current-page="actionPageNum"
          :default-page-size="actionPageSize"
          @current-change="handleCurrentChange"
        />
      </template>
      <template #edit="scope">
        <el-button type="primary" link @click="handleEdit(scope.row)"
          >编辑</el-button
        >
      </template>
    </MyTable>

    <improveAddDialog ref="improveAddDialogRef"></improveAddDialog>
    <improveEditDialog
      ref="improveEditDialogRef"
      :rowData="rowData"
    ></improveEditDialog>
  </div>
</template>

<script setup lang="ts">
import { MyTable } from "@/base-ui/table";
import { propList } from "../config/prop.config";
import { Plus, QuestionFilled } from "@element-plus/icons-vue";
import { useImproveStore } from "@/store";
import { storeToRefs } from "pinia";
import improveAddDialog from "./improveAddDialog.vue";
import improveEditDialog from "./improveEditDialog.vue";
import { ref, watch } from "vue";

const improveAddDialogRef = ref<InstanceType<typeof improveAddDialog>>();
const improveEditDialogRef = ref<InstanceType<typeof improveEditDialog>>();

const rowData = ref();
// 首次加载数据
const improveStore = useImproveStore();
const { actionPageSize, actionPageNum, actionTotal, actionList } =
  storeToRefs(improveStore);
improveStore
  .getActionRequest(actionPageNum.value, actionPageSize.value)
  .then((res) => {
    console.log(res);
  });

// 分页加载数据
watch(
  () => actionPageNum.value,
  (val) => {
    improveStore.getActionRequest(actionPageNum.value, actionPageSize.value);
  }
);

const handleAddAction = () => {
  if (improveAddDialogRef.value) {
    improveAddDialogRef.value.dialogVisible = true;
  }
};

const handleEdit = (row: any) => {
  if (improveEditDialogRef.value) {
    rowData.value = row;
    improveEditDialogRef.value.dialogVisible = true;
  }
};

const handleCurrentChange = (val: number) => {
  actionPageNum.value = val;
};
</script>

<style scoped>
.improve-add {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-right: 20px;
}
</style>
