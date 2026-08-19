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

    <div class="custom-search-config">
      <div class="custom-search-config__header">
        <span class="custom-search-config__title">自定义搜索</span>
        <el-button
            text
            type="primary"
            size="small"
            @click="handleReset"
        >重置</el-button>
      </div>
      <div class="custom-search-config__list">
        <div
            v-for="prop in allProps"
            :key="prop"
            class="custom-search-config__item"
            :class="{'is-fixed': fixedPropSet.has(prop)}"
        >
          <el-checkbox
              :model-value="localVisible[prop] !== false"
              :disabled="fixedPropSet.has(prop)"
              @change="(val) => handleVisibleChange(prop, val as boolean)"
          >
            {{ getLabel(prop) }}
          </el-checkbox>
          <el-tag
              v-if="isAdvancedField(prop)"
              size="small"
              type="info"
              effect="plain"
          >高级</el-tag>
          <el-tag
              v-else-if="fixedPropSet.has(prop)"
              size="small"
              type="warning"
              effect="plain"
          >固定</el-tag>
        </div>
        <div v-if="!allProps.length" class="custom-search-config__empty">
          暂无可配置搜索字段
        </div>
      </div>
      <div class="custom-search-config__footer">
        <el-button size="small" @click="handleClose">取消</el-button>
        <el-button type="primary" size="small" @click="handleConfirm">确定</el-button>
      </div>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import {computed, ref, watch} from 'vue'
import {ElButton, ElPopover, ElCheckbox, ElTag} from 'element-plus'
import type {Component} from 'vue'
import type {TableColumn} from './types'
import {useTableCustomSearch} from './useTableCustomSearch'
import {filterType} from './const'

const props = defineProps<{
  items: TableColumn[]
  state: ReturnType<typeof useTableCustomSearch>
  buttonText?: string
  icon?: Component
  btnBind?: Record<string, any>
}>()

const defaultIcon = computed(() => null)

const visible = ref(false)
const localVisible = ref<Record<string, boolean>>({})

const {fixedPropSet, setVisible, reset} = props.state

// 所有可用搜索字段 prop
const allProps = computed(() => {
  return props.items
      .filter((item) => item.isSearch !== false && !filterType.includes(item.type))
      .map((item) => item.prop || '')
      .filter(Boolean)
})

const syncFromExternal = () => {
  localVisible.value = {...props.state.visibleMap.value}
}

watch(
    () => props.state.visibleMap.value,
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
  Object.keys(localVisible.value).forEach((prop) => {
    const target = localVisible.value[prop]
    const current = props.state.visibleMap.value[prop]
    if (target !== current) {
      setVisible(prop, target)
    }
  })
  visible.value = false
}

const handleReset = () => {
  reset()
  syncFromExternal()
}

const handleVisibleChange = (prop: string, val: boolean) => {
  localVisible.value = {...localVisible.value, [prop]: val}
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

// 是否高级字段
const isAdvancedField = (prop: string) => {
  const item = props.items.find((it) => it.prop === prop)
  return item?.isAdvanced === true
}

defineExpose({
  visible,
  toggleVisible,
})
</script>

<style scoped lang="scss">
.custom-search-config {
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

    &:hover {
      background: var(--el-fill-color-light);
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
