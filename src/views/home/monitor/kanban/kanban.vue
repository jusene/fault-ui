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
import { onMounted, onUnmounted, ref } from "vue";

const url = "http://172.22.3.135:3000";
const realHeight = ref(document.documentElement.clientHeight - 94.5 + "px");
const loading = ref(false);

const handleResize = () => {
  realHeight.value = document.documentElement.clientHeight - 20 + "px";
};

window.addEventListener("resize", handleResize);

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped></style>
