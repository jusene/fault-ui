<template>
  <div class="line-echart">
    <BaseEchart :options="options" v-bind="chartStyle"></BaseEchart>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import { BaseEchart } from "@/base-ui/echart";
import type { IDataType } from "../types";
import { EChartsOption } from "echarts";

const props = defineProps<{
  lineData: IDataType[];
  chartStyle: object;
  xLabels: string[];
}>();

const options = computed((): EChartsOption => {
  const seriesData: any[] = [];
  for (const series of props.lineData) {
    const item = {
      name: series.name,
      type: "line",
      stack: "Total",
      data: series.value,
    };
    seriesData.push(item);
  }
  return {
    tooltip: {
      trigger: "axis",
    },
    legend: {},
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: props.xLabels,
    },
    yAxis: {
      type: "value",
    },
    series: seriesData,
  };
});
</script>

<style scoped></style>
