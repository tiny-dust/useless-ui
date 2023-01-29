import { vueToDemo, mdToDemo } from './demo-render'
import projectPath from './project-path'

// demo文件解析
const demoLoader = (code, path, type) => {
  // 获取相对路径
  const relativeUrl = path.replace(projectPath + '/', '')

  if (type === 'vue') {
    return vueToDemo(code, {
      relativeUrl,
      resourcePath: path,
      isVue: true
    })
  }
  return mdToDemo(code, {
    relativeUrl,
    resourcePath: path,
    isVue: false
  })
}

export default demoLoader
