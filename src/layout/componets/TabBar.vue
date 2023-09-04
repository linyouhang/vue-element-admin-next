<script setup lang="ts">
import useSetttingStore from "@/store/modules/setting"
import useUserStore from "@/store/modules/user"
import { nextTick, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
let dark = ref<boolean>(false)
const color = ref("rgba(255, 69, 0, 0.68)")
const predefineColors = ref([
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585",
  "rgba(255, 69, 0, 0.68)",
  "rgb(255, 120, 0)",
  "hsv(51, 100, 98)",
  "hsva(120, 40, 94, 0.5)",
  "hsl(181, 100%, 37%)",
  "hsla(209, 100%, 56%, 0.73)",
  "#c7158577",
])
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
//主题颜色的设置
const setColor = () => {
  //通知js修改根节点的样式对象的属性与属性值
  const html = document.documentElement
  html.style.setProperty("--el-color-primary", color.value)
}
//switch开关的chang事件进行暗黑模式的切换
const changeDark = () => {
  //获取HTML根节点
  let html = document.documentElement
  //判断HTML标签是否有类名dark
  dark.value ? (html.className = "dark") : (html.className = "")
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
      <el-button
        @click="refreshHandle"
        size="small"
        icon="Refresh"
        circle
      ></el-button>
      <el-button
        @click="fullScreenHandle"
        size="small"
        icon="FullScreen"
        circle
      ></el-button>
      <el-popover
        placement="bottom"
        title="主题设置"
        :width="300"
        trigger="hover"
      >
        <!-- 表单元素 -->
        <el-form>
          <el-form-item label="主题颜色">
            <el-color-picker
              @change="setColor"
              v-model="color"
              size="small"
              show-alpha
              :predefine="predefineColors"
            />
          </el-form-item>
          <el-form-item label="暗黑模式">
            <el-switch
              @change="changeDark"
              v-model="dark"
              class="mt-2"
              style="margin-left: 24px"
              inline-prompt
              active-icon="MoonNight"
              inactive-icon="Sunny"
            />
          </el-form-item>
        </el-form>
        <template #reference>
          <el-button size="small" icon="Setting" circle></el-button>
        </template>
      </el-popover>
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
