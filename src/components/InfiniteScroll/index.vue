<template>
  <div class="page-infinite-scroll-container">
    <!-- 头部：搜索 + 工具栏 -->
    <div :class="['page-infinite-scroll-header', { 'is-row': config.isSearchAndToolbarRow }]">
      <SearchArea
        :show="showSearch"
        :searchConfig="searchConfig"
        :items="searchItemsRaw"
        v-model="searchData"
        @submit="handleSearchSubmit"
        @reset="handleSearchReset"
      >
        <template v-for="slot in Object.keys($slots)" #[slot]="scope">
          <slot :name="slot" v-bind="scope" :prop="slot" />
        </template>
      </SearchArea>
      <ToolbarArea
        :show="showToolbar"
        :leftButtons="leftToolbarButtons"
        :rightButtons="rightToolbarButtons"
        @click="handleInfiniteToolbarButtonClick"
      />
    </div>

    <!-- 滚动列表区域 -->
    <div class="infinite-scroll-body">
      <el-scrollbar ref="scrollbarRef" :height="scrollHeight" @scroll="handleScroll">
        <!-- 空数据 -->
        <div v-if="!loading && !dataRecords.length" class="infinite-scroll-empty">
          {{ infiniteScrollConfig.emptyText }}
        </div>

        <!-- 列表 -->
        <div
          v-else
          class="infinite-scroll-list"
          :class="{ 'is-virtual': virtualEnabled }"
          :style="virtualEnabled ? { height: `${totalVirtualHeight}px` } : undefined"
        >
          <div
            class="infinite-scroll-content"
            :class="{ 'is-virtual': virtualEnabled }"
            :style="virtualEnabled ? { transform: `translateY(${virtualOffset}px)` } : undefined"
          >
          <div
            v-for="item in renderedRows"
            :key="item.key"
            :ref="(el) => observeItem(el, item.key)"
            :data-virtual-key="item.key"
            class="infinite-scroll-item"
          >
            <slot name="item" :row="item.row" :index="item.index">
              <div class="infinite-scroll-fields">
                <div
                  v-for="field in displayFields"
                  :key="field.prop"
                  class="infinite-scroll-field"
                >
                  <span class="infinite-scroll-label">{{ field.label }}</span>
                  <slot
                    v-if="field.tableCellType === 'SLOT'"
                    :name="field.tableCellFormatter || ''"
                    :row="item.row"
                    :column="field"
                  />
                  <ElTag
                    v-else-if="field.tableCellType === 'TAG'"
                    v-bind="getCellProps(field, item.row)"
                  >
                    {{ getTableCellDisplay(field, item.row, dictionaryStore) }}
                  </ElTag>
                  <span v-else class="infinite-scroll-value" v-bind="getCellProps(field, item.row)">
                    {{ getTableCellDisplay(field, item.row, dictionaryStore) }}
                  </span>
                </div>
              </div>
              <!-- 操作按钮（来自 items 中 type === 'operate' 列的 options） -->
              <div v-if="operateButtons.length" class="infinite-scroll-operate">
                <OperateButton
                  v-for="btn in operateButtons"
                  :key="btn.btnType"
                  :btn="btn"
                  :row="item.row"
                  @click="handleOperateButtonClick"
                />
              </div>
            </slot>
          </div>
          </div>
        </div>

        <!-- 底部加载状态 -->
        <div class="infinite-scroll-status">
          <template v-if="loading">
            <span class="infinite-scroll-spinner" />
            <span>{{ infiniteScrollConfig.loadingText }}</span>
          </template>
          <span v-else-if="!hasMore && dataRecords.length" class="infinite-scroll-nomore">
            {{ infiniteScrollConfig.noMoreText }}
          </span>
        </div>
      </el-scrollbar>
    </div>

    <!-- 弹窗 -->
    <DialogForm
      ref="dialogRef"
      :formConfig="dialogFormConfig"
      :dialogConfig="config.dialog === false ? undefined : config.dialog"
      @submit="handleDialogSubmit"
      @cancel="handleDialogCancel"
      @closed="handleDialogClosed"
    >
      <template v-for="slot in Object.keys($slots)" #[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </DialogForm>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { ElScrollbar, ElTag } from 'element-plus'
