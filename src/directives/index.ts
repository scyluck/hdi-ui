import type { App } from 'vue'
import { vClickOutside } from './click-outside'
import { vCopy } from './copy'
import { vDebounce } from './debounce'
import { vEllipsis } from './ellipsis'
import { vFocus } from './focus'
import { vPermission } from './permission'
import { vThrottle } from './throttle'

export { vClickOutside } from './click-outside'
export type { ClickOutsideElement } from './click-outside'

export { vCopy } from './copy'
export type { CopyValue, CopyElement } from './copy'

export { vDebounce } from './debounce'
export type { DebounceOptions, DebounceValue, DebounceElement } from './debounce'

export { vEllipsis } from './ellipsis'
export type { EllipsisOptions, EllipsisValue, EllipsisElement } from './ellipsis'

export { vFocus } from './focus'
export type { FocusValue, FocusElement } from './focus'

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

export { vThrottle } from './throttle'
export type { ThrottleOptions, ThrottleValue, ThrottleElement } from './throttle'

/**
 * 注册全部全局指令
 * - v-click-outside
 * - v-copy
 * - v-debounce
 * - v-ellipsis
 * - v-focus
 * - v-permission
 * - v-throttle
 */
export function registerDirectives(app: App) {
  app.directive('click-outside', vClickOutside)
  app.directive('copy', vCopy)
  app.directive('debounce', vDebounce)
  app.directive('ellipsis', vEllipsis)
  app.directive('focus', vFocus)
  app.directive('permission', vPermission)
  app.directive('throttle', vThrottle)
}
