<template>
  <div>
    <svg :style="{ width, height }">
      <use :xlink:href="symbolId" :fill="color"></use>
    </svg>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue"

const props = defineProps({
  prefix: {
    type: String,
    default: "icon",
  },
  name: {
    type: String,
    require: true,
  },
  width: {
    type: String,
    default: "16px",
  },
  height: {
    type: String,
    default: "16px",
  },
  color: {
    type: String,
    default: "#333",
  },
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>
