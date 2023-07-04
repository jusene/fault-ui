<template>
  <div v-loading="isLoading">
    <MyDrawer
      :drawerConfig="drawerEditConfig"
      :drawer-visible="drawerVisible"
      @close="handleClose"
    >
      <template #draw-content>
        <MyForm v-bind="NewFormConfig" v-model="editFormData">
          <template #mainResponsibility="scope">
            <el-select
              v-model="mainResponsibility"
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
          <template #secondResponsibility="scope">
            <el-select
              v-model="secondResponsibility"
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
        <el-button type="primary" @click="handleSaveAction">保存</el-button>
      </template>
    </MyDrawer>
  </div>
</template>

<script setup lang="ts">
import { editFormConfig } from "../config/edit.config";
import { MyForm } from "@/base-ui/form";
import { MyDrawer } from "@/base-ui/drawer";
import { ref, defineProps, watch, defineExpose, computed } from "vue";
import { useFaultStore } from "@/store/fault/fault";
import { storeToRefs } from "pinia";
import { useFormConfig } from "@/hooks/useFormConfig";
import { ElMessage } from "element-plus";
import { requestPerson } from "@/services/axios/fault/fault";

const faultStore = useFaultStore();
const { faultPageNum, faultPageSize } = storeToRefs(faultStore);
const isLoading = ref(false);
const drawerEditConfig = {
  title: "故障处理",
  destroyOnClose: true,
  size: "30%",
  direction: "rtl",
};

const NewFormConfig = computed(() => {
  return useFormConfig(editFormConfig, [
    "domain",
    "domainLevel",
    "tag",
    "status",
    "level",
    "source",
    "group",
  ]);
});

const props = defineProps({
  rowData: {
    type: Object,
    default: () => ({}),
  },
});

const drawerVisible = ref(false);
defineExpose({ drawerVisible });
const handleClose = () => {
  drawerVisible.value = false;
};

const mainResponsibility = ref([]);
const secondResponsibility = ref([]);
const fllowPeople = ref([]);
const processPeople = ref([]);
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

const editFormData = ref({});
watch(
  () => props.rowData,
  (val, oldval) => {
    console.log(val);
    const newVal = { ...val };
    const newTag = newVal.tag?.split(",");
    const newDomain = newVal.domain?.split(",");
    mainResponsibility.value = newVal.mainResponsibility?.split(",");
    secondResponsibility.value = newVal.secondResponsibility?.split(",");
    fllowPeople.value = newVal.fllowPeople?.split(",");
    processPeople.value = newVal.processPeople?.split(",");
    newVal.tag = newTag;
    newVal.domain = newDomain;
    newVal.mainResponsibility = mainResponsibility.value;
    newVal.secondResponsibility = secondResponsibility.value;
    editFormData.value = newVal;
  }
);

const handleSaveAction = () => {
  const data: any = { ...editFormData.value };
  data.mainResponsibility = mainResponsibility.value;
  data.secondResponsibility = secondResponsibility.value;
  data.fllowPeople = fllowPeople.value;
  data.processPeople = processPeople.value;
  faultStore.updateFaultRequest(data).then((res) => {
    if (res.code === 200) {
      ElMessage.success({
        message: "保存成功",
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