import SearchArea from '../Table/search.vue'
import ToolbarArea from '../Table/toolbar.vue'
import DialogForm from '../Table/dialog.vue'
import OperateButton from '../Table/operation.vue'
import type { InfiniteScrollSetConfig, InfiniteScrollEmits } from './types'
import type { TableData, TableColumn, ToolbarButton } from '../Table/types'
import { filterType } from '../Table/const'
import { flattenTableTree, getTableCellDisplay, shouldShowButton, enrichButton } from '../Table/utils'
import { prepareTableColumns, resolvePreparedCellProps, type PreparedTableColumn } from '../Table/table-columns'
import { useOptionalDictionaryStore } from '../Dictionary/useDictionary'
import { useDataView } from '../../composables/useDataView'

defineOptions({ name: 'HdiInfiniteScroll' })

const props = defineProps<{
  config: InfiniteScrollSetConfig
  data?: TableData
}>()

const emit = defineEmits<InfiniteScrollEmits>()

const scrollbarRef = ref()

// 无限滚动展示配置（含默认值）
const infiniteScrollConfig = computed(() => ({
  rowKey: 'id',
  height: '100%' as string | number,
  threshold: 50,
  pageSize: 10,
  virtual: true,
  estimatedItemHeight: 96,
  overscan: 5,
  emptyText: '暂无数据',
  loadingText: '加载中...',
  noMoreText: '没有更多了',
  ...props.config.infiniteScroll,
}))

// 公共数据层逻辑（累积模式：触底加载追加数据；不注入 selection，无批量删除）
const {
  loading,
  searchData,
  internalData,
  pagination,
  dialogRef,
  dialogFormConfig,
  dataRecords,
  searchItemsRaw,
  leftToolbarButtons,
  rightToolbarButtons,
  showToolbar,
  loadData,
  handleSearchSubmit,
  handleSearchReset,
  handleToolbarButtonClick,
  handleOperateButtonClick,
  openDialog,
  handleDialogSubmit,
  handleDialogCancel,
  handleDialogClosed,
  closeTheLoading,
} = useDataView({
  props,
  emit: emit as unknown as (event: string, ...args: any[]) => void,
  accumulative: true,
  getRowKey: () => infiniteScrollConfig.value.rowKey || 'id',
})

// 初始每页条数由 infiniteScroll.pageSize 控制
pagination.value.pageSize = infiniteScrollConfig.value.pageSize || 10
watch(
  () => infiniteScrollConfig.value.pageSize,
  (v) => {
    if (v) pagination.value.pageSize = v
  }
)

// 是否还有更多数据：已加载数量小于总数
const hasMore = computed(() => dataRecords.value.length < pagination.value.total)

// 滚动容器高度
const scrollHeight = computed(() => infiniteScrollConfig.value.height)

// 行 key 取值
const getRowKey = (row: any, index: number) => {
  const key = row[infiniteScrollConfig.value.rowKey || 'id']
  return key !== undefined && key !== null ? String(key) : `__index_${index}`
}

const virtualEnabled = computed(() => infiniteScrollConfig.value.virtual !== false)
const estimatedItemHeight = computed(() => Math.max(1, infiniteScrollConfig.value.estimatedItemHeight || 96))
const overscan = computed(() => Math.max(0, infiniteScrollConfig.value.overscan || 5))
const scrollTop = ref(0)
const viewportHeight = ref(0)
const itemHeights = ref<Record<string, number>>({})

const virtualItems = computed(() => {
  let offset = 0
  return dataRecords.value.map((row, index) => {
    const key = getRowKey(row, index)
    const height = itemHeights.value[key] || estimatedItemHeight.value
    const item = { row, index, key, offset, height }
    offset += height
    return item
  })
})

const totalVirtualHeight = computed(() => {
  const items = virtualItems.value
  if (!items.length) return 0
  const lastItem = items[items.length - 1]
  return lastItem.offset + lastItem.height
})

function findVisibleStart(items: typeof virtualItems.value, boundary: number) {
  let low = 0
  let high = items.length
  while (low < high) {
    const middle = Math.floor((low + high) / 2)
    if (items[middle].offset + items[middle].height < boundary) low = middle + 1
    else high = middle
  }
  return low
}

function findVisibleEnd(items: typeof virtualItems.value, boundary: number) {
  let low = 0
  let high = items.length
  while (low < high) {
    const middle = Math.floor((low + high) / 2)
    if (items[middle].offset < boundary) low = middle + 1
    else high = middle
  }
  return low
}

