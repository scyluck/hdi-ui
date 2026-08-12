/**
 * 全量 UMD 打包入口 - 供 HTML 页面通过 CDN 引入 Vue + Element Plus 后使用
 * 由 generate-icons.ts 自动生成，请勿手动修改
 *
 * UMD 全局变量 HdiUi 结构: { install, HdiIcon, HdiDictionary, HdiForm, HdiTable, Icon80Add, ... }
 * app.use(HdiUi) 会调用 install 注册全部组件和指令
 */
import type { App } from 'vue'
import { HdiIcon, IconBase } from './components/Icon'
import { HdiDictionary, provideDictionary, useDictionary } from './components/Dictionary'
import { HdiForm } from './components/Form'
import { HdiTable } from './components/Table'
import { registerDirectives, setPermissionUtils, clearPermissionUtils } from './directives'
import Icon80Add from './icons/components/Icon80Add.vue'
import Icon80Delete from './icons/components/Icon80Delete.vue'
import Icon80FolderAdd from './icons/components/Icon80FolderAdd.vue'

const components = {
  HdiIcon,
  IconBase,
  HdiDictionary,
  HdiForm,
  HdiTable,
  Icon80Add,
  Icon80Delete,
  Icon80FolderAdd,
}

export interface HdiUiInstallOptions {
  /** 是否注册全局指令，默认 true */
  registerDirectives?: boolean
}

function install(app: App, options: HdiUiInstallOptions = {}) {
  for (const [name, comp] of Object.entries(components)) {
    app.component(name, comp as never)
    // HTML CDN 场景下浏览器会把标签名转为小写，需注册全小写别名
    app.component(name.toLowerCase(), comp as never)
  }
  if (options.registerDirectives !== false) {
    registerDirectives(app)
  }
}

export {
  install,
  HdiIcon,
  IconBase,
  HdiDictionary,
  HdiForm,
  HdiTable,
  provideDictionary,
  useDictionary,
  setPermissionUtils,
  clearPermissionUtils,
  Icon80Add,
  Icon80Delete,
  Icon80FolderAdd,
}
