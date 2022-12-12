<script lang="ts">
  import "../style/index.less";
  let header = "";
  let content = "";
</script>

<template>
  <div class="w-card">
    <div class="w-card-header">
      {header}
      {#if !header}
        <slot name="header" />
      {/if}
    </div>
    <div class="w-card-content">
      {content}
      {#if !content}
        <slot name="content" />
      {/if}
    </div>
    <div class="w-card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
