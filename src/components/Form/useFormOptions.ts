/**
 * 表单选项 composable
 * 统一处理三种选项模式：
 * 1. 数组选项：静态数据，直接返回
 * 2. 字典code选项（字符串）：自动触发字典请求
 * 3. 函数选项：动态数据，接收 formData，返回数组或 Promise，配合 dependsOn 实现联动加载
 */
import { computed, ref, unref, watch, type ComputedRef, type Ref } from 'vue'
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

  const config = computed(getConfig)
  const dictName = computed(() => typeof config.value.options === 'string' ? config.value.options : '')
  const { items: dictItems, loading: dictLoading } = useDictionary(dictName)
  const dynamicOptions = ref<any[]>([])
  const dynamicLoading = ref(false)
  let requestId = 0

  const getFormData = (): Record<string, any> => {
    return formDataGetter ? formDataGetter() : {}
  }

  async function loadDynamic() {
    const cfg = config.value
    const opts = cfg.options
    if (typeof opts !== 'function') return

    const currentRequestId = ++requestId
    dynamicLoading.value = true
    try {
      const result = await opts(getFormData())
      if (currentRequestId === requestId) {
        dynamicOptions.value = Array.isArray(result) ? result : []
      }
    } catch (error) {
      if (currentRequestId === requestId) {
        console.warn('动态选项加载失败:', error)
        dynamicOptions.value = []
      }
    } finally {
      if (currentRequestId === requestId) dynamicLoading.value = false
    }
  }

  watch(
    () => {
      const currentConfig = config.value
      const deps = currentConfig.dependsOn || []
      return [currentConfig.options, ...deps.map((prop) => getFormData()[prop])]
    },
    () => {
      if (typeof config.value.options === 'function') {
        void loadDynamic()
        return
      }
      requestId += 1
      dynamicOptions.value = []
      dynamicLoading.value = false
    },
    { immediate: true },
  )

  const options = computed(() => {
    const currentOptions = config.value.options
    if (typeof currentOptions === 'string') return dictItems.value
    if (typeof currentOptions === 'function') return dynamicOptions.value
    return resolveFormOptions(config.value)
  })
  const loading = computed(() => typeof config.value.options === 'string' ? dictLoading.value : dynamicLoading.value)

  return {options, loading}
}
