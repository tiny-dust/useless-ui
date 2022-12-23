---
layout: doc
---

# 浮雕按钮

<template style="display:flex;gap:12px;">
  <UButton >浮雕按钮</UButton>
  <UButton circle>圆</UButton>
  <UButton color="#61dafb" textColor="#42b883">还有一些其他的颜色</UButton>
  <UButton color="#42b883" @click="clickEvent">还有一些其他的颜色</UButton>
</template>

<script setup>
  const clickEvent = () => {
    console.log('click')
  }
</script>

```vue
<template>
  <UButton>浮雕按钮</UButton>
  <UButton circle>
    圆
  </UButton>
  <UButton color="#61dafb" text-color="#42b883">
    还有一些其他的颜色
  </UButton>
  <UButton color="#42b883" @click="clickEvent">
    还有一些其他的颜色
  </UButton>
</template>

<script setup>
const clickEvent = () => {
  console.log('click')
}
</script>
```
