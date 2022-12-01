<script lang="ts">
  import "./index.css";
  import Router from "svelte-spa-router";
  import Layout from "./layout/index.svelte";
  import { routes } from "./router";
</script>

<div>
  <Layout />
  <Router {routes}  />
</div>
