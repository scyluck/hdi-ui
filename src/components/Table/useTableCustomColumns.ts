// useTableCustomColumns.ts
// 自定义列（自定义表头展示）状态管理
import {computed, ref, watch} from 'vue'
import type {Ref} from 'vue'
import type {CustomColumnsConfig, TableColumn} from './types'
import {defaultCustomColumnsConfig, fixedColumnTypes} from './const'

export interface CustomColumnsState {
  // 显示/隐藏状态：prop -> 是否显示
  visibleMap: Ref<Record<string, boolean>>
  // 列顺序：prop 数组
  order: Ref<string[]>
  // 重置到默认配置
  reset: () => void
  // 设置某列的显示/隐藏
  setVisible: (prop: string, visible: boolean) => void
  // 设置列顺序
  setOrder: (order: string[]) => void
  // 解析后的可用配置（合并默认值）
  resolvedConfig: ComputedRef<Required<Omit<CustomColumnsConfig, 'storageKey'>> & {storageKey: string | false}>
  // 当前生效的可见列 prop 列表（按 order 顺序）
  visibleProps: ComputedRef<string[]>
  // 固定列 prop 集合（不可隐藏、不可移除）
  fixedPropSet: ComputedRef<Set<string>>
  // 触发变化通知
  emitChange: () => void
  // 注册变化事件回调
  onChange: (cb: (visibleProps: string[], order: string[]) => void) => void
}

import type {ComputedRef} from 'vue'

/**
 * 自定义列状态管理
 * @param items 表格原始列配置（响应式）
 * @param userConfig 用户传入的自定义列配置
 * @param defaultStorageKey 当用户未配置 storageKey 时使用的默认 key
 */
