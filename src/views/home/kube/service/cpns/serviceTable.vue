<template>
  <div class="service-table">
    <MyTable :tableData="tableData" :prop-list="propList"> </MyTable>
  </div>
</template>

<script setup lang="ts">
import { MyTable } from "@/base-ui/table";
import { propList } from "../config/table.config";
</script>

<style scoped></style>
