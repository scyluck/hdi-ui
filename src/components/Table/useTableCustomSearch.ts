// useTableCustomSearch.ts
// 自定义搜索状态管理
import {computed, ref, watch} from 'vue'
import type {ComputedRef, Ref} from 'vue'
import type {CustomSearchConfig, TableColumn} from './types'
import {defaultCustomSearchConfig, filterType} from './const'

export interface CustomSearchState {
  // 显示/隐藏状态：prop -> 是否显示
  visibleMap: Ref<Record<string, boolean>>
  // 高级搜索是否展开
  advancedExpanded: Ref<boolean>
  // 重置到默认配置
  reset: () => void
  // 设置某字段的显示/隐藏
  setVisible: (prop: string, visible: boolean) => void
  // 切换高级搜索展开/收起
  toggleAdvanced: () => void
  // 解析后的可用配置（合并默认值）
  resolvedConfig: ComputedRef<Required<Omit<CustomSearchConfig, 'storageKey'>> & {storageKey: string | false}>
  // 当前生效的可见搜索字段 prop 列表（按原始顺序）
  visibleProps: ComputedRef<string[]>
  // 是否存在高级字段（决定是否显示高级搜索按钮）
  hasAdvanced: ComputedRef<boolean>
  // 固定字段 prop 集合（不可隐藏）
  fixedPropSet: ComputedRef<Set<string>>
  // 触发变化通知
  emitChange: () => void
  // 注册变化事件回调
  onChange: (cb: (visibleProps: string[], advancedExpanded: boolean) => void) => void
}

/**
 * 自定义搜索状态管理
 * @param items 表格原始列配置（响应式）
 * @param userConfig 用户传入的自定义搜索配置
 * @param defaultStorageKey 当用户未配置 storageKey 时使用的默认 key
 */
export function useTableCustomSearch(
    items: ComputedRef<TableColumn[]> | Ref<TableColumn[]>,
    userConfig: ComputedRef<boolean | CustomSearchConfig | undefined> | Ref<boolean | CustomSearchConfig | undefined>,
    defaultStorageKey: string,
): CustomSearchState {
  // 合并后的配置
  const resolvedConfig = computed(() => {
    const cfg = userConfig.value
    if (cfg === true) {
      return {...defaultCustomSearchConfig, storageKey: defaultStorageKey as string | false}
    }
    if (cfg && typeof cfg === 'object') {
      const storageKey: string | false = cfg.storageKey === false
          ? false
          : (cfg.storageKey || defaultStorageKey)
      return {
        ...defaultCustomSearchConfig,
        ...cfg,
        storageKey,
      }
    }
    return {...defaultCustomSearchConfig, storageKey: defaultStorageKey as string | false}
  })

  // 所有可用搜索字段的 prop 列表（按原始顺序）
  const allProps = computed(() => {
    return items.value
        .filter((item) => item.isSearch !== false && !filterType.includes(item.type))
        .map((item) => item.prop || '')
        .filter(Boolean)
  })

  // 固定字段 prop 集合：用户配置的 fixedProps
  const fixedPropSet = computed(() => {
    const set = new Set<string>()
    ;(resolvedConfig.value.fixedProps || []).forEach((p) => set.add(p))
    return set
  })

  // 是否存在高级字段
  const hasAdvanced = computed(() => {
    return items.value.some((item) => item.prop && item.isAdvanced === true && allProps.value.includes(item.prop))
  })

  // 加载持久化数据
  const loadPersisted = (): {visible: Record<string, boolean>, advancedExpanded: boolean} | null => {
    const key = resolvedConfig.value.storageKey
    if (key === false) return null
    try {
      const raw = localStorage.getItem(key)
      if (!raw) return null
      const data = JSON.parse(raw)
      if (!data || typeof data !== 'object') return null
      return {
        visible: data.visible && typeof data.visible === 'object' ? data.visible : {},
        advancedExpanded: data.advancedExpanded === true,
      }
    } catch {
      return null
    }
  }

  // 保存持久化数据
  const persist = () => {
    const key = resolvedConfig.value.storageKey
    if (key === false) return
    try {
      localStorage.setItem(key, JSON.stringify({
        visible: visibleMap.value,
        advancedExpanded: advancedExpanded.value,
      }))
    } catch {
      // 忽略写入异常
    }
  }

  // 计算默认可见状态
  const computeDefaultVisible = (): Record<string, boolean> => {
    const result: Record<string, boolean> = {}
    const defaultHidden = new Set(resolvedConfig.value.defaultHidden || [])
    allProps.value.forEach((prop) => {
      if (fixedPropSet.value.has(prop)) {
        result[prop] = true
      } else {
        result[prop] = !defaultHidden.has(prop)
      }
    })
    return result
  }

  const visibleMap = ref<Record<string, boolean>>({})
  const advancedExpanded = ref<boolean>(false)

  // 初始化
  const init = () => {
    const persisted = loadPersisted()
    if (persisted) {
      const visible = computeDefaultVisible()
      Object.keys(visible).forEach((prop) => {
        if (prop in persisted.visible) {
          visible[prop] = persisted.visible[prop]
        }
      })
      visibleMap.value = visible
      advancedExpanded.value = persisted.advancedExpanded
    } else {
      visibleMap.value = computeDefaultVisible()
      advancedExpanded.value = false
    }
  }

  init()

  // 当 items 变化时重新初始化，保留持久化偏好
  watch(
      () => allProps.value,
      () => {
        const persisted = loadPersisted()
        if (persisted) {
          const visible = computeDefaultVisible()
          Object.keys(visible).forEach((prop) => {
            if (prop in persisted.visible) {
              visible[prop] = persisted.visible[prop]
            }
          })
          visibleMap.value = visible
          advancedExpanded.value = persisted.advancedExpanded
        } else {
          visibleMap.value = computeDefaultVisible()
          advancedExpanded.value = false
        }
      },
  )

  // 当前可见的搜索字段 prop 列表
  const visibleProps = computed(() => {
    return allProps.value.filter((prop) => visibleMap.value[prop] === true)
  })

  // 变化事件回调
  const changeCallbacks: Array<(visibleProps: string[], advancedExpanded: boolean) => void> = []
  const onChange = (cb: (visibleProps: string[], advancedExpanded: boolean) => void) => {
    changeCallbacks.push(cb)
  }
  const emitChange = () => {
    persist()
    const list = visibleProps.value
    changeCallbacks.forEach((cb) => cb(list, advancedExpanded.value))
  }

  // 设置某字段可见性
  const setVisible = (prop: string, visible: boolean) => {
    if (fixedPropSet.value.has(prop)) {
      visibleMap.value[prop] = true
      return
    }
    visibleMap.value = {...visibleMap.value, [prop]: visible}
    emitChange()
  }

  // 切换高级搜索
  const toggleAdvanced = () => {
    advancedExpanded.value = !advancedExpanded.value
    emitChange()
  }

  // 重置到默认
  const reset = () => {
    visibleMap.value = computeDefaultVisible()
    advancedExpanded.value = false
    emitChange()
  }

  return {
    visibleMap,
    advancedExpanded,
    reset,
    setVisible,
    toggleAdvanced,
    resolvedConfig,
    visibleProps,
    hasAdvanced,
    fixedPropSet,
    emitChange,
    onChange,
  }
}
