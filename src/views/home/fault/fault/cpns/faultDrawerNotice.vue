<template>
  <div v-loading="isLoading">
    <MyDrawer
      :drawerConfig="drawerNoticeConfig"
      :drawer-visible="drawerVisible"
      @close="handleClose"
    >
      <template #draw-content>
        <MyForm v-bind="NewFormConfig" v-model="noticeFormData">
          <template #processPeople="scope">
            <el-select
              v-model="processPeople"
              multiple
              filterable
              remote
              reserve-keyword
              style="width: 100%"
              :placeholder="scope.placeholder"
              :remote-method="queryPerson"
              :loading="loading"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.title"
                :value="item.value"
              />
            </el-select>
          </template>
          <template #fllowPeople="scope">
            <el-select
              v-model="fllowPeople"
              multiple
              filterable
              remote
              reserve-keyword
              style="width: 100%"
              :placeholder="scope.placeholder"
              :remote-method="queryPerson"
              :loading="loading"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.title"
                :value="item.value"
              />
            </el-select>
          </template>
        </MyForm>
      </template>
      <template #footer>
        <el-button @click="drawerVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleNoticeAction">通告</el-button>
      </template>
    </MyDrawer>
  </div>
</template>

<script setup lang="ts">
import { noticeFormConfig } from "../config/notice.config";
import { MyForm } from "@/base-ui/form";
import { MyDrawer } from "@/base-ui/drawer";
import { ref, defineProps, watch, defineExpose, computed } from "vue";
import { useFaultStore } from "@/store/fault/fault";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";
import { useFormConfig } from "@/hooks/useFormConfig";
import httpRequest from "@/services/axios";
import { requestPerson } from "@/services/axios/fault/fault";

const faultStore = useFaultStore();
const { faultPageNum, faultPageSize } = storeToRefs(faultStore);
const isLoading = ref(false);
const drawerNoticeConfig = {
  title: "故障通告",
  destroyOnClose: true,
  size: "30%",
  direction: "rtl",
};

const drawerVisible = ref(false);
defineExpose({ drawerVisible });

const processPeople = ref([]);
const fllowPeople = ref([]);
const loading = ref(false);
const options = ref<any[]>([]);
const queryPerson = async (query: string) => {
  if (query) {
    loading.value = true;
    await requestPerson().then((res) => {
      const listItems = res.data.msg.map((item: { title: any; value: any }) => {
        return { title: item, value: item };
      });
      options.value = listItems.filter((item: { title: string }) => {
        return item.title.toLowerCase().includes(query.toLowerCase());
      });
      loading.value = false;
    });
  }
};

const props = defineProps({
  rowData: {
    type: Object,
    required: true,
  },
});

const noticeFormData = ref({});
watch(
  () => props.rowData,
  (val) => {
    const newVal = { ...val };
    processPeople.value = newVal.processPeople?.split(",");
    fllowPeople.value = newVal.fllowPeople?.split(",");
    const newDomain = newVal.domain?.split(",");
    newVal.processPeople = processPeople.value;
    newVal.fllowPeople = fllowPeople.value;
    newVal.domain = newDomain;
    noticeFormData.value = newVal;
  }
);

const handleClose = () => {
  drawerVisible.value = false;
};

const NewFormConfig = computed(() => {
  return useFormConfig(noticeFormConfig, ["domain", "status"]);
});

const handleNoticeAction = () => {
  const data: any = { ...noticeFormData.value };
  data.processPeople = processPeople.value;
  data.fllowPeople = fllowPeople.value;
  faultStore.updateFaultRequest(data, true).then((res) => {
    if (res.code === 200) {
      ElMessage.success({
        message: "故障通告成功",
        type: "success",
      });
    }
    // 刷新故障列表
    isLoading.value = true;
    faultStore.getFaultRequest(faultPageNum.value, faultPageSize.value);
    isLoading.value = false;
  });
};
</script>

<style scoped></style>
