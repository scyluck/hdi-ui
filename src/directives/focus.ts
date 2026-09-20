import type { Directive } from 'vue'

/**
 * v-focus 指令绑定值类型
 * - boolean：true 聚焦 / false 失焦
 * - number：延迟多少毫秒后聚焦（mounted 时生效一次）
 * - string：内部选择器，在绑定元素的子元素中查找匹配的元素进行聚焦
 * - object：完整配置
 */
export type FocusValue =
  | boolean
  | number
  | string
  | {
      /** 是否聚焦（true 聚焦 / false 失焦），默认 true */
      auto?: boolean
      /** 延迟毫秒数，默认 0（立即聚焦） */
      delay?: number
      /** 选择器：在绑定元素内查找匹配元素进行聚焦（常用于父容器包裹实际输入框场景） */
      selector?: string
      /** 聚焦时是否同时选中全部文本（输入框场景），默认 false */
      select?: boolean
      /** 聚焦成功回调 */
      onFocus?: (el: HTMLElement) => void
      /** 失焦回调 */
      onBlur?: (el: HTMLElement) => void
    }

export type FocusElement = HTMLElement & {
  _focusTimer?: ReturnType<typeof setTimeout> | null
  _focusFrame?: number | null
  _focusConfig?: {
    selector?: string
    select?: boolean
    onFocus?: (el: HTMLElement) => void
    onBlur?: (el: HTMLElement) => void
  }
}

/**
 * 解析绑定值
 */
function resolveValue(
  value: FocusValue | undefined | null,
  modifiers: Partial<Record<string, boolean>>,
  arg: string | undefined,
): { auto: boolean; delay: number; selector?: string; select: boolean; onFocus?: (el: HTMLElement) => void; onBlur?: (el: HTMLElement) => void } {
  let auto = true
  let delay = 0
  let selector: string | undefined
  let select = !!modifiers.select
  let onFocus: ((el: HTMLElement) => void) | undefined
  let onBlur: ((el: HTMLElement) => void) | undefined

  if (value === true || value === false) {
    auto = value
  } else if (typeof value === 'number') {
    auto = true
    delay = value
  } else if (typeof value === 'string') {
    auto = true
    selector = value
  } else if (value && typeof value === 'object') {
    auto = value.auto !== false
    delay = value.delay || 0
    selector = value.selector
    select = value.select || select
    onFocus = value.onFocus
    onBlur = value.onBlur
  }

  // arg 形式 v-focus:input 作为 selector
  if (arg) {
    selector = arg
  }

  return { auto, delay, selector, select, onFocus, onBlur }
}

/**
 * 在绑定元素中找到实际要聚焦的元素
 */
function findTarget(el: HTMLElement, selector?: string): HTMLElement | null {
  if (selector) {
    const found = el.querySelector<HTMLElement>(selector)
    if (found) return found
  }
  // 默认：自身是可聚焦元素则用自身，否则在子元素里找第一个可聚焦的
  if (isFocusable(el)) return el
  return el.querySelector<HTMLElement>('input, textarea, select, button, [tabindex]:not([tabindex="-1"])')
}

/**
 * 简单判断元素是否可聚焦
 */
function isFocusable(el: HTMLElement): boolean {
  const tag = el.tagName.toLowerCase()
  if (tag === 'input' || tag === 'textarea' || tag === 'select' || tag === 'button') {
    return !(el as HTMLInputElement).disabled
  }
  const tabIndex = el.getAttribute('tabindex')
  return tabIndex !== null && tabIndex !== '-1'
}

/**
 * 执行聚焦
 */
function doFocus(host: FocusElement, target: HTMLElement) {
  try {
    target.focus()
    if (host._focusConfig?.select && 'select' in target && typeof (target as HTMLInputElement).select === 'function') {
      ;(target as HTMLInputElement).select()
    }
    host._focusConfig?.onFocus?.(target)
  } catch (e) {
    // 忽略隐藏元素等无法聚焦的情况
  }
}

/**
 * 执行失焦
 */
