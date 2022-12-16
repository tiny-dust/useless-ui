/**
 * 将所有组件增加上install方法
 */

import { App } from "vue"
import version from "./version"

type ComponentType = any

interface IUiCreateOptions {
  components?: ComponentType[]
  componentPrefix?: string
}
export interface IUiInstance {
  version: string
  componentPrefix: string
  install: ( app: App ) => void
}

export const create = ( { componentPrefix = 'U', components = [] }: IUiCreateOptions = {} ): IUiInstance => {
  const installTarget: App[] = []

  function registerComponent ( app: App, name: string, component: ComponentType ): void {
    const register = app.component( componentPrefix + name )
    if ( !register ) {
      app.component( componentPrefix + name, component )
    }
  }

  function install ( app: App ): void {
    // 避免重复安装
    if ( installTarget.includes( app ) ) return
    installTarget.push( app )
    // 注册组件
    components.forEach( ( component ) => {
      const { name, alias } = component
      registerComponent( app, name, component )
      // 注册别名
      if ( alias ) {
        alias.forEach( ( aliasName: string ) => {
          registerComponent( app, aliasName, component )
        })
      }
    })
  }



  return {
    version,
    componentPrefix,
    install
  }
}

export default create
