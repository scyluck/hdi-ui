import type { Directive } from 'vue'

export type ClickOutsideElement = HTMLElement & {
  _clickOutsideHandler?: (event: MouseEvent) => void
  _clickOutsideValue?: (event: MouseEvent) => void
}

/**
 * v-click-outside：点击元素外部时触发回调
 *
 * 用法：
 *   <div v-click-outside="handleClickOutside">点击我外面会触发</div>
 */
export const vClickOutside: Directive<ClickOutsideElement, (event: MouseEvent) => void> = {
  mounted(el, binding) {
    el._clickOutsideValue = binding.value
    el._clickOutsideHandler = (event: MouseEvent) => {
      const path = event.composedPath?.()
      const isInside = path ? path.includes(el) : el.contains(event.target as Node)
      if (!isInside) {
        el._clickOutsideValue?.(event)
      }
    }
    document.addEventListener('click', el._clickOutsideHandler)
  },
  updated(el, binding) {
    el._clickOutsideValue = binding.value
  },
  unmounted(el) {
    if (el._clickOutsideHandler) {
      document.removeEventListener('click', el._clickOutsideHandler)
    }
    el._clickOutsideHandler = undefined
    el._clickOutsideValue = undefined
  },
}
