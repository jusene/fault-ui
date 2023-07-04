<template>
  <div class="kube-table">
    <MyTable :tableData="tableData" :prop-list="propList">
      <template #labels="scope">
        <el-tag v-for="(value, key) in scope.row.labels" :key="key">
          {{ key + "=" + value }}
        </el-tag>
      </template>
      <template #createTime="scope">
        <span>{{ $filters.formatTime(scope.row.createTime) }}</span>
      </template>
      <template #resource="scope">
        <el-button
          type="primary"
          size="small"
          @click="modifyDeploy(scope.row.name)"
          >编辑</el-button
        >
      </template>
      <template #delete="scope">
        <el-button
          type="danger"
          size="small"
          @click="deleteDeploy(scope.row.name)"
          disabled
          >删除</el-button
        >
      </template>
      <!--分页-->
      <template #footer>
        <el-pagination
          style="margin-top: 5px; display: flex; justify-content: center"
          layout="prev, pager, next, jumper"
          :total="deploymentTotal"
          :current-page="page.pageNum"
          :default-page-size="page.pageSize"
          @current-change="handleCurrentChange"
        />
      </template>
    </MyTable>

    <el-drawer v-model="openDrawer" destroy-on-close>
      <template #header>
        <h4>{{ name }} Deployment详情</h4>
      </template>
      <template #default>
        <MyForm v-bind="modifyFormConfig" v-model="formData">
          <template #footer>
            <el-button type="primary" style="width: 200px" @click="handleUpdate"
              >更新</el-button
            >
          </template>
        </MyForm>
      </template>
    </el-drawer>

    <el-dialog v-model="dialogVisible" title="Warning" width="30%" align-center>
      <span>确定要删除{{ name }} deployment吗?</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleDelete(name)">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from "vue";
import type { tableItem } from "../types/type";
import { MyTable } from "@/base-ui/table";
import { propList } from "../config/table.config";
import { MyForm } from "@/base-ui/form";
import { modifyFormConfig } from "../config/modify.config";
import { storeToRefs } from "pinia";
import { useKubeStore } from "@/store";
import { DestroyDeploy } from "@/services/axios/kube/kube";
import { ElNotification } from "element-plus";

const kubeStore = useKubeStore();
const { deploymentList, deploymentTotal } = storeToRefs(kubeStore);
const showData = ref<any>([]);
const openDrawer = ref(false);
const name = ref();
const dialogVisible = ref(false);
const page = reactive({
  pageNum: 1,
  pageSize: 10,
});

// 首次数据加载
watch(
  () => deploymentList.value,
  (val) => {
    showData.value = kubeStore.getDeploymentShowList(
      page.pageNum,
      page.pageSize
    );
  }
);

// 分页加载数据
watch(
  () => page.pageNum,
  (): void => {
    showData.value = kubeStore.getDeploymentShowList(
      page.pageNum,
      page.pageSize
    );
  }
);

// 解析切片数据到table data
const tableData = computed(() => {
  const table: Array<tableItem> = [];
  for (const deploy of showData.value) {
    const item: tableItem = {
      name: deploy.metadata.name,
      image: deploy.spec.template.spec.containers[0].image,
      labels: deploy.metadata.labels,
      replicas: deploy.status.replicas + "/" + deploy.status.availableReplicas,
      cpuRequest:
        deploy.spec.template.spec.containers[0].resources.requests.cpu,
      cpuLimit: deploy.spec.template.spec.containers[0].resources.limits.cpu,
      memRequest:
        deploy.spec.template.spec.containers[0].resources.requests.memory,
      memLimit: deploy.spec.template.spec.containers[0].resources.limits.memory,
      createTime: deploy.metadata.creationTimestamp,
    };
    table.push(item);
  }
  return table;
});

const handleCurrentChange = (val: number) => {
  page.pageNum = val;
};

const formData = ref({
  replicas: 0,
});

const modifyDeploy = (value: string) => {
  openDrawer.value = true;
  name.value = value;
  for (const row of tableData.value) {
    if (row.name === value) {
      formData.value.replicas = Number(row.replicas.split("/")[0]);
    }
  }
};

const handleUpdate = () => {
  console.log(formData.value, name);
  kubeStore
    .scaleDeployment(name.value.split("-deploy")[0], formData.value.replicas)
    .then((res) => {
      if (res.status === 200) {
        ElNotification.success({
          title: "伸缩容通知",
          message: `伸缩容成功`,
        });
      }
    })
    .catch((err) => {
      ElNotification.warning({
        title: "伸缩容通知",
        message: err,
      });
    });
  openDrawer.value = false;
};

const deleteDeploy = (value: string) => {
  dialogVisible.value = true;
  name.value = value;
};

const handleDelete = (name: string) => {
  dialogVisible.value = false;
  const deployInfo = {
    namespace: "pro",
    name: name.split("-deploy")[0],
  };

  DestroyDeploy(deployInfo)
    .then((res) => {
      if (res.status === 200) {
        ElNotification.success({
          title: "销毁通知",
          message: `${name}销毁成功`,
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

<style lang="less" scoped>
.kube-table {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page {
  margin-top: 10px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
