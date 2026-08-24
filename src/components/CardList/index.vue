<template>
  <div class="page-card-list-container">
    <!-- 头部：搜索 + 工具栏 -->
    <div :class="['page-card-list-header', { 'is-row': config.isSearchAndToolbarRow }]">
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

    <!-- 卡片区域 -->
    <div class="card-list-area">
      <CardArea
        ref="cardAreaRef"
        :data="dataRecords"
        :loading="loading"
        :items="config.items"
        :cardListConfig="cardListConfig"
        :pageInfo="pagination"
        @operateClick="handleOperateButtonClick"
        @selectionChange="handleSelectionChange"
        @cardClick="handleCardClick"
      >
        <template v-for="slotName in Object.keys($slots)" #[slotName]="scope">
          <slot :name="slotName" v-bind="scope" />
        </template>
      </CardArea>
    </div>

    <PaginationArea
      :show="showPagination"
      v-model="pagination"
      :total="pagination.total"
      :paginationConfig="paginationConfig"
      @change="pageChange"
      @sizeChange="handleSizeChange"
    />

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
import { ref, computed } from 'vue'
import SearchArea from '../Table/search.vue'
import ToolbarArea from '../Table/toolbar.vue'
import PaginationArea from '../Table/pagination.vue'
import DialogForm from '../Table/dialog.vue'
import CardArea from './card-area.vue'
import type { CardListSetConfig, CardListEmits } from './types'
import { useDataView } from '../../composables/useDataView'

defineOptions({ name: 'HdiCardList' })

const props = withDefaults(
  defineProps<{
    config: CardListSetConfig
    data?: import('../Table/types').TableData
  }>(),
  {
    data: () => ({ records: [], totalNums: 0, totalPages: 1 }),
  }
)

const emit = defineEmits<CardListEmits>()

const cardAreaRef = ref()

// 卡片列表展示配置
const cardListConfig = computed(() => ({
  grid: { cols: 4, gutter: 16 },
  card: { shadow: 'hover' as const },
  rowKey: 'id',
  emptyText: '暂无数据',
  ...props.config.cardList,
}))

// 公共数据层逻辑 + 选择能力注入
const {
  loading,
  searchData,
  pagination,
  dialogRef,
  dialogFormConfig,
  dataRecords,
  searchItemsRaw,
  leftToolbarButtons,
  rightToolbarButtons,
  showToolbar,
  showPagination,
  paginationConfig,
  loadData,
  handleSearchSubmit,
  handleSearchReset,
  pageChange,
  handleSizeChange,
  handleToolbarButtonClick,
  handleOperateButtonClick,
  openDialog,
  handleDialogSubmit,
  handleDialogCancel,
  handleDialogClosed,
  closeTheLoading,
  searchSubmit,
} = useDataView({
  props,
  emit: emit as unknown as (event: string, ...args: any[]) => void,
  selection: {
    getRows: () => cardAreaRef.value?.getSelectionRows() || [],
    clear: () => cardAreaRef.value?.clearSelection(),
    toggle: (row: any, selected?: boolean) =>
      cardAreaRef.value?.toggleRowSelection(row, selected),
    toggleAll: () => cardAreaRef.value?.toggleAllSelection(),
  },
  getRowKey: () => cardListConfig.value.rowKey,
})

// 是否显示搜索
const showSearch = computed(() => {
  if (props.config.search === false) return false
  return !!searchItemsRaw.value?.length
})

// 搜索配置
const searchConfig = computed(() => ({
  items: searchItemsRaw.value,
  inline: true,
  labelWidth: 'auto',
  submitButtonText: '查询',
  cols: 4,
  ...props.config.search,
}))

// 选择变化
const handleSelectionChange = (selection: any[]) => {
  emit('selectionChange', selection)
}

// 卡片点击
const handleCardClick = (row: any, index: number) => {
  emit('cardClick', row, index)
}

// 暴露方法
defineExpose({
  closeTheLoading,
  openDialog,
  closeDialog: () => dialogRef.value?.close(),
  searchSubmit,
  pageChange,
  refresh: loadData,
  clearSelection: () => cardAreaRef.value?.clearSelection(),
  getSelectionRows: () => cardAreaRef.value?.getSelectionRows() || [],
  toggleRowSelection: (row: any, selected?: boolean) =>
    cardAreaRef.value?.toggleRowSelection(row, selected),
  toggleAllSelection: () => cardAreaRef.value?.toggleAllSelection(),
})
</script>

<style scoped lang="scss">
.page-card-list-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.page-card-list-header {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.page-card-list-header.is-row {
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
}

.card-list-area {
  flex: 1;
  overflow: auto;
  height: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
