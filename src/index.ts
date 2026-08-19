import type { App } from 'vue'
import { HdiIcon, IconBase } from './components/Icon'
import { HdiDictionary } from './components/Dictionary'
import { HdiForm } from './components/Form'
import { HdiFormDialog } from './components/FormDialog'
import { HdiTable } from './components/Table'
import { registerDirectives } from './directives'
import * as utils from './utils'

export { HdiIcon, IconBase, HdiDictionary, HdiForm, HdiFormDialog, HdiTable }
export type { IconProps } from './components/Icon'
export * from './components/Dictionary'
export * from './components/Form'
export * from './components/FormDialog'
export * from './components/Table'
export * from './icons'
export * from './directives'
export * from './utils'

export interface HdiUiInstallOptions {
  /** 是否注册全局指令，默认 true */
  registerDirectives?: boolean
}

function install(app: App, options: HdiUiInstallOptions = {}) {
  app.component('HdiIcon', HdiIcon)
  app.component('IconBase', IconBase)
  app.component('HdiDictionary', HdiDictionary)
  app.component('HdiForm', HdiForm)
  app.component('HdiFormDialog', HdiFormDialog)
  app.component('HdiTable', HdiTable)

  if (options.registerDirectives !== false) {
    registerDirectives(app)
  }
}

export default {
  install,
  version: '0.1.0',
}

export { install, utils }