export function useTableCustomColumns(
    items: ComputedRef<TableColumn[]> | Ref<TableColumn[]>,
    userConfig: ComputedRef<boolean | CustomColumnsConfig | undefined> | Ref<boolean | CustomColumnsConfig | undefined>,
    defaultStorageKey: string,
): CustomColumnsState {
  // 合并后的配置
  const resolvedConfig = computed(() => {
    const cfg = userConfig.value
    if (cfg === true) {
      return {...defaultCustomColumnsConfig, storageKey: defaultStorageKey as string | false}
    }
    if (cfg && typeof cfg === 'object') {
      // storageKey 显式为 false 时关闭持久化，否则用用户配置或默认 key
      const storageKey: string | false = cfg.storageKey === false
          ? false
          : (cfg.storageKey || defaultStorageKey)
      return {
        ...defaultCustomColumnsConfig,
        ...cfg,
        storageKey,
      }
    }
    return {...defaultCustomColumnsConfig, storageKey: defaultStorageKey as string | false}
  })

  // 所有可用列的 prop 列表（按原始顺序）
  const allProps = computed(() => {
    return items.value
        .filter((item) => item.isTable !== false)
        .map((item) => item.prop || '')
        .filter(Boolean)
  })

  // 固定列 prop 集合：固定类型 + 用户配置的 fixedProps
  const fixedPropSet = computed(() => {
    const set = new Set<string>()
    items.value.forEach((item) => {
      if (item.prop && fixedColumnTypes.includes(item.type)) {
        set.add(item.prop)
      }
    })
    ;(resolvedConfig.value.fixedProps || []).forEach((p) => set.add(p))
    return set
  })

  // 加载持久化数据
  const loadPersisted = (): {visible: Record<string, boolean>, order: string[]} | null => {
    const key = resolvedConfig.value.storageKey
    if (key === false) return null
    try {
      const raw = localStorage.getItem(key)
      if (!raw) return null
      const data = JSON.parse(raw)
      if (!data || typeof data !== 'object') return null
      return {
        visible: data.visible && typeof data.visible === 'object' ? data.visible : {},
        order: Array.isArray(data.order) ? data.order : [],
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
        order: order.value,
      }))
    } catch {
      // 忽略写入异常（如隐私模式）
    }
  }

  // 计算默认可见状态
  const computeDefaultVisible = (): Record<string, boolean> => {
    const result: Record<string, boolean> = {}
    const defaultHidden = new Set(resolvedConfig.value.defaultHidden || [])
    allProps.value.forEach((prop) => {
      // 固定列强制可见
      if (fixedPropSet.value.has(prop)) {
        result[prop] = true
      } else {
        result[prop] = !defaultHidden.has(prop)
      }
    })
    return result
  }

  // 计算默认顺序
  const computeDefaultOrder = (): string[] => {
    return [...allProps.value]
  }

  // 初始化
  const init = () => {
    const persisted = loadPersisted()
    if (persisted) {
      // 合并持久化与当前可用列（移除已不存在的 prop）
      const visible = computeDefaultVisible()
      const persistedVisible = persisted.visible
      // 仅当 prop 当前仍存在时采用持久化值，否则用默认
      Object.keys(visible).forEach((prop) => {
        if (prop in persistedVisible) {
          visible[prop] = persistedVisible[prop]
        }
      })
      visibleMap.value = visible

      // 顺序：以持久化顺序为准，新增的 prop 追加到末尾
      const set = new Set(allProps.value)
      const newOrder: string[] = []
      persisted.order.forEach((p) => {
        if (set.has(p) && !newOrder.includes(p)) newOrder.push(p)
      })
      allProps.value.forEach((p) => {
        if (!newOrder.includes(p)) newOrder.push(p)
      })
      order.value = newOrder
    } else {
      visibleMap.value = computeDefaultVisible()
      order.value = computeDefaultOrder()
    }
  }

  const visibleMap = ref<Record<string, boolean>>({})
  const order = ref<string[]>([])

  // 初始化一次
  init()

  // 当 items 变化时（如动态列），重新初始化可见状态与顺序，但保留持久化偏好
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

          const set = new Set(allProps.value)
          const newOrder: string[] = []
          persisted.order.forEach((p) => {
            if (set.has(p) && !newOrder.includes(p)) newOrder.push(p)
          })
          allProps.value.forEach((p) => {
            if (!newOrder.includes(p)) newOrder.push(p)
          })
          order.value = newOrder
        } else {
          // 没有持久化，重新计算默认值
          visibleMap.value = computeDefaultVisible()
          order.value = computeDefaultOrder()
        }
      },
  )

  // 当前可见的列 prop 列表（按 order 顺序，仅显示 visible 为 true 的）
  const visibleProps = computed(() => {
    return order.value.filter((prop) => visibleMap.value[prop] === true)
  })

  // 变化事件回调
  const changeCallbacks: Array<(visibleProps: string[], order: string[]) => void> = []
  const onChange = (cb: (visibleProps: string[], order: string[]) => void) => {
    changeCallbacks.push(cb)
  }
  const emitChange = () => {
    persist()
    const list = visibleProps.value
    changeCallbacks.forEach((cb) => cb(list, [...order.value]))
  }

  // 设置某列可见性
  const setVisible = (prop: string, visible: boolean) => {
    // 固定列强制不可隐藏
    if (fixedPropSet.value.has(prop)) {
      visibleMap.value[prop] = true
      return
    }
    visibleMap.value = {...visibleMap.value, [prop]: visible}
    emitChange()
  }

  // 设置列顺序
  const setOrder = (newOrder: string[]) => {
    // 保证固定列在原位置？这里采用简单策略：仅按用户拖拽后的顺序排列
    // 固定列允许被重新排序位置，但不会因隐藏被移除
    order.value = [...newOrder]
    emitChange()
  }

  // 重置到默认
  const reset = () => {
    visibleMap.value = computeDefaultVisible()
    order.value = computeDefaultOrder()
    emitChange()
  }

  return {
    visibleMap,
    order,
    reset,
    setVisible,
    setOrder,
    resolvedConfig,
    visibleProps,
    fixedPropSet,
    emitChange,
    onChange,
  }
}
