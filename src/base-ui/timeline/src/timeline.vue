<template>
  <div>
    <el-timeline>
      <template v-for="item in props.timelineItems" :key="item.id">
        <el-timeline-item :timestamp="item.time" placement="top">
          <el-card style="display: flex">
            <h3>故障原因: {{ item.reason }}</h3>
            <p>故障进展: {{ item.process }}</p>
            <p>处理人: {{ item.processPeople }}</p>
            <p>跟进人: {{ item.fllowPeople }}</p>
          </el-card>
        </el-timeline-item>
      </template>
    </el-timeline>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from "vue";

const props = defineProps({
  timelineItems: {
    type: Array as PropType<any[]>,
    required: true,
  },
});
</script>

<style scoped></style>
