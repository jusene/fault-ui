<template>
  <div class="fault-budget">
    <MyTable
      :table-data="budgetList"
      :prop-list="propList"
      v-bind="tableConfig"
    >
      <template #header>
        <div class="page-add">
          <span>故障预算</span>
          <div>
            <el-button type="primary" @click="handleAdd">新增</el-button>
            <el-button type="success" @click="handleSave">保存</el-button>
            <el-button>刷新</el-button>
          </div>
        </div>
      </template>
      <!-- <template #add="scope">
        <el-button
          link
          type="primary"
          v-if="!scope.row.domain"
          @click="handleAddItem(scope.row)"
          >增加</el-button
        >
      </template> -->
      <template #edit="scope">
        <el-button
          link
          type="primary"
          v-if="scope.row.domain"
          @click="handleEdit(scope.row)"
          >编辑</el-button
        >
      </template>
      <!-- <template #del="scope">
        <el-button
          link
          type="primary"
          v-if="scope.row?.init"
          @click="handleDel(scope.row)"
          >删除</el-button
        >
      </template> -->
    </MyTable>

    <budgeAddDialog ref="budgeAddDialogRef"></budgeAddDialog>

    <budgetEditDialog
      ref="budgetEditDialogRef"
      :row-data="rowData"
    ></budgetEditDialog>
  </div>
</template>

<script setup lang="ts">
import { MyTable } from "@/base-ui/table";
import { propList } from "../config/budge.config";
import { tableConfig } from "../config/table.config";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useBudgetStore } from "@/store";
import budgeAddDialog from "./budgeAddDialog.vue";
import budgetEditDialog from "./budgetEditDialog.vue";
import { ElMessage } from "element-plus";

const budgetStore = useBudgetStore();
const { budgetList } = storeToRefs(budgetStore);
const budgeAddDialogRef = ref<InstanceType<typeof budgeAddDialog>>();
const budgetEditDialogRef = ref<InstanceType<typeof budgetEditDialog>>();
const handleAdd = () => {
  if (budgeAddDialogRef.value) {
    budgeAddDialogRef.value.dialogVisible = true;
  }
};

// 记载保存在数据库的数据
budgetStore.getBudgetAllRequest();

const handleDel = (row: any) => {
  console.log(row);
  if (row?.children) {
    const index = budgetList.value.findIndex((obj) => obj.id === row.id);
    budgetList.value.splice(index, 1);
  } else {
    const parentIndex = budgetList.value.findIndex(
      (obj) => obj.name === row.name
    );
    const childrenIndex = budgetList.value[parentIndex].children.findIndex(
      (obj: { id: any }) => obj.id === row.id
    );
    budgetList.value[parentIndex].children.splice(childrenIndex, 1);
  }
};

const handleAddItem = (row: any) => {
  budgetList.value.forEach((item) => {
    if (item.id === row.id) {
      item.children.push({
        id: item.id * 10 + item.children.length + 1,
        name: item.name,
        domain: "未命名",
        init: true,
        P0: 0,
        P1: 0,
        P2: 0,
        P3: 0,
        P4: 0,
      });
    }
  });
};

const rowData = ref();
const handleEdit = (row: any) => {
  rowData.value = row;
  if (budgetEditDialogRef.value) {
    budgetEditDialogRef.value.dialogVisible = true;
  }
};

const handleSave = () => {
  console.log(budgetList.value);
  budgetStore.updateBudgetRequest(budgetList.value).then((res) => {
    if (res.data.code === 200) {
      ElMessage.success("保存成功");
    } else {
      ElMessage.error(res.data.error);
    }
  });
};
</script>

<style scoped lang="less">
.page-add {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}
</style>
