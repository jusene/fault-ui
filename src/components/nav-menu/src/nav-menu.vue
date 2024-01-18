<template>
  <div class="nav-menu">
    <div class="logo">
      <img
        class="img"
        src="https://img.gumingnc.com/newton/20230217055538CST97811676627738132.png"
        alt="logo"
      />
      <span v-if="!props.collapse" class="title">{{ props.title }}</span>
    </div>
    <el-menu
      :default-active="defaultVal"
      class="el-menu-vertical"
      background-color="#0c2135"
      :collapse="props.collapse"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in menu" :key="item.id">
        <!--二级菜单-->
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id" v-if="!item.hidden">
            <template #title>
              <MyIcon :icon="item.icon" />
              <span>{{ item.name }}</span>
            </template>
            <!--遍历里面的item-->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id"
                @click="handleItemClick(subitem)"
              >
                <MyIcon :icon="subitem.icon" />
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id">
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { menuLst } from "./config/menu-lst";
import { pathMapToMenu } from "@/utils/map-menu";
import { MyIcon } from "@/base-ui/icon";

const menu = ref(menuLst);
const defaultVal = ref<string>("1-1");
const router = useRouter();
const route = useRoute();
const props = defineProps({
  collapse: {
    type: Boolean,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
});

const currentPath = route.path;
const m = pathMapToMenu(menuLst, currentPath);
defaultVal.value = m.id;

// const handleOpen = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath);
// };

// const handleClose = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath);
// };

const handleItemClick = (item: any) => {
  router.push({
    path: item.url ?? "/not-found",
  });
};
</script>

<style lang="less" scoped>
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu,
  .el-menu-item {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-sub-menu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }
  .el-submenu.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
