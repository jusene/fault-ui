<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
        <span style="margin-left: 5px">{{ user }}</span>
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item divided @click="loginout"
            >退出登陆</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ArrowDown } from "@element-plus/icons-vue";
import router from "@/router";
import localCache from "@/utils/cache";
import { ref } from "vue";
import jwtTokenParse from "@/utils/parse-jwt";
import { useUserStore } from "@/store";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const token = localCache.getCache("token");
const userinfo = jwtTokenParse(token);
user.value = userinfo.realname;
// const name = ref(userinfo.realname);

const loginout = () => {
  localCache.deleteCache("token");
  router.push("/login");
};
</script>

<style scoped>
.user-info {
  .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
  }
}
</style>
