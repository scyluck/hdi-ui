import type { Directive, DirectiveBinding } from 'vue'

/**
 * 权限指令模块
 *
 * 业务项目在登录拿到权限 code 列表后，直接调用：
 *   import { setPermissions } from 'hdi-ui'
 *   setPermissions(['user:add', 'user:edit', ...])
 *
 * 内置 has / hasAll / hasAny / hasNone 四种判断逻辑，业务无需再手动实现。
 *
 * 如果需要完全自定义权限判断逻辑（如从后端接口实时校验），
 * 仍可通过 setPermissionUtils({ has, hasAll, ... }) 覆盖内置实现。
 */

export type PermissionChecker = (value: string | string[]) => boolean
export type PermissionMode = 'all' | 'any' | 'none'
export type PermissionValue = string | string[]

export type PermissionElement = HTMLElement & {
  _permissionPlaceholder?: Comment
}

const store: {
  /** 用户拥有的权限 code 集合 */
  codes: Set<string>
  /** 自定义 checker（覆盖内置实现） */
  utils: Record<string, PermissionChecker>
} = {
  codes: new Set(),
  utils: {},
}

/**
 * 设置用户拥有的权限 code 列表（推荐用法）
 * 传入登录后获取的全部权限 code，内部会自动完成 has/hasAll/hasAny/hasNone 判断。
 *
 * @param codes 权限 code 数组或用分隔符拼接的字符串
 * @param separator 分隔符，codes 为字符串时生效，默认按 ,; \t\n\r 切分
 */
export function setPermissions(
  codes: string[] | readonly string[] | Set<string> | string,
  separator?: string | RegExp,
) {
  if (Array.isArray(codes)) {
    store.codes = new Set(codes.filter((c) => c && typeof c === 'string') as string[])
  } else if (codes instanceof Set) {
    store.codes = new Set([...codes].filter((c) => typeof c === 'string' && c) as string[])
  } else if (typeof codes === 'string') {
    const sep = separator || /[,;\s\u3000]+/
    store.codes = new Set(codes.split(sep).filter((c) => c))
  } else {
    store.codes = new Set()
  }
}

/**
 * 获取当前已设置的权限 code 列表
 */
export function getPermissions(): string[] {
  return [...store.codes]
}

/**
 * 设置自定义权限检查工具（高级用法，默认无需调用）
 * 传入的 checker 会覆盖同名的内置判断逻辑。
 * 例如 setPermissionUtils({ has: (v) => ... }) 即可覆盖内置 has 判断。
 */
export function setPermissionUtils(utils: Partial<Record<'has' | 'hasAll' | 'hasAny' | 'hasNone', PermissionChecker>>) {
  store.utils = { ...store.utils, ...utils }
}

/**
 * 清除所有权限配置（权限 code 和自定义 checker）
 */
export function clearPermissionUtils() {
  store.codes = new Set()
  store.utils = {}
}

/** 内置单个权限判断：code 是否在集合中 */
const builtinHas = (v: string | string[]): boolean => {
  const codes = Array.isArray(v) ? v : [v]
  return codes.every((c) => store.codes.has(c))
}

/**
 * 权限校验公共 API
 * 供指令与 HdiPermission 包装组件复用，业务侧也可直接调用
 * @param value 权限标识（单个或数组）
 * @param mode all=必须全部拥有（默认） / any=任一拥有 / none=必须都不包含
 */
export function hasPermission(value: PermissionValue, mode: PermissionMode = 'all'): boolean {
  return checkPermission(value, mode)
}

/**
 * 内部统一校验入口
 *
 * 判断优先级：
 * 1. 业务通过 setPermissionUtils 自定义的 checker（若存在）
 * 2. 基于 setPermissions 设置的 code 集合的内置判断
 * 3. 默认通过（未调用 setPermissions 时视为「权限未启用」，放行）
 */
function checkPermission(value: PermissionValue, mode: PermissionMode): boolean {
  const values = Array.isArray(value) ? value : [value]

  const has = store.utils.has || builtinHas
  const codesIsEmpty = store.codes.size === 0
  const hasCustom = !!store.utils.has

  // 未调用 setPermissions 且无自定义 checker → 默认放行
  if (codesIsEmpty && !hasCustom) return true

  if (mode === 'all') {
    if (store.utils.hasAll) return store.utils.hasAll(values)
    return values.every((v) => has(v))
  }
  if (mode === 'any') {
    if (store.utils.hasAny) return store.utils.hasAny(values)
    return values.some((v) => has(v))
  }
  // none
  if (store.utils.hasNone) return store.utils.hasNone(values)
  return !values.some((v) => has(v))
}

/** 根据修饰符解析权限模式 */
function resolveMode(modifiers: Partial<Record<string, boolean>>): PermissionMode {
  if (modifiers.any) return 'any'
  if (modifiers.not) return 'none'
  return 'all' // 默认与 .all 均走 all
}

const FORM_TAGS = new Set(['BUTTON', 'INPUT', 'TEXTAREA', 'SELECT', 'OPTION', 'FIELDSET'])

function isFormElement(el: HTMLElement): boolean {
  return FORM_TAGS.has(el.tagName)
}

/** disable 模式：保留元素但禁用 */
function applyDisabled(el: HTMLElement) {
  if (isFormElement(el)) {
    el.setAttribute('disabled', '')
  }
  el.setAttribute('aria-disabled', 'true')
  el.classList.add('hdi-permission-disabled')
  el.style.pointerEvents = 'none'
}

function clearDisabled(el: HTMLElement) {
  el.removeAttribute('disabled')
  el.removeAttribute('aria-disabled')
  el.classList.remove('hdi-permission-disabled')
  el.style.pointerEvents = ''
}

/** 默认模式：将元素替换为注释占位，保留引用以便恢复 */
function hideElement(el: PermissionElement) {
  if (el._permissionPlaceholder) return
  const comment = document.createComment('v-permission')
  el._permissionPlaceholder = comment
  el.replaceWith(comment)
}

function showElement(el: PermissionElement) {
  if (el._permissionPlaceholder) {
    el._permissionPlaceholder.replaceWith(el)
    el._permissionPlaceholder = undefined
  }
}

function applyPermission(el: PermissionElement, binding: DirectiveBinding<PermissionValue>) {
  const mode = resolveMode(binding.modifiers)
  const disableMode = !!binding.modifiers.disable
  const allowed = checkPermission(binding.value, mode)

  if (allowed) {
    if (disableMode) {
      clearDisabled(el)
    } else {
      showElement(el)
    }
  } else {
    if (disableMode) {
      applyDisabled(el)
    } else {
      hideElement(el)
    }
  }
}

/**
 * v-permission：权限控制指令
 *
 * 用法：
 *   v-permission="'add'"                          // 单权限：必须拥有
 *   v-permission="['add', 'edit']"                // 多权限：必须全部拥有（默认 all）
 *   v-permission.any="['add', 'edit']"            // 任意一个即可
 *   v-permission.all="['add', 'edit']"            // 显式声明全部拥有
 *   v-permission.not="['add', 'edit']"            // 必须都不包含其中任一
 *   v-permission.disable="'add'"                  // 无权限时禁用而非移除
 *   v-permission.any.disable="['add', 'edit']"    // 任意权限 + 禁用模式
 */
export const vPermission: Directive<PermissionElement, PermissionValue> = {
  mounted(el, binding) {
    applyPermission(el, binding)
  },
  updated(el, binding) {
    applyPermission(el, binding)
  },
  unmounted(el) {
    el._permissionPlaceholder = undefined
  },
}
