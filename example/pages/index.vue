<template>
  <n-layout
    :style="{
      height: '100vh',
    }"
  >
    <SiteHeader />
    <n-layout :native-scrollbar="false" style="top: 64px">
      <h1>主页</h1>
    </n-layout>
  </n-layout>
</template>
<script setup lang="ts">
import SiteHeader from '../layout/SiteHeader.vue'
</script>
