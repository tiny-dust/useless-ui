const routes = [
  {
    path: '/button',
    name: 'relief-button',
    component: () =>
      import('../../packages/src/button/demo/index.demo-entry.md')
  }
]

export default routes
