import { marked } from 'marked'
import handleMergeCode from './handle-merge-code'
import createRender from './md-render'
import fs from 'fs'
import path from 'path'

const mdRenderer = createRender()
const __HTTP__ = process.env.NODE_ENV !== 'production' ? 'http' : 'https'
const demoBlock = fs
  .readFileSync(path.resolve(__dirname, 'ComponentDemoTemplate.vue'))
  .toString()
export const mdToDemo = () => {}

// 合并template、script、style、markdown等数据
const mergeParts = ({ parts, isVue }) => {
  const mergedParts = { ...parts }
  mergedParts.tsCode = ''
  mergedParts.jsCode = ''
  handleMergeCode({ parts, mergedParts, isVue })
  // encodeURIComponent 函数可把字符串作为 URI 组件进行编码。
  mergedParts.tsCode = encodeURIComponent(mergedParts.tsCode.trim())
  mergedParts.jsCode = encodeURIComponent(mergedParts.jsCode.trim())
  return mergedParts
}

// 获取demo.vue文件中的template、script、style、markdown等数据
function getPartsOfDemo (text) {
  // slot template
  const firstIndex = text.indexOf('<template>')
  let template = text.slice(firstIndex + 10)
  const lastIndex = template.lastIndexOf('</template>')
  template = template.slice(0, lastIndex)
  const script = text.match(/<script.*?>([\s\S]*?)<\/script>/)?.[1]?.trim()
  const style = text.match(/<style>([\s\S]*?)<\/style>/)?.[1]
  const markdownText = text
    .match(/<markdown>([\s\S]*?)<\/markdown>/)?.[1]
    ?.trim()
  const tokens = marked.lexer(markdownText)
  const contentTokens = []
  let title = ''
  for (const token of tokens) {
    if (token.type === 'heading' && token.depth === 1) {
      title = token.text
    } else {
      contentTokens.push(token)
    }
  }
  const languageType = text.includes('lang="ts"') ? 'ts' : 'js'
  return {
    template,
    script,
    style,
    title,
    content: marked.parser(contentTokens, {
      renderer: mdRenderer
    }),
    language: languageType
  }
}

// 获取文件名
function getFileName (resourcePath) {
  const dirs = resourcePath.split('/')
  const fileNameWithExtension = dirs[dirs.length - 1]
  return [fileNameWithExtension.split('.')[0], fileNameWithExtension]
}

const cssRuleRegex = /([^{}]*)(\{[^}]*\})/g
// 生成style标签
function genStyle (sourceStyle) {
  let match
  let matched = false
  const rules = []

  while ((match = cssRuleRegex.exec(sourceStyle)) !== null) {
    matched = true
    const selector = match[1]
    const body = match[2]
    rules.push(
      selector
        .split(',')
        .map((part) => `.demo-card__view ${part}, .naive-ui-doc ${part}`)
        .join(',') + body
    )
  }
  if (!matched) return null
  return '<style scoped>\n' + rules.join('\n') + '</style>'
}

const genVueComponent = (parts, fileName, relativeUrl) => {
  // 生成vue组件 自定义标签来占位替换
  const demoFileNameReg = /<!--DEMO_FILE_NAME-->/g
  const relativeUrlReg = /<!--URL-->/g
  const titleReg = /<!--TITLE_SLOT-->/g
  const contentReg = /<!--CONTENT_SLOT-->/
  const tsCodeReg = /<!--TS_CODE_SLOT-->/
  const jsCodeReg = /<!--JS_CODE_SLOT-->/
  const scriptReg = /<!--SCRIPT_SLOT-->/
  const styleReg = /<!--STYLE_SLOT-->/
  const demoReg = /<!--DEMO_SLOT-->/
  const languageTypeReg = /<!--LANGUAGE_TYPE_SLOT-->/
  let src = demoBlock
  src = src.replace(demoFileNameReg, fileName)
  src = src.replace(relativeUrlReg, relativeUrl)
  if (parts.content) {
    src = src.replace(contentReg, parts.content)
  }
  if (parts.title) {
    src = src.replace(titleReg, parts.title)
  }
  if (parts.tsCode) {
    src = src.replace(tsCodeReg, parts.tsCode)
  }
  if (parts.jsCode) {
    src = src.replace(jsCodeReg, parts.jsCode)
  }
  if (parts.script) {
    const startScriptTag =
      parts.language === 'ts' ? '<script lang="ts">\n' : '<script>\n'
    src = src.replace(scriptReg, startScriptTag + parts.script + '\n</script>')
  }
  if (parts.language) {
    src = src.replace(languageTypeReg, parts.language)
  }
  if (parts.style) {
    const style = genStyle(parts.style)
    if (style !== null) {
      src = src.replace(styleReg, style)
    }
  }
  if (parts.template) {
    src = src.replace(demoReg, parts.template)
  }
  if (/__HTTP__/.test(src)) {
    src = src.replace(/__HTTP__/g, __HTTP__)
  }
  return src.trim()
}

// 将非常规的demo.vue文件转换成vue组件
export const vueToDemo = (
  code,
  { resourcePath, relativeUrl, isVue = true }
) => {
  const parts = getPartsOfDemo(code)
  const mergedParts = mergeParts({ parts, isVue })
  const [fileName] = getFileName(resourcePath)
  const vueComponent = genVueComponent(mergedParts, fileName, relativeUrl)
  return vueComponent
}
