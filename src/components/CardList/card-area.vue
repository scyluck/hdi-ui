<template>
  <div class="card-area" v-loading="loading">
    <!-- 空状态 -->
    <el-empty v-if="!loading && !data.length" :description="emptyText" />

    <!-- 卡片网格 -->
    <div v-else class="card-grid" :class="colsClass" :style="gridStyle">
      <CardItems
        :data="data"
        :display-fields="displayFields"
        :operate-buttons="operateButtons"
        :card-config="cardConfig"
        :card-slots="cardSlots"
        :selectable="selectable"
        :selected-keys="selectedSet"
        :get-row-key="getRowKey"
        @select="handleSelect"
        @card-click="handleCardClick"
        @operate-click="handleOperateClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, type PropType, type Slots } from 'vue'
import { ElEmpty } from 'element-plus'
import type { TableColumn, ToolbarButton, PageInfo } from '../Table/types'
import type { CardListConfig, CardItemConfig } from './types'
import CardItem from './card-item.vue'
import { defineComponent, h } from 'vue'
import { enrichButton } from '../Table/utils'
import { filterType } from '../Table/const'
import { prepareTableColumns, type PreparedTableColumn } from '../Table/table-columns'

const props = withDefaults(defineProps<{
  data?: any[]
  loading?: boolean
  items?: TableColumn[]
  cardListConfig?: CardListConfig
  pageInfo?: PageInfo
  cardSlots?: Slots
}>(), {
  data: () => [],
  loading: false,
  items: () => [],
  cardListConfig: () => ({ grid: {}, card: {} }),
})

const emit = defineEmits<{
  (e: 'operateClick', btn: ToolbarButton, row: any): void
  (e: 'selectionChange', selection: any[]): void
  (e: 'cardClick', rowData: any, index: number): void
}>()

const cardSlots = computed(() => props.cardSlots || {})

// 网格布局配置
const gridConfig = computed(() => props.cardListConfig.grid || {})
const cardConfig = computed<CardItemConfig>(() => ({
  ...props.cardListConfig.card,
}))
const rowKey = computed(() => props.cardListConfig.rowKey || 'id')
const emptyText = computed(() => props.cardListConfig.emptyText || '暂无数据')
const selectable = computed(() => cardConfig.value.selectable || false)

const displayFields = computed<PreparedTableColumn[]>(() => {
  const excludeProps = new Set<string>([
    cardConfig.value.coverField,
    cardConfig.value.titleField,
    cardConfig.value.descField,
  ].filter(Boolean) as string[])
  const source = cardConfig.value.showFields
    ? cardConfig.value.showFields
      .map((prop) => props.items.find((item) => item.prop === prop))
      .filter(Boolean) as TableColumn[]
    : props.items.filter((item) => item.isTable !== false)

  return prepareTableColumns(source.filter((item) =>
    !filterType.includes(item.type) && !excludeProps.has(item.prop || ''),
  ))
})

const operateButtons = computed<ToolbarButton[]>(() => {
  const operateColumn = props.items.find((item) => item.type === 'operate')
  return ((operateColumn?.options || []) as ToolbarButton[][]).flat().map(enrichButton)
})

// 网格样式
const gridStyle = computed(() => {
  const gutter = gridConfig.value.gutter ?? 16
  return {
    '--card-gutter': `${gutter}px`,
  } as Record<string, string>
})

// 响应式列数（通过 CSS 变量 + 媒体查询实现）
const colsClass = computed(() => {
  const g = gridConfig.value
  const classes: string[] = []

  // 基础列数
  const baseCols = g.cols ?? 4
  classes.push(`card-cols-${baseCols}`)

  // 响应式列数
  if (g.xs) classes.push(`card-cols-xs-${g.xs}`)
  if (g.sm) classes.push(`card-cols-sm-${g.sm}`)
  if (g.md) classes.push(`card-cols-md-${g.md}`)
  if (g.lg) classes.push(`card-cols-lg-${g.lg}`)
  if (g.xl) classes.push(`card-cols-xl-${g.xl}`)

  return classes
})

// 选择管理
const selectedSet = ref<Set<string>>(new Set())
const selectedRows = ref<any[]>([])

const getRowKey = (row: any, index: number) => {
  const key = row[rowKey.value]
  return key !== undefined ? String(key) : `__index_${index}`
}

const handleSelect = (row: any, selected: boolean, index: number) => {
  const key = getRowKey(row, index)
  if (selected) {
    if (!selectedSet.value.has(key)) {
      selectedSet.value.add(key)
      selectedRows.value.push(row)
    }
  } else {
    if (selectedSet.value.has(key)) {
      selectedSet.value.delete(key)
      selectedRows.value = selectedRows.value.filter((selectedRow) => selectedRow !== row)
    }
  }
  emit('selectionChange', [...selectedRows.value])
}

const handleCardClick = (row: any, index: number) => {
  emit('cardClick', row, index)
}

const handleOperateClick = (btn: ToolbarButton, row: any) => {
  emit('operateClick', btn, row)
}

// 数据变化时清空选择
watch(() => props.data, () => {
  selectedSet.value.clear()
  selectedRows.value = []
})

