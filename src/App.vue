<template>
  <div class="app">
    <h1>首页</h1>
    <AxButton type="primary">AxForm组件</AxButton>
    <AxButton type="dashed">xxx组件</AxButton>
    <AxButton type="text">xxx组件</AxButton>
    <AxButton type="danger">xxx组件</AxButton>
    <hr />
    <Main />
  </div>
</template>
<script lang="ts" setup>
import Main from "./views/Main.vue";
import AxButton from "./components/AxButton";
</script>
<style lang="scss">
:root {
  --main-color: #409eff;
}
.app {
  width: 1000px;
  margin: 10px auto;
}
</style>
