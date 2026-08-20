import type { App } from 'vue'
import { vClickOutside } from './click-outside'
import { vCopy } from './copy'
import { vDebounce } from './debounce'
import { vPermission } from './permission'

export { vClickOutside } from './click-outside'
export type { ClickOutsideElement } from './click-outside'

export { vCopy } from './copy'
export type { CopyValue, CopyElement } from './copy'

export { vDebounce } from './debounce'
export type { DebounceOptions, DebounceValue, DebounceElement } from './debounce'

export {
  vPermission,
  setPermissions,
  getPermissions,
  setPermissionUtils,
  clearPermissionUtils,
  hasPermission,
} from './permission'
export type {
  PermissionChecker,
  PermissionMode,
  PermissionValue,
  PermissionElement,
} from './permission'

/**
 * 注册全部全局指令
 * - v-click-outside
 * - v-copy
 * - v-debounce
 * - v-permission
 */
export function registerDirectives(app: App) {
  app.directive('click-outside', vClickOutside)
  app.directive('copy', vCopy)
  app.directive('debounce', vDebounce)
  app.directive('permission', vPermission)
}
