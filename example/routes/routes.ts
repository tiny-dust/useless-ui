const componentRoutes = [
  {
    path: '/button',
    name: 'relief-button',
    component: async () =>
      await import('../../packages/src/button/demo/index.demo-entry.md')
  }
]

const routes = [
  {
    name: 'home',
    path: '/',
    component: async () => await import('../pages/index.vue')
  },
  ...componentRoutes
]

export default routes
