import { wrap } from "svelte-spa-router/wrap";

export const routes = {
  "/": wrap({
    asyncComponent: () => import("../pages/home.svelte"),
  }),
};

export const ComponentsRoutes = {
  "/button": wrap({
    asyncComponent: () => import("../pages/button/index.svelte"),
  }),
};
