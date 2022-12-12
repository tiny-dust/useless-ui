import { wrap } from "svelte-spa-router/wrap";

export const routes = {
  "/button": wrap({
    asyncComponent: () => import("../pages/button/index.svelte"),
  }),
  "/card": wrap({
    asyncComponent: () => import("../pages/card/index.svelte"),
  }),
};
