// const wyNav = require('./nav.js')
// const wySidebar = require('./sidebar.js')

module.exports = {
  title: 'Week UI',
  description: '这只是我练手的库.',
  author: "tiny", //作者
  base: '/', //根目录 如果您计划将站点部署到https://foo.github.io/bar/，那么您应该将base设置为“/bar/”
  markdown: {
    lineNumbers: true, //显示代码行数
  },
  lastUpdated: true, //以git提交的时间为更新时间
  themeConfig: {
    // nav: wyNav, //导航栏配置
    // sidebar: wySidebar, //侧边栏配置
    author: 'tiny',
    lastUpdatedText: '上次更新时间', //最后更新时间文本
    logo: "https://avatars.githubusercontent.com/u/118516853?s=400&u=5c4f119589365a8149372e37aca8d3aabc953a58&v=4", //导航栏左侧头像
    docFooter: { //上下篇文本
      prev: '上一篇',
      next: '下一篇'
    },
  }
}
