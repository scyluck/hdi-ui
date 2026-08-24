/**
 * 表单选项 composable
 * 统一处理三种选项模式：
 * 1. 数组选项：静态数据，直接返回
 * 2. 字典code选项（字符串）：自动触发字典请求
 * 3. 函数选项：动态数据，接收 formData，返回数组或 Promise，配合 dependsOn 实现联动加载
 */
import {computed, ref, unref, watch, type ComputedRef, type Ref} from 'vue'
import {useDictionary} from '../Dictionary/useDictionary'
import {resolveFormOptions} from './utils'
import type {FormItem} from './types'

export function useFormOptions(
  configGetter: FormItem | ComputedRef<FormItem> | Ref<FormItem> | (() => FormItem),
  formDataGetter?: () => Record<string, any>,
) {
  // 统一为 getter 函数
  const getConfig = (): FormItem => {
    if (typeof configGetter === 'function') {
      return (configGetter as () => FormItem)()
    }
    return unref(configGetter as ComputedRef<FormItem> | Ref<FormItem>)
  }

  // 提取初始配置（setup 阶段确定选项模式，后续不变）
  const initialConfig = getConfig()
  const dictName = typeof initialConfig.options === 'string' ? initialConfig.options : ''
  const isFnOptions = typeof initialConfig.options === 'function'

  // 始终调用 useDictionary（空字符串时内部不会请求，符合 composable 规范）
  const {items: dictItems, loading: dictLoading} = useDictionary(dictName)

  // 静态模式（数组 / 字典）：保持同步 computed
  if (!isFnOptions) {
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

    return {options, loading}
  }

  // 函数模式：异步加载 + watch 依赖字段
  const dynamicOptions = ref<any[]>([])
  const dynamicLoading = ref(false)
  const getFormData = (): Record<string, any> => {
    return formDataGetter ? formDataGetter() : {}
  }

  async function loadDynamic() {
    const cfg = getConfig()
    const opts = cfg.options
    if (typeof opts !== 'function') return

    dynamicLoading.value = true
    try {
      const result = await opts(getFormData())
      dynamicOptions.value = Array.isArray(result) ? result : []
    } catch (error) {
      console.warn('动态选项加载失败:', error)
      dynamicOptions.value = []
    } finally {
      dynamicLoading.value = false
    }
  }

  // 依赖字段任一变化重新加载；无依赖时仅首次加载
  const deps = initialConfig.dependsOn || []
  if (deps.length) {
    watch(
      () => deps.map(p => getFormData()[p]),
      loadDynamic,
      {immediate: true},
    )
  } else {
    loadDynamic()
  }

  const options = computed(() => dynamicOptions.value)
  const loading = computed(() => dynamicLoading.value)

  return {options, loading}
}
