<template>
  <div>
    <MyDialog
      :dialogConfig="dialogConfig"
      :dialogVisible="dialogVisible"
      @close="handleClose"
    >
      <template #dialog-content>
        <el-select style="width: 100%" v-model="budget">
          <template #prefix> {{ year }} </template>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.title"
            :value="item.value"
          />
        </el-select>
      </template>
      <template #footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </template>
    </MyDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, defineExpose, defineEmits } from "vue";
import { MyDialog } from "@/base-ui/dialog";
import { dayjs, ElMessage } from "element-plus";
import { useBudgetStore } from "@/store";
import { storeToRefs } from "pinia";

const budgetStore = useBudgetStore();
const { budgetList } = storeToRefs(budgetStore);
const dialogVisible = ref(false);
const year = dayjs().year() + "年";
const budget = ref();
const options = [
  {
    title: "H1",
    value: "H1",
  },
  {
    title: "H2",
    value: "H2",
  },
];
defineExpose({ dialogVisible });
const dialogConfig = {
  title: "新增故障预算周期",
  destroyOnClose: true,
  width: "20%",
  center: true,
};
const handleClose = () => {
  dialogVisible.value = false;
};

const handleSubmit = () => {
  const newBudget = year + budget.value;
  let parent: any = {};
  const children: any = [];

  budgetStore.getBudgetRequest(newBudget).then((res) => {
    if (res.data.code === 200) {
      res.data.msg.forEach((item: any) => {
        if (item.name === newBudget) {
          ElMessage.error("故障周期已经存在");
          throw "故障周期已经存在";
        }
      });
      const maxId = res.data.msg.length;
      parent = {
        id: maxId + 1,
        name: newBudget,
        init: true,
      };

      budgetStore.getBudgetDomainListRequest().then((res) => {
        if (res.data.code === 200) {
          res.data.msg.forEach((item: any, index: number) => {
            const childrenItem = {
              id: parent.id * 10 + (index + 1),
              init: true,
              name: parent.name,
              domain: item.name,
              P0: 0,
              P1: 0,
              P2: 0,
              P3: 0,
              P4: 0,
            };
            children.push(childrenItem);
          });
        }
        parent.children = children;
        budgetList.value.unshift(parent);
        dialogVisible.value = false;
      });
    }
  });
};
</script>

<style scoped lang="less"></style>
