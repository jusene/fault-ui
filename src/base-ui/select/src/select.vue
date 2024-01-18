<template>
  <div>
    <el-select
      v-model="selectData"
      multiple
      filterable
      remote
      reserve-keyword
      style="width: 100%"
      :placeholder="scope.placeholder"
      :remote-method="methodFn"
      :loading="loading"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.title"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
  methodFn: {
    type: Function,
    required: true,
  },
});

const selectData = ref(props.modelValue);
const method = ref(props.methodFn);
</script>

<style scoped></style>
