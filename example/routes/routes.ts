const componentRoutes = [
  {
    path: 'relief-button',
    name: 'relief-button',
    component: async () =>
      await import('../../packages/src/button/demo/index.demo-entry.md')
  },
  {
    path: 'clock',
    name: 'clock',
    component: async () =>
      await import('../../packages/src/clock/demo/index.demo-entry.md')
  }
]

const routes = [
  {
    name: 'home',
    path: '/',
    component: async () => await import('../pages/index.vue')
  },
  {
    name: 'components',
    path: '/components',
    component: async () => await import('../layout/BasicLayout.vue'),
    children: componentRoutes
  },
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'home',
      params: {
        lang: navigator.language === 'zh-CN' ? 'zh-CN' : 'en-US',
        theme: 'os-theme'
      }
    }
  }
]

export default routes
