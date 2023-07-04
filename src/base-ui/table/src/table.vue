<template>
  <div class="my-table">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-table
      :data="tableData"
      :border="showBorder"
      :row-key="rowKey"
      :default-expand-all="defaultExpandAll"
      style="width: 100%"
    >
      <template v-for="propItem in props.propList" :key="propItem.prop">
        <el-table-column
          v-bind="propItem"
          :show-overflow-tooltip="showOverflowTooltip"
        >
          <template v-if="propItem?.slotName" #default="scope">
            <template v-for="(item, index) in propItem.slotName" :key="index">
              <slot :name="item" :row="scope.row"> </slot>
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from "vue";

const props = defineProps({
  tableData: {
    type: Array,
    required: true,
  },
  propList: {
    type: Array as PropType<any[]>,
    required: true,
  },
  showBorder: {
    type: Boolean,
    default: false,
  },
  showOverflowTooltip: {
    type: Boolean,
    default: false,
  },
  defaultExpandAll: {
    type: Boolean,
    default: false,
  },
  rowKey: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
.my-table {
  width: 100%;
}
</style>
