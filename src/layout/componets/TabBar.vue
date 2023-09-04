<script setup lang="ts">
import useSetttingStore from "@/store/modules/setting"
import useUserStore from "@/store/modules/user"
import { nextTick } from "vue"
import { useRoute, useRouter } from "vue-router"

const userStore = useUserStore()
const $route = useRoute()
const $router = useRouter()
const settingStore = useSetttingStore()
const foldHandle = function () {
  settingStore.fold = !settingStore.fold
}
const refreshHandle = () => {
  settingStore.refresh = true
  nextTick(() => {
    settingStore.refresh = false
  })
}
const fullScreenHandle = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
const logout = () => {
  userStore.logout()
  $router.push("/login")
}
</script>
<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <el-icon>
        <component
          :is="settingStore.fold ? 'Expand' : 'Fold'"
          @click="foldHandle"
        ></component>
      </el-icon>
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item
          v-for="item in $route.matched"
          :key="item.path"
          :to="item.path"
        >
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tabbar_right">
      <el-icon @click="refreshHandle"><Refresh /></el-icon>
      <el-icon @click="fullScreenHandle"><FullScreen /></el-icon>
      <el-icon><Setting /></el-icon>
      <el-avatar :src="userStore.avatar" :size="20" />
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userStore.username }}
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登入</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<style scoped lang="scss">
.tabbar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  .tabbar_left {
    display: flex;
    align-items: center;
    .el-icon {
      margin: 0 10px;
    }
  }
  .tabbar_right {
    display: flex;
    align-items: center;
    .el-icon {
      margin: 0 5px;
    }
    .el-avatar {
      margin: 0 5px;
    }
  }
}
</style>
