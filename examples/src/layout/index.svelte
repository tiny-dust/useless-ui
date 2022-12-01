<script lang="ts">
  import Router from "svelte-spa-router";
  import { ComponentsRoutes } from "../router";
</script>;

<div class="w-layout">
  <side class="w-menu" />
  <div class="w-main">
    <header class="w-header" />
    <main class="w-content">
      <Router routes={ComponentsRoutes} />
    </main>
    <footer class="w-footer" />
  </div>
</div>;
