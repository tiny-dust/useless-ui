<script setup lang="ts"></script>

<template>
  <component
    :is="configProvider"
    class="demo"
    namespace="naive-ui-doc"
    preflight-style-disabled
    :hljs="hljs"
  >
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </component>
</template>
<script setup lang="ts">
import hljs from './utils/hljs.js'
import { useSystemStore } from './store'
import { i18n } from './utils/composables'
import { storeToRefs } from 'pinia'
import { NConfigProvider } from 'naive-ui'

const configProvider = NConfigProvider

const { locale } = storeToRefs(useSystemStore())
i18n.provide(locale)
</script>
