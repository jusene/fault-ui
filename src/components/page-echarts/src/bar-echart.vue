<template>
  <div class="bar-echart">
    <BaseEchart :options="options" v-bind="chartStyle"></BaseEchart>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import { BaseEchart } from "@/base-ui/echart";
import { EChartsOption } from "echarts";

const props = defineProps<{
  barData: number[];
  chartStyle: object;
  xLabels: string[];
}>();

const options = computed((): EChartsOption => {
  return {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      top: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: props.xLabels,
      axisTick: {
        alignWithLabel: true,
      },
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: props.barData,
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
      },
    ],
  };
});
</script>
