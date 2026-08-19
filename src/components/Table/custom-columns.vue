<template>
  <el-popover
      :visible="visible"
      placement="bottom-end"
      :width="240"
      trigger="click"
      @show="handleShow"
  >
    <template #reference>
      <slot>
        <el-button v-bind="btnBind" @click.stop="toggleVisible">
          <template v-if="icon || defaultIcon" #icon>
            <component :is="icon || defaultIcon"/>
          </template>
          <template v-if="buttonText" #default>{{ buttonText }}</template>
        </el-button>
      </slot>
    </template>

    <div class="custom-columns">
      <div class="custom-columns__header">
        <span class="custom-columns__title">列设置</span>
        <el-button
            v-if="enableReorder"
            text
            type="primary"
            size="small"
            @click="handleReset"
        >重置
        </el-button>
      </div>
      <div class="custom-columns__list">
        <div
            v-for="(prop, index) in localOrder"
            :key="prop"
            class="custom-columns__item"
            :class="{
              'is-fixed': fixedPropSet.has(prop),
              'is-dragging': draggingIndex === index,
              'is-drag-over': dragOverIndex === index,
            }"
            draggable="true"
            @dragstart="handleDragStart(index, $event)"
            @dragover.prevent="handleDragOver(index, $event)"
            @dragleave="handleDragLeave"
            @drop="handleDrop(index, $event)"
            @dragend="handleDragEnd"
        >
          <el-checkbox
              :model-value="localVisible[prop] !== false"
              :disabled="fixedPropSet.has(prop)"
              @change="(val) => handleVisibleChange(prop, val as boolean)"
          >
            {{ getLabel(prop) }}
          </el-checkbox>
          <span
              v-if="enableReorder && !fixedPropSet.has(prop)"
              class="custom-columns__drag"
              title="拖拽排序"
          >
            <el-icon><Rank/></el-icon>
          </span>
          <span
              v-else-if="enableReorder && fixedPropSet.has(prop)"
              class="custom-columns__drag is-locked"
              title="固定列不可移动"
          >
            <el-icon><Lock/></el-icon>
          </span>
        </div>
        <div v-if="!localOrder.length" class="custom-columns__empty">
          暂无可配置列
        </div>
      </div>
      <div class="custom-columns__footer">
        <el-button size="small" @click="handleClose">取消</el-button>
        <el-button type="primary" size="small" @click="handleConfirm">确定</el-button>
      </div>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import {computed, ref, watch} from 'vue'
import {ElButton, ElPopover, ElCheckbox, ElIcon} from 'element-plus'
import {Rank, Lock} from '@element-plus/icons-vue'
import type {Component} from 'vue'
import type {TableColumn} from './types'
import {useTableCustomColumns} from './useTableCustomColumns'

const props = defineProps<{
  items: TableColumn[]
  // 外部传入的状态管理实例
  state: ReturnType<typeof useTableCustomColumns>
  // 按钮文字
  buttonText?: string
  // 按钮图标
  icon?: Component
  // 按钮额外属性
  btnBind?: Record<string, any>
}>()

// 默认图标不内置，由父组件传入；未传则仅显示文字
const defaultIcon = computed(() => null)

const visible = ref(false)
// 本地副本，仅确定时才提交
const localVisible = ref<Record<string, boolean>>({})
const localOrder = ref<string[]>([])

const {resolvedConfig, fixedPropSet, setVisible, setOrder, reset} = props.state

const enableReorder = computed(() => resolvedConfig.value.enableReorder !== false)

// 同步外部状态到本地副本
const syncFromExternal = () => {
  localVisible.value = {...props.state.visibleMap.value}
  localOrder.value = [...props.state.order.value]
}

watch(
    () => [props.state.visibleMap.value, props.state.order.value],
    syncFromExternal,
    {immediate: true, deep: true},
)

const handleShow = () => {
  syncFromExternal()
}

const toggleVisible = () => {
  visible.value = !visible.value
  if (visible.value) syncFromExternal()
}

