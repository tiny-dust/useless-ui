import mdToDoc from './md-to-doc'
import projectPath from './project-path'

const docLoader = (code, path) => {
  const env = process.env.NODE_ENV
  // 获取相对路径
  const relativeDir = path.replace(projectPath + '/', '')
  return mdToDoc(code, relativeDir, env)
}

export default docLoader
