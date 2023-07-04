<template>
  <budgetChart></budgetChart>
  <div class="fault-budget">
    <budgetTable />
  </div>
</template>

<script setup lang="ts">
import budgetTable from "./cpns/budgetTable.vue";
import budgetChart from "./cpns/budgetChart.vue";
</script>

<style scoped>
.fault-budget {
  padding: 20px;
}
</style>
