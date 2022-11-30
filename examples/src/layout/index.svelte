<script lang="ts">
  import Router from "svelte-spa-router";
  import { ComponentsRoutes } from "../router";
</script>

  <div class="w-layout">
    <div class="w-menu">
      <side />
    </div>
    <div class="w-main">
      <div class="w-header">
        <header />
      </div>
      <div class="w-content">
      <Router routes={ComponentsRoutes} />
      </div>
      <div class="w-footer">
        <footer />
      </div>
    </div>
  </div>
