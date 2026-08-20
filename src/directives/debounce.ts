import type { Directive } from 'vue'

/**
 * v-debounce 指令对象形式配置
 */
export interface DebounceOptions {
  /** 防抖触发回调（必填） */
  handler: (...args: unknown[]) => void
  /** 延迟毫秒数，默认 300 */
  delay?: number
  /** 监听的事件名，默认 'click' */
  event?: string
  /** 是否在防抖周期开始时立即触发一次，默认 false */
  leading?: boolean
  /** 是否在防抖周期结束时触发尾部回调，默认 true */
  trailing?: boolean
}

export type DebounceValue = ((...args: unknown[]) => void) | DebounceOptions

export type DebounceElement = HTMLElement & {
  _debounceConfig?: Required<Omit<DebounceOptions, 'delay'>> & { delay: number }
  _debounceHandler?: (...args: unknown[]) => void
  _debounceTimer?: ReturnType<typeof setTimeout> | null
  _debounceLastArgs?: unknown[]
  _debounceHasNewCall?: boolean
}

/** 默认配置 */
const DEFAULTS: Required<DebounceOptions> = {
  handler: () => {},
  delay: 300,
  event: 'click',
  leading: false,
  trailing: true,
}

/** 控制类修饰符，不作为事件名 */
const MODIFIER_KEYS = new Set(['leading', 'trailing'])

/**
 * 将绑定值与修饰符合并为最终配置
 */
function resolveConfig(
  value: DebounceValue,
  arg: string | undefined,
  modifiers: Partial<Record<string, boolean>>,
): Required<DebounceOptions> {
  const fromValue: DebounceOptions =
    typeof value === 'function' ? { handler: value } : value

  const eventFromModifier = Object.keys(modifiers).find((m) => !MODIFIER_KEYS.has(m))

  return {
    ...DEFAULTS,
    ...fromValue,
    delay: arg ? Number(arg) || fromValue.delay || DEFAULTS.delay : fromValue.delay || DEFAULTS.delay,
    event: eventFromModifier || fromValue.event || DEFAULTS.event,
    leading: fromValue.leading ?? modifiers.leading ?? DEFAULTS.leading,
    trailing: fromValue.trailing ?? modifiers.trailing ?? DEFAULTS.trailing,
  }
}

/**
 * v-debounce：防抖指令
 *
 * 用法：
 *   <button v-debounce="handleClick">按钮</button>                              // 默认 300ms / click / 尾部触发
 *   <button v-debounce:500="handleClick">按钮</button>                          // 500ms 防抖
 *   <button v-debounce.mousedown="handlePress">长按</button>                    // 监听 mousedown
 *   <button v-debounce:500.mousedown="handlePress">长按</button>                // 500ms / mousedown
 *   <button v-debounce.leading="handleClick">按钮</button>                      // 进入周期立即触发一次
 *   <button v-debounce:500.leading.trailing="handleClick">按钮</button>         // leading + trailing
 *   <button v-debounce="{ handler: handleClick, delay: 500, leading: true }">  // 对象形式
 *         按钮
 *   </button>
 */
export const vDebounce: Directive<DebounceElement, DebounceValue> = {
  mounted(el, binding) {
    const config = resolveConfig(binding.value, binding.arg, binding.modifiers)
    el._debounceConfig = config

    el._debounceHandler = (...args: unknown[]) => {
      const isFresh = el._debounceTimer === null || el._debounceTimer === undefined

      // 进入新周期：判断是否 leading 触发
      if (isFresh) {
        el._debounceHasNewCall = false
        if (config.leading) {
          config.handler(...args)
        }
      } else {
        el._debounceHasNewCall = true
      }

      el._debounceLastArgs = args

      if (el._debounceTimer) {
        clearTimeout(el._debounceTimer)
      }
      el._debounceTimer = setTimeout(() => {
        el._debounceTimer = null
        const hadNewCall = el._debounceHasNewCall
        el._debounceHasNewCall = false
        if (config.trailing && (!config.leading || hadNewCall)) {
          config.handler(...(el._debounceLastArgs || []))
        }
      }, config.delay)
    }

    el.addEventListener(config.event, el._debounceHandler)
  },
  unmounted(el) {
    const config = el._debounceConfig
    if (config && el._debounceHandler) {
      el.removeEventListener(config.event, el._debounceHandler)
    }
    if (el._debounceTimer) {
      clearTimeout(el._debounceTimer)
      el._debounceTimer = null
    }
    el._debounceHandler = undefined
    el._debounceConfig = undefined
    el._debounceLastArgs = undefined
    el._debounceHasNewCall = undefined
  },
}
