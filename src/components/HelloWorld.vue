<script setup lang="ts">
import SvgIcon from "./SvgIcon.vue"
defineProps<{ msg: string }>()
</script>

<template>
  <h1>{{ msg }}</h1>
  <svg-icon name="love"></svg-icon>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
