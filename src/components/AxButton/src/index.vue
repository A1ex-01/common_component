<template>
  <button :class="type"><slot /></button>
</template>
<script lang="ts" setup>
import { Type } from "../types/index";
interface IProps {
  type: Type;
}
const { type } = defineProps<IProps>();
</script>
<style lang="scss" scoped>
button {
  font-size: 14px;
  height: 32px;
  padding: 4px 15px;
  border-radius: 6px;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  transition: all 0.5;
  border: 1px solid transparent;
  box-sizing: border-box;
  &.primary {
    color: #fff;
    background-color: #1677ff;
    box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1);
    border: 0;
  }
  &.primary:hover {
    background-color: #4096ff;
  }
  &.default {
    background-color: #fff;
    border-color: #d9d9d9;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
  }
  &.dashed {
    background-color: #fff;
    border-color: #d9d9d9;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
    border-style: dashed;
  }
  &.dashed:hover {
    color: #4096ff;
    border-color: #4096ff;
  }
  &.text {
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    height: 32px;
    padding: 4px 15px;
    border-radius: 6px;
    border: 0;
    background-color: transparent;
  }
  &.text:hover {
    color: rgba(0, 0, 0, 0.88);
    background-color: rgba(0, 0, 0, 0.06);
  }
  &.danger {
    color: #ff4d4f;
    border-color: #ff4d4f;
    background-color: transparent;
  }
  &.danger:hover {
    color: #ff7875;
    border-color: #ffa39e;
  }
}
</style>
