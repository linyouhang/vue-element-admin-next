<script setup lang="ts">
import Logo from "./componets/Logo.vue"
import MenuItem from "./componets/MenuItem.vue"
import useUserStore from "@/store/modules/user"
import Main from "./componets/Main.vue"
import TabBar from "./componets/TabBar.vue"
import { useRoute } from "vue-router"
import useSetttingStore from "@/store/modules/setting"

const $route = useRoute()
const userStore = useUserStore()
const settingStore = useSetttingStore()
</script>
<template>
  <div class="layout-container">
    <div class="menu" :class="{ fold: !settingStore.fold }">
      <Logo></Logo>
      <el-menu
        :default-active="$route.path"
        background-color="#1d3462"
        text-color="#ffffff"
        :router="true"
        :collapse="!settingStore.fold"
      >
        <MenuItem :menuList="userStore.menuList"></MenuItem>
      </el-menu>
    </div>
    <div class="navBar" :class="{ fold: !settingStore.fold }"><TabBar /></div>
    <div class="main" :class="{ fold: !settingStore.fold }">
      <Main></Main>
    </div>
  </div>
</template>
<style scoped lang="scss">
.layout-container {
  width: 100%;
  height: 100vh;
  .menu {
    overflow: hidden;
    background-color: $neutral-color-2;
    width: $menu-width;
    height: 100vh;
    &.fold {
      width: 45px;
      transition: all 0.3s;
    }
    .el-menu {
      border-right: 0px;
    }
  }
  .navBar {
    width: calc(100% - $menu-width);
    position: fixed;
    top: 0px;
    left: $menu-width;
    height: $nav-height;
    border-bottom: 1px solid $border-color;
    &.fold {
      width: calc(100vw - 45px);
      left: 45px;
      transition: all 0.3s;
    }
  }
  .main {
    width: calc(100% - $menu-width);
    height: calc(100% - $nav-height);
    position: absolute;
    left: $menu-width;
    top: $nav-height;
    padding: 20px;
    overflow: auto;
    &.fold {
      width: calc(100vw - 45px);
      left: 45px;
      transition: all 0.3s;
    }
  }
}
</style>
