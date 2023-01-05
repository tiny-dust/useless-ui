import { marked } from 'marked'

const resolveDemoInfos = (code, relativeDir, env) => {}

const genDemosTemplate = (demosInfos, colSpan) => {}

const mdToDoc = (code, relativeDir, env = 'development') => {
  const colSpan = ~code.search('<!--single-column-->') ? 1 : 2
  const hasApi = !!~code.search('## API')
  console.log('13-「md-render」', hasApi)

  // 解析md 详情请看文档 https://marked.js.org/using_pro#lexer
  const mdLayer = marked.lexer(code)
  // 获取组件的代码  比如md文件中引入了一些第三方的组件  就使用这里的代码
  const componentsIndex = mdLayer.findIndex(
    (item) => item.type === 'code' && item.lang === 'component'
  )
  let components = []
  if (~componentsIndex) {
    // mdLayer[componentsIndex].text : NButton: import { Button } from 'naive-ui'
    components = mdLayer[componentsIndex].text
      .split('\n')
      .map((component) => {
        console.log('23-「md-render」', components)
        const [compName, importCode] = component.split(':')
        if (!compName.trim()) throw new Error('没有组件名')
        if (!importCode.trim()) throw new Error('没有组件资源地址')
        return {
          compName: compName.split(',').map((item) => item.trim()),
          importCode
        }
      })
      .filter(({ compName, importCode }) => compName && importCode) // 过滤掉空的
  }

  // 处理标题  并添加在github中编辑的功能
  const titleIndex = mdLayer.findIndex(
    (item) => item.type === 'heading' && item.depth === 1
  )
  if (~titleIndex) {
    const title = mdLayer[titleIndex].text
    const btnTemplate = `<edit-on-github-header relative-url="${relativeDir}" text=${title}></edit-on-github-header>`
    mdLayer.splice(titleIndex, 1, {
      type: 'html',
      pre: false,
      text: btnTemplate
    })
  }

  // 处理demo 并移除在生产中的打包构建
  const demoIndex = mdLayer.findIndex(
    (item) => item.type === 'code' && item.lang === 'demo'
  )
  let demoInfos = []
  if (~demoIndex) {
    demoInfos = resolveDemoInfos(code, relativeDir, env)
    console.log('45-「md-render」', demoInfos)
    mdLayer.splice(demoIndex, 1, {
      type: 'html',
      pre: false,
      text: genDemosTemplate(demoInfos, colSpan)
    })
  }

  return `
    <template>
      <div class="doc">
        hello world
      </div>
    </template>
  `
}

export default mdToDoc
