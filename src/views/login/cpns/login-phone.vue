<template>
  <div class="login-phone">
    <el-form label-width="60px">
      <el-form-item label="手机号" prop="num">
        <el-input v-model.number="phone.num" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input v-model.number="phone.code" />
          <el-button type="primary" class="get-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  setup() {
    const phone = reactive({
      num: "",
      code: "",
    });

    return {
      phone,
    };
  },
});
</script>

<style scoped>
.login-phone {
  .get-code {
    display: flex;
  }

  .get-btn {
    margin-left: 10px;
  }
}
</style>
