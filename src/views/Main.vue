<template>
  <AxFormItem placeholder="用户名" :rules="rulePsw">
    <AxInput v-model="formData.username" />
  </AxFormItem>
  <AxFormItem placeholder="密码" :rules="rulePsw">
    <AxInput v-model="formData.password" />
  </AxFormItem>
  <AxFormItem placeholder="验证码" :rules="rulePsw">
    <AxInput v-model="formData.code" />
  </AxFormItem>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { AxFormItem, AxInput } from "../components/AxForm";
import {
  FormItem,
  FormItemTriggerType,
} from "../components/AxForm/types/formItem";
const formData = reactive({
  username: "",
  password: "",
  code: "",
});
const rulePsw: FormItem["rules"] = [
  {
    max: 16,
    min: 8,
    message: `密码最少8位,最长16位~`,
    trigger: FormItemTriggerType.CHANGE,
  },
];
</script>
<style scoped></style>
