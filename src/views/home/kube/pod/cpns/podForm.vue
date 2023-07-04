<template>
  <div class="po-form">
    <el-row>
      <el-col :span="24">
        <el-autocomplete
          v-model="app"
          style="margin-right: 10px"
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          clearable
          placeholder="请输入应用名"
          @select="handleSelect"
        />
        <el-button :icon="Search" type="primary" @click="handleSearch"
          >搜索</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, defineEmits } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useKubeStore } from "@/store";
import { storeToRefs } from "pinia";

const kubeStore = useKubeStore();
const { podList } = storeToRefs(kubeStore);
const app = ref();

watch(
  () => podList.value,
  (val) => {
    console.log(val);
  }
);

const loadAllApp = computed(() => {
  const appList: any[] = [];
  podList.value.forEach((item) => {
    const app = item.metadata.labels.app;
    appList.push(app);
  });
  return Array.from(new Set(appList));
});

const querySearch = (queryString: string, cb: any) => {
  const results = loadAllApp.value.filter((app) => {
    if (app.toLowerCase().indexOf(queryString.toLowerCase()) === 0) {
      return app;
    }
  });
  const cbResult = results.map((item) => ({
    value: item,
  }));

  cb(cbResult);
};

const handleSelect = (item: any) => {
  app.value = item.value;
};

const emits = defineEmits(["search"]);
const handleSearch = () => {
  emits("search", app.value ?? "");
};
</script>

<style scoped>
.po-form {
  display: flex;
  padding: 20px;
}
</style>
