import type { Directive } from 'vue'

/**
 * v-throttle 指令对象形式配置
 */
export interface ThrottleOptions {
  /** 节流触发回调（必填） */
  handler: (...args: unknown[]) => void
  /** 节流窗口毫秒数，默认 300 */
  delay?: number
  /** 监听的事件名，默认 'click' */
  event?: string
  /** 是否在节流周期开始时立即触发一次，默认 true */
  leading?: boolean
  /** 是否在节流周期结束后触发尾部回调，默认 true */
  trailing?: boolean
}

export type ThrottleValue = ((...args: unknown[]) => void) | ThrottleOptions

export type ThrottleElement = HTMLElement & {
  _throttleConfig?: Required<Omit<ThrottleOptions, 'delay'>> & { delay: number }
  _throttleHandler?: (...args: unknown[]) => void
  _throttleTimer?: ReturnType<typeof setTimeout> | null
  _throttleLastArgs?: unknown[]
  /** 标记本周期内是否有新调用（用于 trailing 判断） */
  _throttleHasNewCall?: boolean
}

/** 默认配置 — 与 lodash throttle 语义一致：leading + trailing */
const DEFAULTS: Required<ThrottleOptions> = {
  handler: () => {},
  delay: 300,
  event: 'click',
  leading: true,
  trailing: true,
}

/** 控制类修饰符，不作为事件名 */
const MODIFIER_KEYS = new Set(['leading', 'trailing'])

/**
 * 将绑定值与修饰符合并为最终配置
 */
function resolveConfig(
  value: ThrottleValue,
  arg: string | undefined,
  modifiers: Partial<Record<string, boolean>>,
): Required<ThrottleOptions> {
  const fromValue: ThrottleOptions =
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
 * v-throttle：节流指令
 *
 * 在一个时间窗口内，频繁调用只按固定间隔触发。
 * 与 v-debounce 的区别：
 *   - debounce：等事件停下来后才触发（如输入联想）
 *   - throttle：按固定频率触发（如滚动监听、resize、拖拽）
 *
 * 用法：
 *   <button v-throttle="handleClick">按钮</button>                                  // 默认 300ms / click / leading+trailing
 *   <button v-throttle:500="handleClick">按钮</button>                              // 500ms 节流窗口
 *   <div v-throttle.scroll="handleScroll">滚动监听</div>                            // 监听 scroll 事件
 *   <div v-throttle:200.resize="onResize">窗口尺寸</div>                           // 200ms / resize
 *   <button v-throttle.trailing="handleClick">按钮</button>                        // 仅尾部触发
 *   <button v-throttle.leading="handleClick">按钮</button>                         // 仅头部触发（每 300ms 首次点击立即响应）
 *   <button v-throttle="{ handler: handleClick, delay: 16, event: 'mousemove' }">  // 对象形式（16ms ≈ 60fps）
 *         拖拽中
 *   </button>
 */
export const vThrottle: Directive<ThrottleElement, ThrottleValue> = {
  mounted(el, binding) {
    const config = resolveConfig(binding.value, binding.arg, binding.modifiers)
    el._throttleConfig = config

    el._throttleHandler = (...args: unknown[]) => {
      const isFresh = el._throttleTimer === null || el._throttleTimer === undefined

      if (isFresh) {
        // 进入新的节流周期
        el._throttleHasNewCall = false
        el._throttleLastArgs = args
        if (config.leading) {
          config.handler(...args)
        } else {
          el._throttleHasNewCall = true
        }

        el._throttleTimer = setTimeout(() => {
          el._throttleTimer = null
          const hadNewCall = el._throttleHasNewCall
          el._throttleHasNewCall = false
          if (config.trailing && hadNewCall) {
            config.handler(...(el._throttleLastArgs || []))
          }
        }, config.delay)
      } else {
        // 仍在节流周期内：记录最后一次参数，标记有新调用
        el._throttleHasNewCall = true
        el._throttleLastArgs = args
      }
    }

    el.addEventListener(config.event, el._throttleHandler)
  },
  unmounted(el) {
    const config = el._throttleConfig
    if (config && el._throttleHandler) {
      el.removeEventListener(config.event, el._throttleHandler)
    }
    if (el._throttleTimer) {
      clearTimeout(el._throttleTimer)
      el._throttleTimer = null
    }
    el._throttleHandler = undefined
    el._throttleConfig = undefined
    el._throttleLastArgs = undefined
    el._throttleHasNewCall = undefined
  },
}
