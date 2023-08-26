<script setup lang="ts">
import SvgIcon from "./SvgIcon.vue"
defineProps<{ msg: string }>()
</script>

<template>
  <h1 class="red">{{ msg }}</h1>
  <svg-icon name="love"></svg-icon>
</template>

<style scoped lang="scss">
.red {
  color: $color;
}
</style>
