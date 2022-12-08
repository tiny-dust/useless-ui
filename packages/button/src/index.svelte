<script lang="ts">

  let type = "default"

  const calcClass = () => {
    return `w-button w-button-${type}`
  }
</script>

<button class={calcClass()}>
  <slot />
</button>
