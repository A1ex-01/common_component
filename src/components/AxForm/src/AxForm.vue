<template>
  <div class="axForm">
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { FormItemRule, FormItemTriggerType } from "../types/formItem";
import AsyncValidator from "async-validator";
import { provide } from "vue";
// import { FormProps } from "../types/form";
interface FormProps {
  model: object;
  rules: { [x: string]: FormItemRule[] };
  showMessage?: boolean;
}
const props = defineProps<FormProps>();

async function validateRules(): Promise<{ code: number; msg: string }> {
  const validator = new AsyncValidator(props.rules);
  return new Promise((resolve, reject) => {
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
provide("rules", props.rules);
defineExpose({
  validateRules,
  validateSingleRule,
});
</script>
<style lang="scss" scoped></style>
