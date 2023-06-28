<template>
  <AxForm :model="formData" :rules="rules" ref="form">
    <AxFormItem placeholder="用户名" prop="username">
      <AxInput v-model="formData.username" />
    </AxFormItem>
    <AxFormItem placeholder="密码" prop="password">
      <AxInput v-model="formData.password" />
    </AxFormItem>
    <AxFormItem placeholder="验证码" prop="code">
      <AxInput v-model="formData.code" />
    </AxFormItem>
  </AxForm>
  <AxButton type="primary" @click="submit">提交</AxButton>
  <AxButton type="dashed" @click="resetFormData">重置</AxButton>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { AxFormItem, AxInput, AxForm } from "../components/AxForm";
import {
  FormItem,
  FormItemRule,
  FormItemTriggerType,
} from "../components/AxForm/types/formItem";
import AxButton from "../components/AxButton";
interface IData {
  username: string;
  password: string;
  code: string;
}
const formData: IData = reactive({
  username: "",
  password: "",
  code: "",
});
function resetFormData() {
  Object.keys(formData).forEach((field: string) => {
    (formData as any)[field] = "";
  });
}
const rules: { [x: string]: FormItemRule[] } = {
  username: [
    {
      required: true,
      message: "用户名为必填项",
      trigger: FormItemTriggerType.CHANGE,
    },
    {
      max: 10,
      min: 4,
      message: `用户名最少4位,最长10位~`,
      trigger: FormItemTriggerType.CHANGE,
    },
  ],
  password: [
    {
      required: true,
      message: "密码为必填项",
    },
    {
      max: 16,
      min: 8,
      message: `密码最少8位,最长16位~`,
      trigger: FormItemTriggerType.CHANGE,
    },
  ],
  code: [
    {
      required: true,
      message: "验证码为必填项",
    },
    {
      max: 4,
      min: 4,
      message: `验证码必须是四位~`,
      trigger: FormItemTriggerType.INPUT,
    },
  ],
};

const form = ref<InstanceType<typeof AxForm>>();
async function submit() {
  const { code, msg } = await form.value!.validateRules();
  console.log(msg);
}
</script>
<style scoped></style>
