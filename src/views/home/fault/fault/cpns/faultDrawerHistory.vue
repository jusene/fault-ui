<template>
  <div v-loading="isLoading">
    <MyDrawer
      :drawerConfig="drawerHistoryConfig"
      :drawer-visible="drawerVisible"
      @close="handleClose"
    >
      <template #draw-content>
        <MyTimeLine :timelineItems="timeLineData"></MyTimeLine>
      </template>
      <template #footer>
        <el-button @click="drawerVisible = false">取 消</el-button>
      </template>
    </MyDrawer>
  </div>
</template>

<script setup lang="ts">
import { MyTimeLine } from "@/base-ui/timeline";
import { MyDrawer } from "@/base-ui/drawer";
import { ref, defineProps, watch, defineExpose } from "vue";
import { useFaultStore } from "@/store/fault/fault";

const faultStore = useFaultStore();
const isLoading = ref(false);
const drawerHistoryConfig = {
  title: "故障通告历史",
  destroyOnClose: true,
  size: "30%",
  direction: "rtl",
};

const props = defineProps({
  rowData: {
    type: Object,
    required: true,
  },
});

const drawerVisible = ref(false);
defineExpose({ drawerVisible });
const handleClose = () => {
  drawerVisible.value = false;
};

const timeLineData = ref<any[]>([]);

watch(
  () => props.rowData,
  (val) => {
    timeLineData.value = [];
    const faultInfo = {
      id: val.metadata.ID,
    };
    faultStore.getFaultHistoryRequest(faultInfo).then((res) => {
      res.msg.forEach((item: any) => {
        const lineData = {
          id: item.metadata.ID,
          time: item.metadata.CreatedAt,
          reason: item.reason,
          process: item.process,
          processPeople: item.processPeople,
          fllowPeople: item.fllowPeople,
        };
        timeLineData.value.push(lineData);
      });
    });
  }
);
</script>

<style scoped></style>
