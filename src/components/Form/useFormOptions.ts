/**
 * 表单选项 composable
 * 统一处理「数组选项」和「字典code选项」两种模式
 * 当 options 为字符串（字典code）时，自动触发字典请求
 */
import { computed, unref, type ComputedRef, type Ref } from 'vue'
import { useDictionary } from '../Dictionary/useDictionary'
import { resolveFormOptions } from './utils'
import type { FormItem } from './types'

export function useFormOptions(
  configGetter: FormItem | ComputedRef<FormItem> | Ref<FormItem> | (() => FormItem),
) {
  // 统一为 getter 函数
  const getConfig = (): FormItem => {
    if (typeof configGetter === 'function') {
      return (configGetter as () => FormItem)()
    }
    return unref(configGetter as ComputedRef<FormItem> | Ref<FormItem>)
  }

  // 提取字典code（setup 阶段确定，后续不变）
  const initialConfig = getConfig()
  const dictName = typeof initialConfig.options === 'string' ? initialConfig.options : ''

  // 始终调用 useDictionary（空字符串时内部不会请求，符合 composable 规范）
  const { items: dictItems, loading: dictLoading } = useDictionary(dictName)

  // 响应式选项列表
  const options = computed(() => {
    const config = getConfig()
    const opts = config.options

    // 字典模式：从 useDictionary 的响应式 items 读取
    if (typeof opts === 'string') {
      return dictItems.value || []
    }

    // 数组模式：直接返回
    return resolveFormOptions(config)
  })

  const loading = computed(() => dictLoading.value)

  return { options, loading }
}
