<template>
  <n-h1 :id="id" class="naive-doc-title">
    <span>{{ text }}</span>
    <span class="edit-button">
      <n-tooltip placement="right" :show-arrow="false">
        <template #trigger>
          <edit-on-github-button
            text
            class="edit-button"
            quaternary
            :relative-url="relativeUrl"
          />
        </template>
        在 GitHub 上编辑
      </n-tooltip>
    </span>
  </n-h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EditOnGithubButton from './EditOnGithubButton.vue'

export default defineComponent({
  name: 'EditOnGithubHeader',
  components: {
    EditOnGithubButton
  },
  props: {
    relativeUrl: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  setup () {
    return {}
  },
  computed: {
    id () {
      return this.text?.replace(/ /g, '-')
    }
  }
})
</script>

<style scoped>
.naive-doc-title {
  display: flex;
}

.naive-doc-title .edit-button {
  margin-left: 2px;
  display: inline-flex;
  align-items: center;
}
</style>
