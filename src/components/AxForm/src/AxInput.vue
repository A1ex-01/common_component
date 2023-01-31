<template>
  <input
    type="text"
    :value="modelValue"
    @change="handleChange"
    @input="handleInput"
    required
  />
</template>
<script lang="ts" setup>
import { inject } from "vue";
import { FormItem, FormItemTriggerType } from "../types/formItem";

defineProps<{
  modelValue: string;
}>();
const emits = defineEmits<{ (e: "update:modelValue", val: string): void }>();
const validateProp: any = inject("validateProp")!;
const validateRules: FormItem["rules"] = inject("validateRules")!;
function handleChange(e: Event) {
  emits("update:modelValue", (e.target as HTMLInputElement).value);
  // 做验证
  validateProp?.(
    FormItemTriggerType.CHANGE,
    (e.target as HTMLInputElement).value
  );
}
function handleInput(e: Event) {
  emits("update:modelValue", (e.target as HTMLInputElement).value);
  // 做验证
  validateProp?.(
    FormItemTriggerType.INPUT,
    (e.target as HTMLInputElement).value
  );
}
</script>
<style lang="scss" scoped>
input {
  height: 100%;
  padding: 0;
  margin: 0;
  width: 300px;
  border-width: 1px;
  padding-left: 10px;
  box-sizing: border-box;
  outline: 0;
  border: 2px solid var(--main-color);
  border-radius: 7px;
  box-shadow: 0 0 3px rgba($color: #000000, $alpha: 0.3);
}
</style>