// 暴露方法
defineExpose({
  clearSelection: () => {
    selectedSet.value.clear()
    selectedRows.value = []
    emit('selectionChange', [])
  },
  getSelectionRows: () => [...selectedRows.value],
  toggleRowSelection: (row: any, selected?: boolean) => {
    const key = getRowKey(row, props.data.indexOf(row))
    const isCurrentlySelected = selectedSet.value.has(key)
    const target = selected === undefined ? !isCurrentlySelected : selected
    handleSelect(row, target, props.data.indexOf(row))
  },
  toggleAllSelection: () => {
    const allSelected = selectedRows.value.length === props.data.length
    if (allSelected) {
      selectedSet.value.clear()
      selectedRows.value = []
    } else {
      selectedSet.value.clear()
      selectedRows.value = []
      props.data.forEach((row, index) => {
        const key = getRowKey(row, index)
        selectedSet.value.add(key)
        selectedRows.value.push(row)
      })
    }
    emit('selectionChange', [...selectedRows.value])
  },
})

const CardItems = defineComponent({
  name: 'HdiCardItems',
  props: {
    data: { type: Array as PropType<Record<string, any>[]>, required: true },
    displayFields: { type: Array as PropType<PreparedTableColumn[]>, required: true },
    operateButtons: { type: Array as PropType<ToolbarButton[]>, required: true },
    cardConfig: { type: Object as PropType<CardItemConfig>, required: true },
    cardSlots: { type: Object as PropType<Slots>, required: true },
    selectable: { type: Boolean, required: true },
    selectedKeys: { type: Object as PropType<Set<string>>, required: true },
    getRowKey: { type: Function as PropType<(row: Record<string, any>, index: number) => string>, required: true },
  },
  emits: ['select', 'cardClick', 'operateClick'],
  setup(itemProps, { emit }) {
    return () => itemProps.data.map((row, index) => {
      const key = itemProps.getRowKey(row, index)
      return h(
        CardItem,
        {
          key,
          row,
          index,
          displayFields: itemProps.displayFields,
          operateButtons: itemProps.operateButtons,
          cardConfig: itemProps.cardConfig,
          selectable: itemProps.selectable,
          selected: itemProps.selectedKeys.has(key),
          onSelect: (selectedRow: Record<string, any>, selected: boolean) => emit('select', selectedRow, selected, index),
          onCardClick: (clickedRow: Record<string, any>, clickedIndex: number) => emit('cardClick', clickedRow, clickedIndex),
          onOperateClick: (button: ToolbarButton, clickedRow: Record<string, any>) => emit('operateClick', button, clickedRow),
        },
        itemProps.cardSlots,
      )
    })
  },
})
</script>

<style scoped lang="scss">
.card-area {
  flex: 1;
  overflow: auto;
  height: 0;
  display: flex;
  flex-direction: column;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(var(--cols, 4), 1fr);
  gap: var(--card-gutter, 16px);
  padding: 4px;

  // 基础列数
  .card-cols-1 & { --cols: 1; }
  .card-cols-2 & { --cols: 2; }
  .card-cols-3 & { --cols: 3; }
  .card-cols-4 & { --cols: 4; }
  .card-cols-5 & { --cols: 5; }
  .card-cols-6 & { --cols: 6; }

  // 响应式：超小屏 < 768px
  @media (max-width: 767px) {
    .card-cols-xs-1 & { --cols: 1; }
    .card-cols-xs-2 & { --cols: 2; }
    .card-cols-xs-3 & { --cols: 3; }
  }

  // ≥ 768px
  @media (min-width: 768px) {
    .card-cols-sm-1 & { --cols: 1; }
    .card-cols-sm-2 & { --cols: 2; }
    .card-cols-sm-3 & { --cols: 3; }
    .card-cols-sm-4 & { --cols: 4; }
  }

  // ≥ 992px
  @media (min-width: 992px) {
    .card-cols-md-1 & { --cols: 1; }
    .card-cols-md-2 & { --cols: 2; }
    .card-cols-md-3 & { --cols: 3; }
    .card-cols-md-4 & { --cols: 4; }
    .card-cols-md-5 & { --cols: 5; }
    .card-cols-md-6 & { --cols: 6; }
  }

  // ≥ 1200px
  @media (min-width: 1200px) {
    .card-cols-lg-1 & { --cols: 1; }
    .card-cols-lg-2 & { --cols: 2; }
    .card-cols-lg-3 & { --cols: 3; }
    .card-cols-lg-4 & { --cols: 4; }
    .card-cols-lg-5 & { --cols: 5; }
    .card-cols-lg-6 & { --cols: 6; }
  }

  // ≥ 1920px
  @media (min-width: 1920px) {
    .card-cols-xl-1 & { --cols: 1; }
    .card-cols-xl-2 & { --cols: 2; }
    .card-cols-xl-3 & { --cols: 3; }
    .card-cols-xl-4 & { --cols: 4; }
    .card-cols-xl-5 & { --cols: 5; }
    .card-cols-xl-6 & { --cols: 6; }
  }
}
</style>
