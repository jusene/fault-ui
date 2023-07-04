<template>
  <div class="deploy-form">
    <MySearchPage
      :search-form-config="searchFormConfig"
      v-model="formData"
      @refresh="handleRefresh"
      @search="handleSearch"
    />
    <!-- <MyForm v-bind="searchFormConfig" v-model="formData" /> -->
  </div>
</template>

<script setup lang="ts">
import { MySearchPage } from "@/components/page-search";
import { searchFormConfig } from "../config/search.config";
import { ref, defineEmits } from "vue";

// 双向绑定属性由field的配置决定
const formItems = searchFormConfig.formItems ?? [];
const formOrigin: any = {};
formItems.forEach((item) => {
  formOrigin[item.field] = "";
});

const formData = ref(formOrigin);

const emits = defineEmits(["refreshTable", "searchTable"]);

const handleRefresh = (value: boolean) => {
  if (value) {
    emits("refreshTable", value);
  }
};

const handleSearch = (value: boolean) => {
  if (value) {
    emits("searchTable", formData);
  }
};
</script>

<style scoped></style>
