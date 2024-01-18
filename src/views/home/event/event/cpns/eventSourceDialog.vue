<template>
  <div>
    <MyDialog
      :dialogConfig="dialogConfig"
      :dialogVisible="dialogVisible"
      @close="handleClose"
    >
      <template #dialog-content>
        <div>
          <pre>{{ jsonParse(rowData.sourceAlert) }}</pre>
        </div>
      </template>
      <template #footer>
        <el-button @click="dialogVisible = false" type="danger">关闭</el-button>
      </template>
    </MyDialog>
  </div>
</template>

<script setup lang="ts">
import { MyDialog } from "@/base-ui/dialog";
import { ref, defineExpose, defineProps } from "vue";

const dialogConfig = {
  title: "事件告警源",
  destroyOnClose: true,
  width: "50%",
  center: true,
};

const dialogVisible = ref(false);
defineExpose({ dialogVisible });

const handleClose = () => {
  dialogVisible.value = false;
};

const props = defineProps({
  rowData: {
    type: Object,
    default: () => ({}),
  },
});

const jsonParse = (str: string) => {
  if (str) {
    const jsonData = JSON.parse(str);
    if (jsonData.data[0].eventJson) {
      jsonData.data.forEach((element: { eventJson: any }, index: any) => {
        jsonData.data[index].eventJson = JSON.parse(element.eventJson);
      });
    }
    return jsonData.data;
  }
};
</script>

<style scoped>
pre {
  white-space: pre-wrap;
  word-break: break-all;
  word-wrap: break-word;
  overflow: auto;
  max-height: 500px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
}
</style>