const handleClose = () => {
  visible.value = false
}

const handleConfirm = () => {
  // 提交本地副本到外部状态
  Object.keys(localVisible.value).forEach((prop) => {
    const target = localVisible.value[prop]
    const current = props.state.visibleMap.value[prop]
    if (target !== current) {
      setVisible(prop, target)
    }
  })
  // 顺序：直接设置（注意 setOrder 内部会触发 emitChange，避免重复触发）
  if (enableReorder.value) {
    setOrder(localOrder.value)
  }
  visible.value = false
}

const handleReset = () => {
  reset()
  syncFromExternal()
}

const handleVisibleChange = (prop: string, val: boolean) => {
  localVisible.value = {...localVisible.value, [prop]: val}
}

// 拖拽相关
const draggingIndex = ref<number | null>(null)
const dragOverIndex = ref<number | null>(null)

const handleDragStart = (index: number, e: DragEvent) => {
  if (!enableReorder.value) return
  if (fixedPropSet.value.has(localOrder.value[index])) {
    e.preventDefault()
    return
  }
  draggingIndex.value = index
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move'
    // Firefox 需要设置 data 才会触发拖拽
    e.dataTransfer.setData('text/plain', String(index))
  }
}

const handleDragOver = (index: number, e: DragEvent) => {
  if (!enableReorder.value || draggingIndex.value === null) return
  e.preventDefault()
  if (e.dataTransfer) e.dataTransfer.dropEffect = 'move'
  if (dragOverIndex.value !== index) {
    dragOverIndex.value = index
  }
}

const handleDragLeave = () => {
  // 这里不立即清空，避免抖动
}

const handleDrop = (index: number, e: DragEvent) => {
  if (!enableReorder.value || draggingIndex.value === null) return
  e.preventDefault()
  const from = draggingIndex.value
  const to = index
  if (from === to) {
    draggingIndex.value = null
    dragOverIndex.value = null
    return
  }
  const arr = [...localOrder.value]
  const [moved] = arr.splice(from, 1)
  arr.splice(to, 0, moved)
  localOrder.value = arr
  draggingIndex.value = null
  dragOverIndex.value = null
}

const handleDragEnd = () => {
  draggingIndex.value = null
  dragOverIndex.value = null
}

// 通过 prop 查找原始 label
const labelMap = computed(() => {
  const map: Record<string, string> = {}
  const walk = (cols: TableColumn[]) => {
    cols.forEach((col) => {
      if (col.prop) {
        map[col.prop] = col.label || col.prop
      }
      if (col.children && col.children.length) walk(col.children)
    })
  }
  walk(props.items)
  return map
})

const getLabel = (prop: string) => {
  return labelMap.value[prop] || prop
}

defineExpose({
  visible,
  toggleVisible,
})
</script>

<style scoped lang="scss">
.custom-columns {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--el-border-color-lighter);
  }

  &__title {
    font-weight: 600;
    font-size: 14px;
    color: var(--el-text-color-primary);
  }

  &__list {
    max-height: 280px;
    overflow: auto;
    padding: 8px 0;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 4px;
    border-radius: 4px;
    cursor: default;
    transition: background 0.15s;

    &:hover {
      background: var(--el-fill-color-light);
    }

    &.is-dragging {
      opacity: 0.4;
    }

    &.is-drag-over {
      background: var(--el-color-primary-light-9);
      box-shadow: inset 0 -2px 0 0 var(--el-color-primary);
    }
  }

  &__drag {
    display: inline-flex;
    align-items: center;
    color: var(--el-text-color-secondary);
    cursor: move;
    font-size: 14px;

    &.is-locked {
      cursor: not-allowed;
      color: var(--el-text-color-placeholder);
    }
  }

  &__empty {
    text-align: center;
    color: var(--el-text-color-secondary);
    padding: 16px 0;
    font-size: 13px;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding-top: 8px;
    border-top: 1px solid var(--el-border-color-lighter);
  }
}
</style>
