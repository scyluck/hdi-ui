/**
 * UMD 打包入口 - 供 HTML 页面通过 CDN 引入 Vue 后使用
 * 由 generate-icons.ts 自动生成，请勿手动修改
 *
 * UMD 全局变量 HdiIcons 结构: { install, IconBase, HdiIcon, Icon80Add, ... }
 * app.use(HdiIcons) 会调用 install 注册全部图标组件
 */
import type { App } from 'vue'
import IconBase from '../components/Icon/IconBase.vue'
import HdiIcon from '../components/Icon/Icon.vue'
import Icon80Add from './components/Icon80Add.vue'
import Icon80Delete from './components/Icon80Delete.vue'
import Icon80FolderAdd from './components/Icon80FolderAdd.vue'

const components = {
  IconBase,
  HdiIcon,
  Icon80Add,
  Icon80Delete,
  Icon80FolderAdd,
}

function install(app: App) {
  const toKebab = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
  for (const [name, comp] of Object.entries(components)) {
    app.component(name, comp as never)
    // HTML CDN 场景下浏览器用 kebab-case 标签名，需注册 kebab-case 别名
    app.component(toKebab(name), comp as never)
  }
}

export { install, IconBase, HdiIcon, Icon80Add, Icon80Delete, Icon80FolderAdd }
export type { IconProps } from '../components/Icon/types'
