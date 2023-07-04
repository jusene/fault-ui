<template>
  <div class="drawer-page">
    <el-drawer
      v-model="drawer"
      v-bind="props.drawerConfig"
      @close="handleClose"
    >
      <slot name="draw-content"></slot>
      <template #footer>
        <slot name="footer"></slot>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, defineEmits, watch } from "vue";

const props = defineProps({
  drawerVisible: {
    type: Boolean,
    required: true,
  },
  drawerConfig: {
    type: Object,
    required: true,
  },
});

const drawer = ref(props.drawerVisible);
watch(
  () => props.drawerVisible,
  (val: boolean) => {
    drawer.value = val;
  }
);

const emits = defineEmits(["close"]);
const handleClose = () => {
  emits("close", false);
};
</script>

<style scoped></style>
