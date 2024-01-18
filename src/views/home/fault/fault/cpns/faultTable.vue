<template>
  <div class="fault-table">
    <MyTable :prop-list="propList" :table-data="faultList" v-bind="tableConfig">
      <template #header>
        <div class="fault-add">
          <span>故障列表</span>
          <div>
            <el-button @click="handleAddFault" :icon="DocumentAdd"
              >补录故障</el-button
            >
            <el-button type="primary" @click="handleReportFault" :icon="Plus"
              >上报故障</el-button
            >
          </div>
        </div>
      </template>
      <template #domain="scope">
        <template v-for="item in domainList(scope.row.domain)" :key="item">
          <el-tag effect="plain">{{ item }}</el-tag>
        </template>
      </template>
      <template #tag="scope">
        <template v-for="item in tagList(scope.row.tag)" :key="item">
          <el-tag>{{ item }}</el-tag>
        </template>
      </template>
      <template #category="scope">
        <template v-for="item in categoryList(scope.row.category)" :key="item">
          <el-tag>{{ item }}</el-tag>
        </template>
      </template>
      <template #createTime="scope">
        <span>{{ $filters.formatCSTTime(scope.row.faultStartAt) }}</span>
      </template>

      <!-- <template #stopTime="scope">
        <span>{{
          $filters.dateTimeDiff(scope.row.faultStopAt, scope.row.faultStartAt)
        }}</span>
      </template> -->

      <template #endTime="scope">
        <span>{{
          $filters.dateTimeDiff(scope.row.faultEndAt, scope.row.faultStartAt)
        }}</span>
      </template>

      <template #title="scope">
        <el-link
          :href="'/#/main/yuque/index?id=' + getYueQueId(scope.row.yuQue)"
          type="primary"
        >
          {{ scope.row.name }}
        </el-link>
        <el-tooltip content="复制" placement="top">
          <el-icon
            style="cursor: pointer"
            @click="copyToClipboard(scope.row.name)"
          >
            <CopyDocument
          /></el-icon>
        </el-tooltip>
      </template>

      <template #edit="scope">
        <el-button type="primary" link @click="handleEdit(scope.row)"
          >编辑</el-button
        >
      </template>
      <template #notice="scope">
        <el-button type="primary" link @click="handleNotice(scope.row)"
          >通告</el-button
        >
      </template>
      <template #history="scope">
        <el-button type="primary" link @click="handleRead(scope.row)"
          >历史</el-button
        >
      </template>
      <template #action="scope">
        <el-button type="primary" link @click="handleAction(scope.row)"
          >action</el-button
        >
      </template>
      <template #footer>
        <el-pagination
          style="margin-top: 5px; display: flex; justify-content: center"
          layout="prev, pager, next, jumper"
          :total="faultTotal"
          :current-page="faultPageNum"
          :default-page-size="faultPageSize"
          @current-change="handleCurrentChange"
        />
      </template>
    </MyTable>

    <faultReportDialog ref="pageReportModalRef"></faultReportDialog>
    <faultAddDialog ref="pageAddModalRef"></faultAddDialog>

    <faultDrawerNotice
      ref="pageDrawerNoticeRef"
      :rowData="rowData"
    ></faultDrawerNotice>

    <faultDrawerEdit
      ref="pageDrawerEditRef"
      :rowData="rowData"
    ></faultDrawerEdit>

    <faultDrawerHistory
      ref="pageDrawerHistoryRef"
      :rowData="rowData"
    ></faultDrawerHistory>

    <faultActionDialog
      ref="pageActionDialogRef"
      :rowData="rowData"
    ></faultActionDialog>
  </div>
</template>

