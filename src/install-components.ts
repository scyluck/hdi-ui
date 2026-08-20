/**
 * 业务组件注册模块（静态维护，不参与图标自动生成）
 *
 * 新增业务组件时只需在此文件添加 import 和 components 记录即可，
 * 无需修改 scripts/generate-icons.ts，不影响图标库打包。
 *
 * 该文件被以下入口引用：
 * - src/index.ts（按需引入入口）
 * - src/index.umd.ts（全量 UMD 入口，由 generate-icons.ts 生成）
 */
import type { App } from 'vue'
import { HdiIcon, IconBase } from './components/Icon'
import { HdiDictionary, provideDictionary, useDictionary } from './components/Dictionary'
import { HdiForm } from './components/Form'
import { HdiFormDialog } from './components/FormDialog'
import { HdiPermission } from './components/Permission'
import { HdiTable } from './components/Table'
import { HdiCardList } from './components/CardList'
import { registerDirectives, setPermissionUtils, clearPermissionUtils, hasPermission } from './directives'
import { toKebabName } from './utils/kebab'

export interface HdiUiInstallOptions {
  /** 是否注册全局指令，默认 true */
  registerDirectives?: boolean
}

/** 所有业务组件（不含图标组件，图标由 generate-icons.ts 动态生成） */
const businessComponents = {
  HdiIcon,
  IconBase,
  HdiDictionary,
  HdiForm,
  HdiFormDialog,
  HdiPermission,
  HdiTable,
  HdiCardList,
}

/**
 * 注册全部业务组件和指令
 * 图标组件的注册由生成的 index.umd.ts 单独处理，不在此函数中
 */
export function installBusinessComponents(app: App, options: HdiUiInstallOptions = {}) {
  for (const [name, comp] of Object.entries(businessComponents)) {
    app.component(name, comp as never)
    // HTML CDN 场景下浏览器用 kebab-case 标签名，需注册 kebab-case 别名
    app.component(toKebabName(name), comp as never)
  }
  if (options.registerDirectives !== false) {
    registerDirectives(app)
  }
}

export {
  HdiIcon,
  IconBase,
  HdiDictionary,
  HdiForm,
  HdiFormDialog,
  HdiPermission,
  HdiTable,
  HdiCardList,
  provideDictionary,
  useDictionary,
  setPermissionUtils,
  clearPermissionUtils,
  hasPermission,
}
