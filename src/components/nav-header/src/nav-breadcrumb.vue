<template>
  <div>
    <MyBreadcrumb :breadcrumbs="breadcrumbs" />
  </div>
</template>

<script setup lang="ts">
import { MyBreadcrumb } from "@/base-ui/breadcrumb";
import { computed } from "vue";
import { menuLst } from "../../nav-menu/src/config/menu-lst";
import { pathMapBreadcrumbs } from "@/utils/map-menu";
import { useRoute } from "vue-router";

const breadcrumbs = computed(() => {
  const route = useRoute();
  const currentPath = route.path;
  return pathMapBreadcrumbs(menuLst, currentPath);
});
</script>

<style scoped></style>