<script setup lang="ts">
import { MyTable } from "@/base-ui/table";
import { propList } from "../config/prop.config";
import { computed, ref, watch } from "vue";
import { useFaultStore } from "@/store/fault/fault";
import { storeToRefs } from "pinia";
import { Plus, DocumentAdd, CopyDocument } from "@element-plus/icons-vue";
import { tableConfig } from "../config/table.config";
import faultReportDialog from "./faultReportDialog.vue";
import faultDrawerNotice from "./faultDrawerNotice.vue";
import faultDrawerEdit from "./faultDrawerEdit.vue";
import faultDrawerHistory from "./faultDrawerHistory.vue";
import faultAddDialog from "./faultAddDialog.vue";
import faultActionDialog from "./faultActionDialog.vue";
import { ElMessage } from "element-plus";

const faultStore = useFaultStore();
const rowData = ref({});
const pageReportModalRef = ref<InstanceType<typeof faultReportDialog>>();
const pageDrawerNoticeRef = ref<InstanceType<typeof faultDrawerNotice>>();
const pageDrawerEditRef = ref<InstanceType<typeof faultDrawerEdit>>();
const pageDrawerHistoryRef = ref<InstanceType<typeof faultDrawerHistory>>();
const pageAddModalRef = ref<InstanceType<typeof faultAddDialog>>();
const pageActionDialogRef = ref<InstanceType<typeof faultActionDialog>>();

// 首次加载数据
const { faultPageSize, faultPageNum, faultTotal, faultList } =
  storeToRefs(faultStore);
faultStore.getFaultTotalRequest();
faultStore.getFaultRequest(faultPageNum.value, faultPageSize.value);

// 分页加载数据
watch(
  () => faultPageNum.value,
  (val) => {
    faultStore.getFaultRequest(faultPageNum.value, faultPageSize.value);
  }
);

const tagList = computed(() => {
  return function (tags: string) {
    if (tags) {
      return tags.split(",");
    }
  };
});

const domainList = computed(() => {
  return function (domains: string) {
    if (domains) {
      return domains.split(",");
    }
  };
});

const categoryList = computed(() => {
  return function (category: string) {
    if (category) {
      return category.split(",");
    }
  };
});

// 唤起上报故障
const handleReportFault = () => {
  if (pageReportModalRef.value) {
    pageReportModalRef.value.dialogVisible = true;
  }
};

// 唤起录入故障
const handleAddFault = () => {
  if (pageAddModalRef.value) {
    pageAddModalRef.value.dialogVisible = true;
  }
};

const handleCurrentChange = (val: number) => {
  faultPageNum.value = val;
};

// 唤起编辑页
const handleEdit = (row: any) => {
  console.log(row);
  if (pageDrawerEditRef.value) {
    rowData.value = row;
    pageDrawerEditRef.value.drawerVisible = true;
  }
};

// 唤起通告页
const handleNotice = (row: any) => {
  if (pageDrawerNoticeRef.value) {
    rowData.value = row;
    pageDrawerNoticeRef.value.drawerVisible = true;
  }
};

const handleRead = (row: any) => {
  if (pageDrawerHistoryRef.value) {
    rowData.value = row;
    pageDrawerHistoryRef.value.drawerVisible = true;
  }
};

const handleAction = (row: any) => {
  console.log(row);
  if (pageActionDialogRef.value) {
    console.log(row);
    rowData.value = row;
    pageActionDialogRef.value.dialogVisible = true;
  }
};

const getYueQueId = computed(() => {
  return function (yuQue: string) {
    return yuQue?.split("/")[5];
  };
});

// 复制到剪切板
const copyToClipboard = (text: string) => {
  // console.log(text);
  // console.log(navigator.clipboard, window.isSecureContext);
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        ElMessage.success("复制成功");
      })
      .catch(() => {
        ElMessage.warning("复制失败");
      });
  } else {
    // text area method
    let textArea = document.createElement("textarea");
    textArea.value = text;
    // make the textarea out of viewport
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    new Promise<void>((res, rej) => {
      // here the magic happens
      document.execCommand("copy") ? res() : rej();
      textArea.remove();
    })
      .then(() => {
        ElMessage.success("复制成功");
      })
      .catch(() => {
        ElMessage.warning("复制失败");
      });
  }
};
</script>

<style scoped lang="less">
.fault-add {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-right: 20px;
}
</style>
