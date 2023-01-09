<script setup lang="ts"></script>

<template>
  <n-config-provider
    class="demo"
    namespace="naive-ui-doc"
    preflight-style-disabled
    :hljs="hljs"
  >
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </n-config-provider>
</template>
<script setup lang="ts">
import hljs from './utils/hljs.js'
</script>
