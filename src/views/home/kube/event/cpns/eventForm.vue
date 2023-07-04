<template>
  <div class="event-form">
    <el-row>
      <el-col :span="24">
        <el-form label-width="120px">
          <el-form-item label="事件关键字" prop="pass">
            <el-input v-model="eventName"></el-input>
          </el-form-item>
          <el-button @click="handleSearch" type="primary" :icon="Search"
            >搜索</el-button
          >
          <el-button @click="handleReset" type="success" :icon="Refresh"
            >重置</el-button
          >
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { useKubeStore } from "@/store";
import { Search, Refresh } from "@element-plus/icons-vue";

const kubeStore = useKubeStore();

const eventName = ref<string>("");

const emits = defineEmits(["search"]);
const handleSearch = () => {
  emits("search", true);
  kubeStore
    .requestEvent(encodeURIComponent(eventName.value))
    .then((res) => {
      emits("search", false);
    })
    .catch((err) => {
      emits("search", false);
    });
};

const handleReset = () => {
  eventName.value = "";
  kubeStore.clearEvent();
};
</script>

<style scoped lang="less">
.even-form {
  padding: 20px;
  display: flex;
}
</style>
