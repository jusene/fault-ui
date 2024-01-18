<template>
  <div class="event-table">
    <MyTable :prop-list="propList" :table-data="eventList" v-bind="tableConfig">
      <template #header>
        <div class="event-banner">
          <span>事件列表</span>
        </div>
      </template>
      <template #source="scope">
        <el-button type="primary" link @click="handleDetail(scope.row)"
          >告警源</el-button
        >
      </template>
      <template #response="scope">
        <el-button type="primary" link @click="handleResponse(scope.row)"
          >接手</el-button
        >
      </template>
      <template #finish="scope">
        <el-button type="primary" link @click="handleFinish(scope.row)"
          >完成</el-button
        >
      </template>
      <template #footer>
        <el-pagination
          style="margin-top: 5px; display: flex; justify-content: center"
          layout="prev, pager, next, jumper"
          :total="eventTotal"
          :current-page="eventPageNum"
          :default-page-size="eventPageSize"
          @current-change="handleCurrentChange"
        />
      </template>
    </MyTable>

    <eventSourceDialog
      ref="eventSourceDialogRef"
      :rowData="rowData"
    ></eventSourceDialog>
    <eventResponseDialog
      ref="eventResponseDialogRef"
      :rowData="rowData"
    ></eventResponseDialog>
    <eventFinishDialog
      ref="eventFinishDialogRef"
      :rowData="rowData"
    ></eventFinishDialog>
  </div>
</template>

<script setup lang="ts">
import { MyTable } from "@/base-ui/table";
import { propList } from "../config/prop.config";
import { tableConfig } from "../config/table.config";
import { useEventStore } from "@/store/event/event";
import { storeToRefs } from "pinia";
import { watch, ref } from "vue";

import eventSourceDialog from "./eventSourceDialog.vue";
import eventResponseDialog from "./eventResponseDialog.vue";
import eventFinishDialog from "./eventFinishDialog.vue";

const eventSourceDialogRef = ref<InstanceType<typeof eventSourceDialog>>();
const eventResponseDialogRef = ref<InstanceType<typeof eventResponseDialog>>();
const eventFinishDialogRef = ref<InstanceType<typeof eventFinishDialog>>();

const eventStore = useEventStore();
const rowData = ref({});

// 首次加载数据
const { eventPageSize, eventPageNum, eventTotal, eventList } =
  storeToRefs(eventStore);
eventStore.getEventTotalRequest();
eventStore.getEventRequest(eventPageNum.value, eventPageSize.value);

// 分页加载数据
watch(
  () => eventPageNum.value,
  (val) => {
    eventStore.getEventRequest(eventPageNum.value, eventPageSize.value);
  }
);

const handleCurrentChange = (val: number) => {
  eventPageNum.value = val;
};

const handleDetail = (row: any) => {
  if (eventSourceDialogRef.value) {
    rowData.value = row;
    eventSourceDialogRef.value.dialogVisible = true;
  }
};

const handleResponse = (row: any) => {
  if (eventResponseDialogRef.value) {
    rowData.value = row;
    eventResponseDialogRef.value.dialogVisible = true;
  }
};

const handleFinish = (row: any) => {
  if (eventFinishDialogRef.value) {
    rowData.value = row;
    eventFinishDialogRef.value.dialogVisible = true;
  }
};
</script>

<style scoped>
.event-banner {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-right: 20px;
}
</style>
