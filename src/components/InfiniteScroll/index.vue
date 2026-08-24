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
        @click="handleToolbarButtonClick"
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
        <div v-else class="infinite-scroll-list">
          <div
            v-for="(row, index) in dataRecords"
            :key="getRowKey(row)"
            class="infinite-scroll-item"
          >
            <slot name="item" :row="row" :index="index">
              <div class="infinite-scroll-fields">
                <div
                  v-for="field in displayFields"
                  :key="field.prop"
                  class="infinite-scroll-field"
                >
                  <span class="infinite-scroll-label">{{ field.label }}</span>
                  <span class="infinite-scroll-value">{{ row[field.prop || ''] }}</span>
                </div>
              </div>
              <!-- 操作按钮（来自 items 中 type === 'operate' 列的 options） -->
              <div v-if="operateButtons.length" class="infinite-scroll-operate">
                <OperateButton
                  v-for="btn in operateButtons"
                  :key="btn.btnType"
                  :btn="btn"
                  :row="row"
                  @click="handleOperateButtonClick"
                />
              </div>
            </slot>
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
import { ref, computed, watch } from 'vue'
import { ElScrollbar } from 'element-plus'
import SearchArea from '../Table/search.vue'
import ToolbarArea from '../Table/toolbar.vue'
import DialogForm from '../Table/dialog.vue'
import OperateButton from '../Table/operation.vue'
import type { InfiniteScrollSetConfig, InfiniteScrollEmits } from './types'
import type { TableData, TableColumn, ToolbarButton } from '../Table/types'
import { filterType } from '../Table/const'
import { flattenTableTree, shouldShowButton, enrichButton } from '../Table/utils'
import { useDataView } from '../../composables/useDataView'

defineOptions({ name: 'HdiInfiniteScroll' })

const props = withDefaults(
  defineProps<{
    config: InfiniteScrollSetConfig
    data?: TableData
  }>(),
  {
    data: () => ({ records: [], totalNums: 0, totalPages: 1 }),
  }
)

const emit = defineEmits<InfiniteScrollEmits>()

const scrollbarRef = ref()

// 无限滚动展示配置（含默认值）
const infiniteScrollConfig = computed(() => ({
  rowKey: 'id',
  height: '100%' as string | number,
  threshold: 50,
  pageSize: 10,
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
const getRowKey = (row: any) => row[infiniteScrollConfig.value.rowKey || 'id']

// 默认展示字段：优先 showFields，否则取所有 isTable !== false 且带 prop 的列
const displayFields = computed<TableColumn[]>(() => {
  const cfg = infiniteScrollConfig.value
  const all = flattenTableTree(props.config.items)
  if (cfg.showFields?.length) {
    const map = new Map(all.map((it) => [it.prop, it]))
    return cfg.showFields.map((p) => map.get(p)).filter(Boolean) as TableColumn[]
  }
  return all.filter(
    (it) => it.isTable !== false && it.prop && !filterType.includes(it.type)
  )
})

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

// 滚动事件：判断是否触底
const handleScroll = ({ scrollTop }: { scrollTop: number }) => {
  if (loading.value || !hasMore.value) return
  const wrap = scrollbarRef.value?.wrapRef as HTMLElement | undefined
  if (!wrap) return
  const { scrollHeight, clientHeight } = wrap
  if (scrollHeight - scrollTop - clientHeight < infiniteScrollConfig.value.threshold) {
    loadMore()
  }
}

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
