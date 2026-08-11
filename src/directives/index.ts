import type { App, Directive } from 'vue'

export { permissionUtils, setPermissionUtils, clearPermissionUtils } from './permission'
export type { PermissionChecker } from './permission'

/** 点击元素外部触发回调 */
export const vClickOutside: Directive<
  HTMLElement & { _clickOutsideHandler?: (event: MouseEvent) => void },
  (event: MouseEvent) => void
> = {
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
  },
}

/** 防抖指令：v-debounce:click="handler" */
export const vDebounce: Directive<
  HTMLElement & { _debounceHandler?: (...args: unknown[]) => void },
  (...args: unknown[]) => void
> = {
  mounted(el, binding) {
    const delay = Number(binding.arg) || 300
    const event = Object.keys(binding.modifiers)[0] || 'click'
    let timer: ReturnType<typeof setTimeout> | null = null

    el._debounceHandler = (...args: unknown[]) => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        binding.value?.(...args)
      }, delay)
    }

    el.addEventListener(event, el._debounceHandler)
  },
  unmounted(el, binding) {
    const event = Object.keys(binding.modifiers)[0] || 'click'
    if (el._debounceHandler) {
      el.removeEventListener(event, el._debounceHandler)
    }
  },
}

export function registerDirectives(app: App) {
  app.directive('click-outside', vClickOutside)
  app.directive('debounce', vDebounce)
}
