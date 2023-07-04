<template>
  <div class="dialog-page">
    <el-dialog
      v-bind="props.dialogConfig"
      v-model="dialog"
      @close="handleClose"
    >
      <slot name="dialog-content"></slot>
      <template #footer>
        <slot name="footer"></slot>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, defineEmits, watch } from "vue";

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: true,
  },
  dialogConfig: {
    type: Object,
    required: true,
  },
});
const dialog = ref(props.dialogVisible);
watch(
  () => props.dialogVisible,
  (val: boolean) => {
    dialog.value = val;
  }
);

const emits = defineEmits(["close"]);
const handleClose = () => {
  emits("close", false);
};
</script>

<style scoped></style>
