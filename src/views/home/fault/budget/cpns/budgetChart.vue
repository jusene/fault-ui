<template>
  <div class="echart">
    <el-row :gutter="10">
      <el-col :span="6">
        <MyCard title="故障总数">
          <PieEchart
            :pie-data="pieOption"
            :chart-style="chartStyle"
            :series-name="'故障数'"
          ></PieEchart>
        </MyCard>
      </el-col>
      <el-col :span="8">
        <MyCard title="故障趋势">
          <LineEchart
            :chart-style="chartStyle"
            :line-data="lineOption"
            :x-labels="lineXLabels"
          ></LineEchart>
        </MyCard>
      </el-col>
      <el-col :span="10">
        <MyCard title="SLA可用性">
          <BarEchart
            :bar-data="barOption"
            :chart-style="chartStyle"
            :x-labels="barXlabels"
          ></BarEchart>
        </MyCard>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { MyCard } from "@/base-ui/card";
import { computed, ref } from "vue";
import { PieEchart } from "@/components/page-echarts";
import { LineEchart } from "@/components/page-echarts";
import { BarEchart } from "@/components/page-echarts";
import { IDataType } from "@/components/page-echarts/types";
import { useBudgetStore } from "@/store";

const budgetStore = useBudgetStore();
const chartStyle = {
  height: "300px",
};

const barOption = computed(() => {
  return [];
});

const barXlabels = computed(() => {
  return ["TOC业务", "智慧门店", "集团运营", "IOT业务", "财务中台", "供应链"];
});

budgetStore.getFaultTrendRequest();

const lineOption = computed((): IDataType[] => {
  return budgetStore.faultTrend;
});

const lineXLabels = computed(() => {
  return [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ];
});

// 请求故障分组的数据
budgetStore.getGroupFaultRequest();

const pieOption = computed((): IDataType[] => {
  return budgetStore.groupFault;
});
</script>

<style scoped>
.chart {
  width: 100%;
  height: 200px;
}
</style>
