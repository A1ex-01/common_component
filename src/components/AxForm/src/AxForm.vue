<template>
  <div class="axForm">
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { FormItemRule, FormItemTriggerType } from "../types/formItem";
import AsyncValidator from "async-validator";
import { getCurrentInstance, provide, ref, useSlots } from "vue";
// import { FormProps } from "../types/form";
interface FormProps {
  model: object;
  rules: { [x: string]: FormItemRule[] };
  showMessage?: boolean;
}
const instance = getCurrentInstance();
const props = defineProps<FormProps>();
const slots = useSlots();
async function validateRules(): Promise<{ code: number; msg: string }> {
  const validator = new AsyncValidator(props.rules);
  return new Promise((resolve, reject) => {
    childrenInstanceValidateFns.value.forEach((fn: any) => fn());
    // 调用所有的子组件的validate
    validator.validate(props.model, { first: true, firstFields: true }).then(
      (res) => {
        resolve({ code: 200, msg: "校验成功" });
      },
      ({ errors }) => {
        resolve({ code: 500, msg: errors[0].message });
      }
    );
  });
  // Object.keys(props.rules).forEach((field) => {
  //   const currValue = (props.model as any)[field];
  //   const rules = props.rules[field];
  //   const validator = new AsyncValidator({
  //     [field]: rules,
  //   });
  //   console.log([field], currValue);
  // });
}
async function validateSingleRule(trigger: FormItemTriggerType, field: string) {
  console.log(trigger, field);
}
const childrenInstanceValidateFns = ref<any>([]);
console.log(childrenInstanceValidateFns);
provide("rules", props.rules);
provide("instances", (res: any) => {
  childrenInstanceValidateFns.value.push(() => res(props.model));
});
defineExpose({
  validateRules,
  validateSingleRule,
});
</script>
<style lang="scss" scoped></style>
