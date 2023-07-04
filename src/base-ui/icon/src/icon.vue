<template>
  <div>
    <el-icon>
      <template v-if="props.icon === 'cpu'">
        <Cpu />
      </template>
      <template v-else-if="props.icon === 'search'">
        <Search />
      </template>
      <template v-else-if="props.icon === 'monitor'">
        <Monitor />
      </template>
      <template v-else-if="props.icon === 'operation'">
        <Operation />
      </template>
      <template v-else>
        <Folder />
      </template>
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import {
  Search,
  Folder,
  Cpu,
  Monitor,
  Operation,
} from "@element-plus/icons-vue";

const props = defineProps({
  icon: {
    type: String,
  },
});
</script>

<style scoped></style>
