<template>
  <div class="logo-container">
    <svg-icon name="vue" width="25px" height="25px" class="logo"></svg-icon>
    <p class="title">后台管理系统</p>
  </div>
</template>
<style scoped lang="scss">
.logo-container {
  position: relative;
  overflow: auto;
  height: 25px;
  .logo {
    position: absolute;
    left: 20px;
  }
  .title {
    font-size: medium;
    color: $neutral-color-5;
    position: absolute;
    left: 50px;
    top: 10px;
  }
}
</style>
