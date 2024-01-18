<template>
  <div>
    <div>
      <eventSearchForm />
    </div>
    <div class="event-page">
      <eventTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import eventTable from "./cpns/eventTable.vue";
import eventSearchForm from "./cpns/eventSearchForm.vue";
</script>

<style scoped>
.event-page {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
