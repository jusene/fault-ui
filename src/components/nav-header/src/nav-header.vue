<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick">
      <Fold v-if="!isFold" />
      <Expand v-if="isFold" />
    </el-icon>
    <div class="content">
      <div>
        <breadcrumb />
      </div>
      <div>
        <user-info />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { Fold, Expand } from "@element-plus/icons-vue";
import userInfo from "./nav-info.vue";
import breadcrumb from "./nav-breadcrumb.vue";

export default defineComponent({
  components: {
    Fold,
    Expand,
    userInfo,
    breadcrumb,
  },
  emits: ["foldChange"],
  props: {
    collapseStatus: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const isFold = ref(false);
    watch(
      () => props.collapseStatus,
      (val) => {
        isFold.value = val;
      }
    );
    const handleFoldClick = () => {
      isFold.value = !isFold.value;
      emit("foldChange", isFold.value);
    };

    return {
      isFold,
      handleFoldClick,
    };
  },
});
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    flex: 1;
    padding: 0 5px;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
