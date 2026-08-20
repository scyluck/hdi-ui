import type { App } from 'vue'
import { HdiIcon, IconBase } from './components/Icon'
import { HdiDictionary } from './components/Dictionary'
import { HdiForm } from './components/Form'
import { HdiFormDialog } from './components/FormDialog'
import { HdiPermission } from './components/Permission'
import { HdiTable } from './components/Table'
import { HdiCardList } from './components/CardList'
import { installBusinessComponents } from './install-components'
import type { HdiUiInstallOptions } from './install-components'
import * as utils from './utils'

export { HdiIcon, IconBase, HdiDictionary, HdiForm, HdiFormDialog, HdiPermission, HdiTable, HdiCardList }
export type { IconProps } from './components/Icon'
export type { HdiUiInstallOptions } from './install-components'
export * from './components/Dictionary'
export * from './components/Form'
export * from './components/FormDialog'
export * from './components/Permission'
export * from './components/Table'
export * from './components/CardList'
export * from './icons'
export * from './directives'
export * from './utils'

function install(app: App, options: HdiUiInstallOptions = {}) {
  // 注册业务组件和指令（与 UMD 入口共用同一逻辑）
  installBusinessComponents(app, options)
}

export default {
  install,
  version: '0.1.0',
}

export { install, utils }
