import type { Directive } from 'vue'

/**
 * v-copy 指令取值类型
 * - string：复制固定文本
 * - () => string：动态返回复制内容
 * - 对象：可配置 text、success、error 回调
 */
export type CopyValue =
  | string
  | (() => string)
  | {
      /** 要复制的文本，支持字符串或函数 */
      text?: string | (() => string)
      /** 复制成功回调 */
      success?: (text: string) => void
      /** 复制失败回调 */
      error?: (err: Error) => void
    }

export type CopyElement = HTMLElement & {
  _copyHandler?: (event: MouseEvent) => void
  _copyValue?: CopyValue
}

/**
 * 实际写入剪贴板的工具函数
 * 优先使用 navigator.clipboard，不安全上下文下回退到 execCommand
 */
async function writeText(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text)
    return
  }
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.top = '-9999px'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  try {
    if (!document.execCommand('copy')) {
      throw new Error('execCommand copy failed')
    }
  } finally {
    document.body.removeChild(textarea)
  }
}

/** 解析绑定值得到实际待复制的文本 */
function resolveText(value: CopyValue | undefined, el: HTMLElement): string {
  if (value == null) return el.textContent || ''
  if (typeof value === 'string') return value
  if (typeof value === 'function') return value()
  const text = value.text
  if (typeof text === 'function') return text()
  if (typeof text === 'string') return text
  return el.textContent || ''
}

/** 是否为对象形式（含回调） */
function isObjectValue(value: CopyValue | undefined): value is {
  text?: string | (() => string)
  success?: (text: string) => void
  error?: (err: Error) => void
} {
  return (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    typeof value !== 'function'
  )
}

/**
 * v-copy：点击元素一键复制内容
 *
 * 用法：
 *   <button v-copy="'Hello'">复制</button>
 *   <button v-copy="() => textRef.value">复制动态文本</button>
 *   <button v-copy="{ text: 'Hello', success: () => ElMessage.success('已复制') }">复制</button>
 *   <button v-copy>复制当前元素文本</button>
 */
export const vCopy: Directive<CopyElement, CopyValue> = {
  mounted(el, binding) {
    el._copyValue = binding.value
    el._copyHandler = async () => {
      const value = el._copyValue
      const callbacks = isObjectValue(value)
        ? { success: value.success, error: value.error }
        : {}
      try {
        const text = resolveText(value, el)
        await writeText(text)
        callbacks.success?.(text)
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err))
        callbacks.error?.(error)
      }
    }
    el.addEventListener('click', el._copyHandler)
  },
  updated(el, binding) {
    el._copyValue = binding.value
  },
  unmounted(el) {
    if (el._copyHandler) {
      el.removeEventListener('click', el._copyHandler)
    }
    el._copyHandler = undefined
    el._copyValue = undefined
  },
}
