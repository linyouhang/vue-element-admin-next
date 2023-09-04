<script setup lang="ts">
defineProps(["menuList"])
</script>
<template>
  <div class="menu-container">
    <el-scrollbar>
      <template v-for="item in menuList" :key="item.path">
        <el-menu-item
          :index="item.path"
          v-if="!item.meta.hidden && !item.children"
        >
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </el-menu-item>
        <el-menu-item
          :index="item.children[0].path"
          v-else-if="
            !item.meta.hidden &&
            item.children &&
            item.children.length === 1 &&
            !item.children[0].meta.hidden
          "
        >
          <el-icon>
            <component :is="item.children[0].meta.icon"></component>
          </el-icon>
          <span>{{ item.children[0].meta.title }}</span>
        </el-menu-item>
        <el-sub-menu
          :index="item.path"
          v-else-if="!item.meta.hidden && item.children.length > 1"
        >
          <template #title>
            <el-icon>
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.title }}</span>
          </template>
          <!-- <el-menu-item index="111">111</el-menu-item> -->
          <MenuItem :menuList="item.children"></MenuItem>
        </el-sub-menu>
      </template>
    </el-scrollbar>
  </div>
</template>
<style scoped lang="scss"></style>