function doBlur(host: FocusElement, target: HTMLElement) {
  try {
    if (document.activeElement === target) {
      target.blur()
    }
    host._focusConfig?.onBlur?.(target)
  } catch (e) {
    // ignore
  }
}

function cancelPendingFocus(el: FocusElement) {
  if (el._focusTimer) {
    clearTimeout(el._focusTimer)
    el._focusTimer = null
  }
  if (el._focusFrame !== null && el._focusFrame !== undefined) {
    cancelAnimationFrame(el._focusFrame)
    el._focusFrame = null
  }
}

function scheduleFocus(el: FocusElement, target: HTMLElement, delay: number) {
  cancelPendingFocus(el)
  if (delay > 0) {
    el._focusTimer = setTimeout(() => {
      el._focusTimer = null
      if (el.isConnected) doFocus(el, target)
    }, delay)
    return
  }
  el._focusFrame = requestAnimationFrame(() => {
    el._focusFrame = null
    if (el.isConnected) doFocus(el, target)
  })
}

/**
 * v-focus：自动聚焦指令
 *
 * 用法：
 *   <input v-focus />                                                          // mounted 时立即聚焦
 *   <input v-focus.select />                                                   // 聚焦同时选中全部文本
 *   <div v-focus="inputRef.value ? true : false">...</div>                     // 条件聚焦（布尔值，响应式）
 *   <input v-focus="300" />                                                    // 延迟 300ms 聚焦（弹窗过渡结束后再聚焦的场景）
 *   <el-input v-focus="'.el-input__inner'" />                                  // 指定子选择器（Element Plus 输入框外层包裹场景）
 *   <el-input v-focus:input />                                                 // 同上，arg 形式（:input 等价于 selector='input'）
 *   <input v-focus="{ auto: shouldFocus, delay: 100, select: true }" />        // 对象形式完整配置
 */
export const vFocus: Directive<FocusElement, FocusValue> = {
  mounted(el, binding) {
    const { auto, delay, selector, select, onFocus, onBlur } = resolveValue(
      binding.value,
      binding.modifiers,
      binding.arg,
    )

    el._focusConfig = { selector, select, onFocus, onBlur }

    if (auto) {
      const target = findTarget(el, selector)
      if (!target) return

      // 下一帧聚焦，给 DOM 布局/显示留时间（如 v-if 刚渲染完的元素）
      scheduleFocus(el, target, delay)
    }
  },
  updated(el, binding) {
    // 仅当 auto 的布尔值真的发生变化，才触发聚焦/失焦切换
    // 避免每次组件更新都执行一次 focus（会打断用户正在输入的状态）
    const prev = binding.oldValue
    const curr = binding.value

    // 判断上一次和这一次的 auto 布尔值
    const resolveAuto = (v: FocusValue | undefined | null): boolean | undefined => {
      if (v === true || v === false) return v
      if (typeof v === 'number') return true
      if (typeof v === 'string') return true
      if (v && typeof v === 'object') return v.auto !== false
      // undefined / null：mounted 时的默认 true 不算进入 updated
      return undefined
    }

    const prevAuto = resolveAuto(prev)
    const currAuto = resolveAuto(curr)

    // 旧值是对象配置形式 → 更新 selector/select/回调配置
    const config = el._focusConfig
    if (config) {
      const { selector, select, onFocus, onBlur } = resolveValue(curr, binding.modifiers, binding.arg)
      config.selector = selector
      config.select = select
      config.onFocus = onFocus
      config.onBlur = onBlur
    }

    if (prevAuto === undefined || currAuto === undefined) return
    if (prevAuto === currAuto) return

    const target = findTarget(el, el._focusConfig?.selector)
    if (!target) return

    if (currAuto) {
      const { delay } = resolveValue(curr, binding.modifiers, binding.arg)
      scheduleFocus(el, target, delay)
    } else {
      cancelPendingFocus(el)
      doBlur(el, target)
    }
  },
  unmounted(el) {
    cancelPendingFocus(el)
    el._focusConfig = undefined
  },
}
