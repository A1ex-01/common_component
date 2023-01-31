<template>
  <div class="app">
    <h1>首页</h1>
    <Main />
  </div>
</template>
<script lang="ts" setup>
import Main from "./views/Main.vue";
</script>
<style lang="scss">
:root {
  --main-color: #008c8c;
}
.app {
  width: 1000px;
  margin: 10px auto;
}
</style>
