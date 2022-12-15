<template>
  <button><slot /></button>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
const props = defineProps({
  type: {
    type: String,
    default: 'button'
  }
})
</script>
