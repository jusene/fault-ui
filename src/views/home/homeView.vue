<template>
  <div class="home">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '70px' : '210px'">
        <NavMenu :collapse="isCollapse" :title="'稳定性平台'" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <NavHeader
            @foldChange="handleFoldChange"
            :collapseStatus="isCollapse"
          />
        </el-header>
        <el-main class="page-content">
          <div class="page-info" id="water">
            <RouterView @handleCollapse="handleCollapse" />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import NavMenu from "@/components/nav-menu";
import NavHeader from "@/components/nav-header";
import { onMounted, ref } from "vue";
import watermark from "@/utils/watermark.js";
import { useUserStore } from "@/store";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const isCollapse = ref(false);
const handleFoldChange = (isFold: boolean) => {
  isCollapse.value = isFold;
};

onMounted(() => {
  const container = document.getElementById("water");
  watermark.set("稳定性平台 " + user.value, container);
});

const handleCollapse = (value: boolean) => {
  isCollapse.value = value;
};
</script>

<style scoped lang="less">
.home {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.main-content,
.page {
  height: 100%;
}

.page-content {
  height: calc(100% - 48px);
  .page-info {
    background-color: #fff;
    border-radius: 5px;
  }
}

.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}
.el-header {
  height: 48px !important;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
</style>
