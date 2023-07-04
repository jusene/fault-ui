<template>
  <div class="pie-echart">
    <BaseEchart :options="options" v-bind="chartStyle"></BaseEchart>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import { BaseEchart } from "@/base-ui/echart";
import type { IDataType } from "../types";
import { EChartsOption } from "echarts";
import { PieDataItemOption } from "echarts/types/src/chart/pie/PieSeries";

const props = defineProps<{
  pieData: IDataType[];
  chartStyle: object;
  seriesName: string;
}>();

const options = computed((): EChartsOption => {
  return {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    // legend: {
    //   orient: "vertical",
    //   left: "left",
    // },
    series: [
      {
        name: props.seriesName,
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: props.pieData as PieDataItemOption[],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
});
</script>

<style scoped></style>
