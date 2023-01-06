import { marked } from 'marked'
import fse from 'fs-extra'
import path from 'path'
import createRender from './md-render'
import projectPath from './project-path'

const mdRenderer = createRender()

const cameLCase = (str) => {
  // 将 - . 小驼峰转换成首字母大写的大驼峰
  return str
    .replace(/-([a-z])/g, (all, letter) => {
      return letter.toUpperCase()
    })
    .replace(/\.([a-z])/g, (all, letter) => {
      return letter.toUpperCase()
    })
    .replace(/^[a-z]/, (s) => {
      return s.toUpperCase()
    })
}

// 生成锚点
const genDemosApiAnchorTemplate = (mdLayer) => {
  const api = [
    {
      id: 'API',
      title: 'API',
      debug: false
    }
  ]
  // 过滤出所有的h3标签
  return api.concat(
    mdLayer
      .filter((md) => md.type === 'heading' && md.depth === 3)
      .map((md) => ({
        id: md.text.replace(/ /g, '-'),
        title: md.text,
        debug: false
      }))
  )
}

// 生成锚点的父级组件  将子组件包裹起来
function genAnchorTemplate (
  children,
  options = {
    ignoreGap: false
  }
) {
  return `
    <n-anchor
      internal-scrollable
      :bound="16"
      type="block"
      style="width: 192px; position: sticky; top: 32px; max-height: calc(100vh - 32px - 64px); height: auto;"
      offset-target="#doc-layout"
      :ignore-gap="${options.ignoreGap}"
    >
      ${children}
    </n-anchor>
  `
}

// 生成文档页的锚点，快速定位到对应的位置 详情看naive的anchor文档： https://www.naiveui.com/zh-CN/os-theme/components/anchor
const genDemosAnchorTemplate = (demoInfos, hasApi, mdLayer) => {
  // 如果有api，就将api的锚点放在最后 否则就放在第一个
  const links = // 将demos的锚点和md文档中的h3标签的锚点合并
  (
    hasApi ? demoInfos.concat(genDemosApiAnchorTemplate(mdLayer)) : demoInfos
  ).map(
    ({ id, title, debug }) => `<n-anchor-link
      v-if="(displayMode === 'debug') || ${!debug}"
      title="${title}"
      href="#${id}"
    />`
  )

  return genAnchorTemplate(links.join('\n'), {
    ignoreGap: hasApi
  })
}

// 将非组件说明文档的md文件进行转换
const genPageAnchorTemplate = (mdLayer) => {
  const titles = mdLayer
    .filter((md) => md.type === 'heading' && md.depth === 2)
    .map((md) => md.title)
  // 将标题转换成锚点
  const links = titles.map((title, index) => {
    const href = title.replace(/ /g, '-')
    return `<n-anchor-link title="${title}" href="#${href}" />`
  })
  return genAnchorTemplate(links.join('\n'), { ignoreGap: true })
}

// 获取每个demo.vue中  <markdown> 标签中的 # xxx  作为demo的标题
const resolveDemoTitle = async (fileName, relativeDir) => {
  const demoStr = await fse.readFile(
    path.resolve(projectPath, relativeDir, '..', fileName),
    'utf-8'
  )
  return demoStr.match(/# ([^\n]+)/)[1]
}

// 处理每一个demo.vue文件  将其转换成组件 比如 basic.demo.vue  转换成 <BasicDemo />
const resolveDemoInfos = async (demoInfos, relativeDir, env) => {
  const demoStr = demoInfos
    .split('\n')
    .map((item) => item.trim())
    .filter((id) => id.length)
  const demos = []
  // 处理md文件中的demo文件名 保持和真实文件名一致
  for (const demo of demoStr) {
    const debug = demo.includes('debug') || demo.includes('Debug')
    if (env === 'production' && debug) continue
    let fileName
    if (demo.includes('.vue')) {
      fileName = demo.slice(0, -4) + '.demo.vue'
    } else {
      fileName = demo + '.demo.vue'
    }
    const componentName = `${cameLCase(demo)}Demo`
    demos.push({
      id: demo,
      variable: componentName,
      fileName,
      title: await resolveDemoTitle(fileName, relativeDir),
      tag: `<${componentName} />`,
      debug
    })
  }
  return demos
}

const genDemosTemplate = (demosInfos, colSpan) => {
  return `<component-demos :span="${colSpan}">${demosInfos
    .map(({ tag }) => tag)
    .join('\n')}</component-demos>`
}
/**
 * 生成vue3的script部分
 * @param {Array} demosInfos demo.vue的集合
 * @param {*} components 转换后的组件
 * @param {*} relativeDir 所在的相对路径
 * @param {*} forceShowAnchor 是否显示锚点
 */
const genDocScript = (demoInfos, components, relativeDir, forceShowAnchor) => {
  const showAnchor = demoInfos.length > 1 || forceShowAnchor
  // 生成import语句
  const importStmts = demoInfos
    .map(({ variable, fileName }) => {
      return `import ${variable} from './${fileName}'`
    })
    .concat(components.map(({ importStmts }) => importStmts))
    .join('\n')
  // 生成components语句
  // const componentsStmts = demoInfos.map(({ variable }) => {
  //   return `${variable}`
  // }).concat(components.map(({ compName }) => compName).flat()).join(',\n') // flat() 方法创建一个新数组，它将数组中的元素连接起来，最多只能连接到指定的深度。
  const script = `
  <script setup>
    ${importStmts}
    import { computed } from 'vue'
    import { useMemo } from 'vooks'
    import { useIsMobile } from '/example/utils/composables'

    const isMobileRef = useIsMobile()
    const showAnchor = useMemo(() => {
      if (isMobileRef.value) return false
      return ${showAnchor}
    })
    const useSmallPaddingRef = isMobileRef
    const displayMode = false
    const wrapperStyle = computed(() => {
      return !useSmallPaddingRef.value
            ? 'display: flex; flex-wrap: nowrap; padding: 32px 24px 56px 56px;'
            : 'padding: 16px 16px 24px 16px;'
    })
    const contentStyle = 'width: calc(100% - 228px); margin-right: 36px;'
    const  url = ${JSON.stringify(relativeDir)}
  </script>`
  return script
}

const mdToDoc = async (code, relativeDir, env = 'development') => {
  const colSpan = ~code.search('<!--single-column-->') ? 1 : 2
  const forceShowAnchor = ~code.search('<!--anchor:on-->')
  const hasApi = !!~code.search('## API')

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
    demoInfos = await resolveDemoInfos(
      mdLayer[demoIndex].text,
      relativeDir,
      env
    )
    mdLayer.splice(demoIndex, 1, {
      type: 'html',
      pre: false,
      text: genDemosTemplate(demoInfos, colSpan)
    })
  }

  const docMainTemplate = marked.parser(mdLayer, {
    renderer: mdRenderer,
    gfm: true
  })
  // 生成文档的模板
  const docTemplate = `
    <template>
      <div
        class="doc"
        :style="wrapperStyle"
      >
        <div :style="contentStyle">
          ${docMainTemplate}
        </div>
        <div style="width: 192px;" v-if="showAnchor">
          ${
            demoInfos.length
              ? genDemosAnchorTemplate(demoInfos, hasApi, mdLayer)
              : genPageAnchorTemplate(mdLayer)
          }
        </div>
      </div>
    </template>`
  const docScript = await genDocScript(
    demoInfos,
    components,
    relativeDir,
    forceShowAnchor
  )
  return `${docTemplate}\n\n${docScript}`
}

export default mdToDoc
