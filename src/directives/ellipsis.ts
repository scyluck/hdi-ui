import type { Directive } from 'vue'

/**
 * v-ellipsis 指令对象形式配置
 */
export interface EllipsisOptions {
  /** 省略行数，默认 1（单行省略）；传入 0 / 负数视为 1 */
  lines?: number
  /** 悬停时是否显示全文（true=自动加 title，false=不加），默认 true */
  tooltip?: boolean
  /** 显式指定用于悬停显示的全文（不传则取元素 textContent） */
  text?: string
}

export type EllipsisValue = number | string | EllipsisOptions | undefined | null

export type EllipsisElement = HTMLElement & {
  _ellipsisConfig?: Required<EllipsisOptions>
  _ellipsisObserver?: MutationObserver | null
  _ellipsisResizeObserver?: ResizeObserver | null
  _ellipsisOrigOverflow?: string
  _ellipsisOrigTextOverflow?: string
  _ellipsisOrigWhiteSpace?: string
  _ellipsisOrigDisplay?: string
  _ellipsisOrigWebkitLineClamp?: string
  _ellipsisOrigWebkitBoxOrient?: string
  _ellipsisOrigLineClamp?: string
  _ellipsisOrigTitle?: string
  _ellipsisHadTitle?: boolean
  _ellipsisFrame?: number | null
}

/** 默认配置 */
const DEFAULTS: Required<EllipsisOptions> = {
  lines: 1,
  tooltip: true,
  text: '',
}

/**
 * 解析绑定值为标准化配置
 */
function resolveConfig(value: EllipsisValue, arg: string | undefined): Required<EllipsisOptions> {
  let fromValue: EllipsisOptions = {}

  if (value == null) {
    fromValue = {}
  } else if (typeof value === 'number') {
    fromValue = { lines: value }
  } else if (typeof value === 'string') {
    fromValue = { text: value }
  } else {
    fromValue = value
  }

  // arg 形式 v-ellipsis:3 优先级最高
  const linesFromArg = arg ? Number(arg) : NaN

  const lines = Number.isFinite(linesFromArg) && linesFromArg > 0
    ? linesFromArg
    : (fromValue.lines && fromValue.lines > 0 ? fromValue.lines : DEFAULTS.lines)

  return {
    lines,
    tooltip: fromValue.tooltip !== false,
    text: fromValue.text || DEFAULTS.text,
  }
}

/**
 * 单行省略样式
 */
function applySingleLineStyle(el: HTMLElement) {
  el.style.overflow = 'hidden'
  el.style.textOverflow = 'ellipsis'
  el.style.whiteSpace = 'nowrap'
}

/**
 * 多行省略样式（-webkit-line-clamp 方案，主流浏览器均支持）
 */
function applyMultiLineStyle(el: HTMLElement, lines: number) {
  el.style.overflow = 'hidden'
  el.style.display = '-webkit-box'
  el.style.webkitLineClamp = String(lines)
  ;(el.style as unknown as { WebkitBoxOrient: string }).WebkitBoxOrient = 'vertical'
  // 标准写法（Firefox 新版已支持）
  ;(el.style as unknown as { lineClamp: string }).lineClamp = String(lines)
}

/**
 * 判断元素文本是否已经溢出
 * 单行：scrollWidth > clientWidth
 * 多行：scrollHeight > clientHeight（有 1~2px 误差，加个容差）
 */
function isOverflowed(el: HTMLElement, lines: number): boolean {
  if (lines === 1) {
    return el.scrollWidth - el.clientWidth > 1
  }
  return el.scrollHeight - el.clientHeight > 1
}

/**
 * 获取用于 tooltip / title 显示的全文
 */
function getFullText(el: HTMLElement, config: Required<EllipsisOptions>): string {
  if (config.text) return config.text
  return el.textContent || ''
}

/**
 * 根据溢出状态更新 title
 */
function refreshOverflowState(el: EllipsisElement) {
  const config = el._ellipsisConfig
  if (!config) return

  const overflowed = isOverflowed(el, config.lines)
  const fullText = getFullText(el, config)

  if (config.tooltip) {
    if (overflowed && fullText) {
      el.setAttribute('title', fullText)
    } else {
      el.removeAttribute('title')
    }
  } else {
    el.removeAttribute('title')
  }
}

/**
 * 保存原始样式（用于解绑时还原）
 */
function saveOriginalStyles(el: EllipsisElement) {
  el._ellipsisOrigOverflow = el.style.overflow
  el._ellipsisOrigTextOverflow = el.style.textOverflow
  el._ellipsisOrigWhiteSpace = el.style.whiteSpace
  el._ellipsisOrigDisplay = el.style.display
  el._ellipsisOrigWebkitLineClamp = el.style.webkitLineClamp
  el._ellipsisOrigWebkitBoxOrient = (el.style as unknown as { WebkitBoxOrient: string }).WebkitBoxOrient
  el._ellipsisOrigLineClamp = (el.style as unknown as { lineClamp: string }).lineClamp
  el._ellipsisHadTitle = el.hasAttribute('title')
  el._ellipsisOrigTitle = el.getAttribute('title') || ''
}

