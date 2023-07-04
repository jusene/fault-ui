<template>
  <div class="my-form">
    <el-form :label-width="props.labelWidth" ref="formRef">
      <div class="header">
        <slot name="header"></slot>
      </div>
      <el-row>
        <template v-for="item in props.formItems" :key="item.label">
          <el-col v-bind="props.colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="props.itemStyle"
            >
              <template
                v-if="
                  item.type === 'input' ||
                  item.type === 'password' ||
                  item.type === 'number'
                "
              >
                <el-input
                  :type="isNumber(item.type)"
                  :disabled="isDisabled(item.type, formData[`${item.field}`])"
                  :placeholder="item.placeholder"
                  v-bind="item.otheroptions"
                  :show-password="item.type === 'password'"
                  v-model="formData[`${item.field}`]"
                >
                  <template #prepend v-if="item.otheroptions?.isPrepend">
                    <slot name="prepend-content"></slot>
                  </template>
                </el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otheroptions"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.title }}
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  v-bind="item.otheroptions"
                  v-model="formData[`${item.field}`]"
                >
                </el-date-picker>
              </template>
              <template v-else-if="item.type === 'input-number'">
                <el-input-number
                  v-model="formData[`${item.field}`]"
                  style="width: 100%"
                  v-bind="item.otheroptions"
                >
                </el-input-number>
              </template>
              <template v-else-if="item.type === 'slot'">
                <slot :name="item.field" :placeholder="item.placeholder"></slot>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, defineProps, defineEmits } from "vue";
import { IFormItem } from "../types";
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  formItems: {
    type: Array as PropType<IFormItem[]>,
    default: () => [],
  },
  labelWidth: {
    type: String,
    default: "100px",
  },
  itemStyle: {
    type: Object,
    default: () => ({ padding: "10px 40px" }),
  },
  colLayout: {
    type: Object,
    default: () => ({
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
      xs: 24,
    }),
  },
});

const emits = defineEmits(["update:modelValue"]);
const formData = ref({ ...props.modelValue });

watch(
  formData,
  (newValue) => {
    emits("update:modelValue", newValue);
  },
  {
    deep: true,
  }
);

const isNumber = (type: string) => {
  if (type === "number") {
    return "number";
  }
  return "";
};

const isDisabled = (type: string, value: number) => {
  if (type === "number" && value < 2) {
    return true;
  }
  return false;
};
</script>

<style scoped>
.my-form {
  padding-top: 22px;
}
.footer {
  width: 100%;
}
</style>