const visibleRange = computed(() => {
  const items = virtualItems.value
  if (!virtualEnabled.value) return [0, items.length]

  const buffer = overscan.value * estimatedItemHeight.value
  const startBoundary = Math.max(0, scrollTop.value - buffer)
  const endBoundary = scrollTop.value + viewportHeight.value + buffer
  return [findVisibleStart(items, startBoundary), findVisibleEnd(items, endBoundary)]
})

const renderedRows = computed(() => {
  const [start, end] = visibleRange.value
  return virtualItems.value.slice(start, end)
})

const virtualOffset = computed(() => renderedRows.value[0]?.offset || 0)

let itemResizeObserver: ResizeObserver | undefined
let viewportResizeObserver: ResizeObserver | undefined
let heightFrame: number | undefined
const pendingHeights = new Map<string, number>()
const observedItems = new Map<string, HTMLElement>()

const flushMeasuredHeights = () => {
  heightFrame = undefined
  if (!pendingHeights.size) return
  itemHeights.value = {
    ...itemHeights.value,
    ...Object.fromEntries(pendingHeights),
  }
  pendingHeights.clear()
}

const observeItem = (element: unknown, key: string) => {
  const previousElement = observedItems.get(key)
  if (!(element instanceof HTMLElement)) {
    if (previousElement) {
      itemResizeObserver?.unobserve(previousElement)
      observedItems.delete(key)
    }
    return
  }
  if (previousElement && previousElement !== element) {
    itemResizeObserver?.unobserve(previousElement)
  }
  observedItems.set(key, element)
  itemResizeObserver?.observe(element)
  const height = Math.ceil(element.getBoundingClientRect().height)
  if (height > 0 && itemHeights.value[key] !== height) {
    pendingHeights.set(key, height)
    if (heightFrame === undefined) heightFrame = requestAnimationFrame(flushMeasuredHeights)
  }
}

const updateViewportHeight = () => {
  viewportHeight.value = (scrollbarRef.value?.wrapRef as HTMLElement | undefined)?.clientHeight || 0
}

// 默认展示字段：优先 showFields，否则取所有 isTable !== false 且带 prop 的列
const displayFields = computed<PreparedTableColumn[]>(() => {
  const cfg = infiniteScrollConfig.value
  const all = flattenTableTree(props.config.items)
  if (cfg.showFields?.length) {
    const map = new Map(all.map((it) => [it.prop, it]))
    return prepareTableColumns(cfg.showFields.map((p) => map.get(p)).filter(Boolean) as TableColumn[])
  }
  return prepareTableColumns(all.filter(
    (it) => it.isTable !== false && it.prop && !filterType.includes(it.type),
  ))
})

const dictionaryStore = useOptionalDictionaryStore()
const getCellProps = resolvePreparedCellProps

// 操作按钮：来自 items 中 type === 'operate' 列的 options
const operateButtons = computed<ToolbarButton[]>(() => {
  const operateCol = flattenTableTree(props.config.items).find(
    (it) => it.type === 'operate'
  )
  const options = (operateCol?.options || []) as ToolbarButton[][]
  return options.flat().filter(shouldShowButton).map(enrichButton)
})

// 触底加载
const loadMore = () => {
  if (loading.value || !hasMore.value) return
  pagination.value.pageNum++
  loadData()
  emit('loadMore', pagination.value)
}

const handleInfiniteToolbarButtonClick = (btn: ToolbarButton) => {
  if (btn.btnType === 'refresh') {
    resetList()
    return
  }
  handleToolbarButtonClick(btn)
}

// 滚动事件：判断是否触底
const handleScroll = ({ scrollTop: nextScrollTop }: { scrollTop: number }) => {
  scrollTop.value = nextScrollTop
  if (loading.value || !hasMore.value) return
  const wrap = scrollbarRef.value?.wrapRef as HTMLElement | undefined
  if (!wrap) return
  const { scrollHeight, clientHeight } = wrap
  if (scrollHeight - nextScrollTop - clientHeight < infiniteScrollConfig.value.threshold) {
    loadMore()
  }
}

