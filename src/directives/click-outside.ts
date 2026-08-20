import type { Directive } from 'vue'

export type ClickOutsideElement = HTMLElement & {
  _clickOutsideHandler?: (event: MouseEvent) => void
}

/**
 * v-click-outside：点击元素外部时触发回调
 *
 * 用法：
 *   <div v-click-outside="handleClickOutside">点击我外面会触发</div>
 */
export const vClickOutside: Directive<ClickOutsideElement, (event: MouseEvent) => void> = {
  mounted(el, binding) {
    el._clickOutsideHandler = (event: MouseEvent) => {
      if (!el.contains(event.target as Node)) {
        binding.value?.(event)
      }
    }
    document.addEventListener('click', el._clickOutsideHandler)
  },
  unmounted(el) {
    if (el._clickOutsideHandler) {
      document.removeEventListener('click', el._clickOutsideHandler)
    }
    el._clickOutsideHandler = undefined
  },
}
