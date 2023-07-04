<template>
  <div v-loading="loading" :style="{ height: realHeight }">
    <iframe
      :src="url"
      scrolling="auto"
      frameborder="no"
      style="width: 100%; height: 100%"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const url = "http://172.22.3.135:3000";
const realHeight = ref(document.documentElement.clientHeight - 94.5 + "px");
const loading = ref(false);

onMounted(() => {
  window.onresize = function () {
    realHeight.value = document.documentElement.clientHeight - 94.5 + "px";
  };
  loading.value = false;
});
</script>

<style scoped></style>
