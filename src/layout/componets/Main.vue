<script setup lang="ts">
import useSettingStroe from "@/store/modules/setting"
const settingStore = useSettingStroe()
</script>
<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="!settingStore.refresh" />
    </transition>
  </router-view>
</template>
<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
