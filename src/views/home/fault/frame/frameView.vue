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
import { ref, defineEmits, onUnmounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const { id } = route.query;
const url = "https://gumingnc.yuque.com/voph0x/db04y1/" + id;

const realHeight = ref(document.documentElement.clientHeight - 20 + "px");
const loading = ref(false);

const handleResize = () => {
  realHeight.value = document.documentElement.clientHeight - 20 + "px";
};

window.addEventListener("resize", handleResize);

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

const emits = defineEmits(["handleCollapse"]);
emits("handleCollapse", true);
</script>

<style scoped></style>
