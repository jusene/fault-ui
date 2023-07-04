<template>
  <div class="pod-table">
    <MyTable :tableData="tableData" :prop-list="propList">
      <template #labels="scope">
        <el-tag v-for="(value, key) in scope.row.labels" :key="key">
          {{ key + "=" + value }}
        </el-tag>
      </template>
      <template #createTime="scope">
        <span>{{ $filters.formatTime(scope.row.createTime) }}</span>
      </template>
      <template #offline="scope">
        <el-button
          v-if="scope.row.labels.runtime === 'java8'"
          size="small"
          type="danger"
          @click="handleOffline(scope.row)"
          >下线</el-button
        >
      </template>
      <template #restart="scope">
        <el-button size="small" type="warning" @click="handleRestart(scope.row)"
          >重启</el-button
        >
      </template>
      <template #destroy="scope">
        <el-button size="small" type="primary" @click="handleDestroy(scope.row)"
          >销毁{{ scope.row.enable }}</el-button
        >
      </template>
      <!--分页-->
      <template #footer>
        <el-pagination
          style="margin-top: 5px; display: flex; justify-content: center"
          layout="prev, pager, next, jumper"
          :total="podTotal"
          :current-page="page.pageNum"
          :default-page-size="page.pageSize"
          @current-change="handleCurrentChange"
        />
      </template>
    </MyTable>
  </div>
</template>

<script lang="ts" setup>
import { MyTable } from "@/base-ui/table";
import { ref, watch, reactive, computed, defineExpose } from "vue";
import { propList } from "../config/table.config";
import { storeToRefs } from "pinia";
import { useKubeStore } from "@/store";
import type { tableItem } from "../types/type";
import { ElNotification } from "element-plus";
import { RestartPod, OfflinePod, DestroyPod } from "@/services/axios/kube/kube";

const kubeStore = useKubeStore();
const { podList, podTotal } = storeToRefs(kubeStore);
const showData = ref<any>([]);
const page = reactive({
  pageNum: 1,
  pageSize: 10,
});

// 首次数据加载
watch(
  () => podList.value,
  (val) => {
    showData.value = kubeStore.getPodShowList(page.pageNum, page.pageSize);
  }
);

// 分页加载数据
watch(
  () => page.pageNum,
  (val) => {
    showData.value = kubeStore.getPodShowList(page.pageNum, page.pageSize);
  }
);

const tableData = computed(() => {
  const table: Array<tableItem> = [];
  for (const pod of showData.value) {
    const item: tableItem = {
      name: pod.metadata.name,
      labels: pod.metadata.labels,
      cpuStatus:
        pod.spec.containers[0].resources.requests.cpu +
        "/" +
        pod.spec.containers[0].resources.limits.cpu,
      memStatus:
        pod.spec.containers[0].resources.requests.memory +
        "/" +
        pod.spec.containers[0].resources.limits.memory,
      status: pod.status.phase,
      nodeName: pod.spec.nodeName,
      podIp: pod.status.podIP,
      restartTimes: pod.status.containerStatuses[0].restartCount,
      createTime: pod.metadata.creationTimestamp,
    };
    table.push(item);
  }
  return table;
});

const handleCurrentChange = (val: number) => {
  page.pageNum = val;
};

const handleOffline = (row: any) => {
  const podInfo = {
    namespace: "pro",
    name: row.name,
    container: row.labels.app,
  };

  OfflinePod(podInfo)
    .then((res) => {
      if (res.status === 200) {
        ElNotification.success({
          title: "下线通知",
          message: `${row.name}下线成功`,
        });
      }
    })
    .catch((err) => {
      ElNotification.warning({
        title: "下线通知",
        message: err,
      });
    });
};

const handleRestart = (row: any) => {
  const podInfo = {
    namespace: "pro",
    name: row.name,
    container: row.labels.app,
  };

  RestartPod(podInfo)
    .then((res) => {
      if (res.status === 200) {
        ElNotification.success({
          title: "重启通知",
          message: `${row.name}重启成功`,
        });
      }
    })
    .catch((err) => {
      ElNotification.warning({
        title: "重启通知",
        message: err,
      });
    });
};

const handleDestroy = (row: any) => {
  const podInfo = {
    namespace: "pro",
    name: row.name,
  };

  DestroyPod(podInfo)
    .then((res) => {
      if (res.status === 200) {
        ElNotification.success({
          title: "销毁通知",
          message: `${row.name}销毁成功`,
        });
      }
    })
    .catch((err) => {
      ElNotification.warning({
        title: "销毁通知",
        message: err,
      });
    });
};
</script>
