import docLoader from './utils/doc-loader'

const getTransformedVueSrc = async (code, path) => {
  // 解析demo.vue
  if (path.endsWith('.demo.md') || path.endsWith('.demo.vue')) {
    return code
  } else if (path.endsWith('.md')) {
    // 解析 入口的md文件
    return docLoader(code, path)
  }
}

export default getTransformedVueSrc
