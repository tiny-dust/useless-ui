<script lang="ts">
  import "./index.less";
  import Router from "svelte-spa-router";
  import { routes } from "../router";
</script>

<div class="w-layout windi-flex ">
  <side class="w-menu" >
    <ul>
      <li ><a href="#/button">Button</a></li>
      <li> <a href="#/card">Card</a></li>
    </ul>
  </side>
  <div class="w-main">
    <header class="w-header" />
    <main class="w-content enter-y">
      <Router {routes} />
    </main>
    <footer class="w-footer" />
  </div>
</div>
