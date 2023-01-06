const routes = [
  {
    path: '/button',
    name: 'relief-button',
    component: async () =>
      await import('../../packages/src/button/demo/index.demo-entry.md')
  }
]

export default routes
