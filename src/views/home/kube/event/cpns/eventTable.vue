<template>
  <div class="event-table">
    <MyTable :tableData="eventList" :prop-list="propList" />
  </div>
</template>

<script setup lang="ts">
import { MyTable } from "@/base-ui/table";
import { propList } from "../config/table.config";
import { useKubeStore } from "@/store";
import { storeToRefs } from "pinia";

const kubeStore = useKubeStore();
const { eventList } = storeToRefs(kubeStore);
</script>

<style scoped></style>