/**
 * 还原元素原始样式
 */
function restoreOriginalStyles(el: EllipsisElement, restoreTitle = true) {
  if (el._ellipsisOrigOverflow !== undefined) el.style.overflow = el._ellipsisOrigOverflow
  if (el._ellipsisOrigTextOverflow !== undefined) el.style.textOverflow = el._ellipsisOrigTextOverflow
  if (el._ellipsisOrigWhiteSpace !== undefined) el.style.whiteSpace = el._ellipsisOrigWhiteSpace
  if (el._ellipsisOrigDisplay !== undefined) el.style.display = el._ellipsisOrigDisplay
  if (el._ellipsisOrigWebkitLineClamp !== undefined) el.style.webkitLineClamp = el._ellipsisOrigWebkitLineClamp
  if (el._ellipsisOrigWebkitBoxOrient !== undefined) {
    (el.style as unknown as { WebkitBoxOrient: string }).WebkitBoxOrient = el._ellipsisOrigWebkitBoxOrient
  }
  if (el._ellipsisOrigLineClamp !== undefined) {
    ;(el.style as unknown as { lineClamp: string }).lineClamp = el._ellipsisOrigLineClamp
  }
  if (restoreTitle) {
    if (el._ellipsisHadTitle) {
      el.setAttribute('title', el._ellipsisOrigTitle || '')
    } else {
      el.removeAttribute('title')
    }
  }
}

function scheduleOverflowRefresh(el: EllipsisElement, startObserver = false) {
  if (el._ellipsisFrame !== null && el._ellipsisFrame !== undefined) {
    cancelAnimationFrame(el._ellipsisFrame)
  }
  el._ellipsisFrame = requestAnimationFrame(() => {
    el._ellipsisFrame = null
    if (!el.isConnected) return
    refreshOverflowState(el)
    if (startObserver) startObservers(el)
  })
}

/**
 * 启动监听器：
 * - MutationObserver：观察子节点文本变化
 * - ResizeObserver：观察元素尺寸变化（容器宽度变化导致省略状态改变）
 */
function startObservers(el: EllipsisElement) {
  stopObservers(el)

  if (typeof MutationObserver !== 'undefined') {
    const mo = new MutationObserver(() => {
      refreshOverflowState(el)
    })
    mo.observe(el, { childList: true, characterData: true, subtree: true })
    el._ellipsisObserver = mo
  }

  if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(() => {
      refreshOverflowState(el)
    })
    ro.observe(el)
    el._ellipsisResizeObserver = ro
  }
}

function stopObservers(el: EllipsisElement) {
  if (el._ellipsisObserver) {
    el._ellipsisObserver.disconnect()
    el._ellipsisObserver = null
  }
  if (el._ellipsisResizeObserver) {
    el._ellipsisResizeObserver.disconnect()
    el._ellipsisResizeObserver = null
  }
}

/**
 * v-ellipsis：文本溢出省略指令
 *
 * 用法：
 *   <span v-ellipsis>{{ superLongText }}</span>                                // 单行省略，溢出时自动加 title
 *   <span v-ellipsis="3">{{ superLongText }}</span>                            // 3 行省略
 *   <span v-ellipsis:3>{{ superLongText }}</span>                              // 同上，arg 形式
 *   <span v-ellipsis="{ lines: 2, tooltip: false }">超长文本</span>            // 不要自动加 title
 *   <span v-ellipsis="'完整文本在这里，用于悬停显示'">部分内容...</span>        // 显式指定悬停显示的全文
 */
export const vEllipsis: Directive<EllipsisElement, EllipsisValue> = {
  mounted(el, binding) {
    saveOriginalStyles(el)
    const config = resolveConfig(binding.value, binding.arg)
    el._ellipsisConfig = config

    if (config.lines === 1) {
      applySingleLineStyle(el)
    } else {
      applyMultiLineStyle(el, config.lines)
    }

    // 下一帧再判断溢出（等待 DOM 布局完成）
    scheduleOverflowRefresh(el, true)
  },
  updated(el, binding) {
    const newConfig = resolveConfig(binding.value, binding.arg)
    const oldConfig = el._ellipsisConfig

    // lines 变化时需要重新应用样式
    if (!oldConfig || oldConfig.lines !== newConfig.lines) {
      restoreOriginalStyles(el, false)
      if (newConfig.lines === 1) {
        applySingleLineStyle(el)
      } else {
        applyMultiLineStyle(el, newConfig.lines)
      }
    }
    el._ellipsisConfig = newConfig
    scheduleOverflowRefresh(el)
  },
  unmounted(el) {
    if (el._ellipsisFrame !== null && el._ellipsisFrame !== undefined) {
      cancelAnimationFrame(el._ellipsisFrame)
      el._ellipsisFrame = null
    }
    stopObservers(el)
    restoreOriginalStyles(el)
    el._ellipsisConfig = undefined
    el._ellipsisObserver = undefined
    el._ellipsisResizeObserver = undefined
    el._ellipsisOrigTitle = undefined
    el._ellipsisHadTitle = undefined
  },
}
