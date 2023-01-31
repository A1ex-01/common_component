<template>
  <div>
    <div class="form-item">
      <slot />
      <div class="form-item-label">
        <label for="">{{ placeholder }}</label>
      </div>
    </div>
    <div class="error-msg">{{ errorMsg }}</div>
  </div>
</template>
<script lang="ts" setup>
import { provide, ref } from "vue";
import { FormItem, FormItemTriggerType } from "../types/formItem";
interface IProps {
  placeholder: string;
  rules: FormItem["rules"];
}
const props = defineProps<IProps>();
const errorMsg = ref("");
function validateProp(trigger: FormItemTriggerType, value: string) {
  props.rules.forEach((rule) => {
    rule.trigger === trigger && run(rule);
  });
  function run(rule: any) {
    if (!value) return (errorMsg.value = "");
    if (value.length < rule.min! || value.length > rule.max!) {
      errorMsg.value = rule.message as string;
    } else {
      errorMsg.value = "";
    }
  }
}
// 验证状态
const validateState = ref("1");
provide("validateProp", validateProp);
provide("validateRules", props.rules);
</script>
<style lang="scss" scoped>
.form-item {
  margin-top: 30px;
  height: 40px;
  position: relative;
  > .form-item-label {
    position: absolute;
    top: 0;
    left: 10px;
    height: 100%;
    transition: all 0.3s ease-in-out;
    pointer-events: none;

    label {
      display: block;
      width: 100%;
      height: 100%;
      line-height: 40px;
      color: var(--main-color);
    }
  }
}
.error-msg {
  color: #f00;
  height: 21px;
}
:deep(input) {
  &:valid,
  &:focus {
    & ~ .form-item-label {
      top: -100%;
      font-size: 15px;
    }
  }
}
</style>
