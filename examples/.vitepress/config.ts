import wyNav from './nav'
import wySidebar from './sidebar'
import { defineConfig } from 'vitepress'

const config = defineConfig({
  title: 'Useless UI',
  description: '这只是我练手的库.',
  base: '/',
  markdown: {
    lineNumbers: true, //显示代码行数
  },
  head: [
    [ 'meta', { name: 'keywords', content: 'vue3, vitepress, useless-ui' } ],
    [ 'link', { rel: 'icon', href: '/favicon.ico' } ], //浏览器标签页图标
  ],
  lastUpdated: true, //以git提交的时间为更新时间
  themeConfig: {
    nav: wyNav, //导航栏配置
    sidebar: wySidebar, //侧边栏配置
    lastUpdatedText: '上次更新时间', //最后更新时间文本
    logo: "/useless-logo.svg", //导航栏左侧头像
    docFooter: { //上下篇文本
      prev: '上一篇',
      next: '下一篇'
    },
  }
})

export default config
