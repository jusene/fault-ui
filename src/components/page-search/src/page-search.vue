<template>
  <div class="page-search">
    <MyForm v-bind="props.searchFormConfig" v-model="formData">
      <!-- <template #header>
        <h1 class="header">高级检索</h1>
      </template> -->
      <template #footer>
        <div class="handle-btns">
          <el-button :icon="Refresh" @click.prevent="handleReset(formData)"
            >重置</el-button
          >
          <el-button
            type="primary"
            :icon="Search"
            @click.prevent="handleSearch(formData)"
            >搜索</el-button
          >
        </div>
      </template>
    </MyForm>
  </div>
</template>

<script setup lang="ts">
import { MyForm } from "@/base-ui/form";
import { ref, watch, defineEmits, defineProps } from "vue";
import { Search, Refresh } from "@element-plus/icons-vue";

const props = defineProps({
  searchFormConfig: {
    type: Object,
    required: true,
  },
  modelValue: {
    type: Object,
    required: true,
  },
});

const formData = ref({ ...props.modelValue });
const emits = defineEmits(["update:modelValue", "refresh", "search"]);
watch(
  formData,
  (newValue) => {
    emits("update:modelValue", newValue);
  },
  {
    deep: true,
  }
);

const handleReset = (value: any) => {
  // 清理输入框
  const keys = Object.keys(value);
  for (const key of keys) {
    value[key] = "";
  }
  // 重新刷新数据
  emits("refresh", true);
};

const handleSearch = (value: any) => {
  emits("search", true);
};
</script>

<style scoped>
.header {
  color: red;
}
.handle-btns {
  display: flex;
  justify-content: flex-end;
  padding: 0 50px 20px 0;
}
</style>