watch(dataRecords, (records) => {
  const keys = new Set(records.map((row, index) => getRowKey(row, index)))
  const nextHeights = Object.fromEntries(
    Object.entries(itemHeights.value).filter(([key]) => keys.has(key)),
  )
  if (Object.keys(nextHeights).length !== Object.keys(itemHeights.value).length) {
    itemHeights.value = nextHeights
  }
  nextTick(updateViewportHeight)
})

onMounted(() => {
  nextTick(() => {
    const wrap = scrollbarRef.value?.wrapRef as HTMLElement | undefined
    updateViewportHeight()
    if (typeof ResizeObserver === 'undefined') return
    itemResizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const key = (entry.target as HTMLElement).dataset.virtualKey
        const height = Math.ceil(entry.contentRect.height)
        if (key && height > 0 && itemHeights.value[key] !== height) {
          pendingHeights.set(key, height)
        }
      }
      if (pendingHeights.size && heightFrame === undefined) {
        heightFrame = requestAnimationFrame(flushMeasuredHeights)
      }
    })
    for (const element of observedItems.values()) {
      itemResizeObserver.observe(element)
    }
    if (wrap) {
      viewportResizeObserver = new ResizeObserver(updateViewportHeight)
      viewportResizeObserver.observe(wrap)
    }
  })
})

onUnmounted(() => {
  itemResizeObserver?.disconnect()
  viewportResizeObserver?.disconnect()
  observedItems.clear()
  if (heightFrame !== undefined) cancelAnimationFrame(heightFrame)
})

// 重置列表：回到第 1 页并清空已加载数据
const resetList = () => {
  pagination.value.pageNum = 1
  internalData.value = { records: [], totalNums: 0, totalPages: 1 }
  loadData()
}

// 搜索相关（与 CardList 基础版一致）
const showSearch = computed(() => {
  if (props.config.search === false) return false
  return !!searchItemsRaw.value?.length
})

const searchConfig = computed(() => ({
  items: searchItemsRaw.value,
  inline: true,
  labelWidth: 'auto',
  submitButtonText: '查询',
  cols: 4,
  ...props.config.search,
}))

// 暴露方法
defineExpose({
  closeTheLoading,
  openDialog,
  closeDialog: () => dialogRef.value?.close(),
  // 无限滚动的搜索/刷新语义为「重置到第 1 页并重新加载」
  searchSubmit: (info?: Record<string, any>, page?: any) => {
    if (info) searchData.value = info
    if (page) pagination.value = { ...pagination.value, ...page }
    resetList()
  },
  refresh: resetList,
  resetList,
  loadMore,
})
</script>

<style scoped lang="scss">
.page-infinite-scroll-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.page-infinite-scroll-header {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.page-infinite-scroll-header.is-row {
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
}

.infinite-scroll-body {
  flex: 1;
  overflow: hidden;
  height: 0; /* 配合 flex:1 实现自适应高度 */
  min-height: 0;
}

.infinite-scroll-list {
  display: flex;
  flex-direction: column;

  &.is-virtual {
    position: relative;
  }
}

.infinite-scroll-content {
  display: flex;
  flex-direction: column;

  &.is-virtual {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
}

.infinite-scroll-item {
  padding: 12px 16px;
  border-bottom: 1px solid var(--el-border-color-lighter, #ebeef5);
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--el-fill-color-light, #f5f7fa);
  }
}

.infinite-scroll-fields {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
}

.infinite-scroll-field {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
}

.infinite-scroll-label {
  color: var(--el-text-color-secondary, #909399);
  flex-shrink: 0;
}

.infinite-scroll-value {
  color: var(--el-text-color-primary, #303133);
  word-break: break-all;
}

.infinite-scroll-operate {
  margin-top: 8px;
  display: flex;
  justify-content: flex-end;
  gap: 4px;
}

.infinite-scroll-empty {
  padding: 40px 16px;
  text-align: center;
  color: var(--el-text-color-secondary, #909399);
  font-size: 14px;
}

.infinite-scroll-status {
  padding: 16px;
  text-align: center;
  color: var(--el-text-color-secondary, #909399);
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.infinite-scroll-nomore {
  color: var(--el-text-color-placeholder, #c0c4cc);
}

.infinite-scroll-spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid var(--el-border-color, #dcdfe6);
  border-top-color: var(--el-color-primary, #409eff);
  border-radius: 50%;
  animation: infinite-scroll-rotate 0.6s linear infinite;
}

@keyframes infinite-scroll-rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
