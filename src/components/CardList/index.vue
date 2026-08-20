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
        :data="cardData"
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
import { ref, computed, watch, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import SearchArea from '../Table/search.vue'
import ToolbarArea from '../Table/toolbar.vue'
import PaginationArea from '../Table/pagination.vue'
import DialogForm from '../Table/dialog.vue'
import CardArea from './card-area.vue'
import type { CardListSetConfig, CardListEmits } from './types'
import type { TableData, PageInfo, ToolbarButton } from '../Table/types'
import { filterType } from '../Table/const'
import { flattenTableTree, shouldShowButton, enrichButton } from '../Table/utils'
import { useTableDictionaries } from '../Table/useTableDictionaries'

defineOptions({ name: 'HdiCardList' })

type DialogType = 'add' | 'edit' | 'view' | ''

const props = withDefaults(
  defineProps<{
    config: CardListSetConfig
    data?: TableData
  }>(),
  {
    data: () => ({ records: [], totalNums: 0, totalPages: 1 }),
  }
)

// 自动加载字典数据
useTableDictionaries(() => props.config.items)

const emit = defineEmits<CardListEmits>()

const cardAreaRef = ref()

// 核心状态
const loading = ref(false)
const searchData = ref({})
const _cardData = ref<TableData>({ records: [], totalNums: 0, totalPages: 1 })
const pagination = ref<PageInfo>({
  pageNum: 1,
  pageSize: props.config.page ? (props.config.page as any).size || 10 : 10,
  total: 0,
})

// 弹窗状态
const dialogRef = ref()
const dialogType = ref<DialogType>('')
const currentRow = ref<any>(null)

// 可搜索字段
const searchItemsRaw = computed(() =>
  flattenTableTree(props.config.items).filter(
    (item) => item.isSearch !== false && !filterType.includes(item.type)
  ) || []
)

// 是否显示搜索
const showSearch = computed(() => {
  if (props.config.search === false) return false
  return !!searchItemsRaw.value?.length
})

// 是否显示工具栏
const showToolbar = computed(
  () => props.config.toolbar !== false && !!(leftToolbarButtons.value?.length || rightToolbarButtons.value.length)
)

// 是否显示分页
const showPagination = computed(
  () => props.config.page !== false && pagination.value.total > 0
)

// 搜索配置
const searchConfig = computed(() => ({
  items: searchItemsRaw.value,
  inline: true,
  labelWidth: 'auto',
  submitButtonText: '查询',
  cols: 4,
  ...props.config.search,
}))

// 卡片列表配置
const cardListConfig = computed(() => {
  return {
    grid: { cols: 4, gutter: 16 },
    card: { shadow: 'hover' as const },
    rowKey: 'id',
    emptyText: '暂无数据',
    ...props.config.cardList,
  }
})

// 卡片数据
const cardData = computed(() => {
  const data = props.data && props.data.records?.length > 0 ? props.data : _cardData.value
  return data?.records || []
})

// 左侧工具栏按钮
const leftToolbarButtons = computed(() =>
  (props.config.toolbar || [])
    .filter((btn) => btn.direction === 'left' && shouldShowButton(btn))
    .map(enrichButton)
)

// 右侧工具栏按钮
const rightToolbarButtons = computed(() =>
  (props.config.toolbar || [])
    .filter((btn) => btn.direction !== 'left' && shouldShowButton(btn))
    .map(enrichButton)
)

// 分页配置
const paginationConfig = computed(() => {
  const { size: _size, total: _total, ...restPageConfig } = (props.config.page as any) || {}
  return {
    layout: 'total, sizes, prev, pager, next',
    pageSizes: [10, 20, 50, 100],
    background: true,
    hideOnSinglePage: false,
    align: 'center',
    ...restPageConfig,
  }
})

// 弹窗配置
const dialogFormConfig = computed(() => {
  if (!dialogType.value) return { items: [] }
  const typeKey = dialogType.value
  const dialogFormItems = flattenTableTree(props.config.items).filter((item) => {
    const isShow = item[`is${typeKey.charAt(0).toUpperCase() + typeKey.slice(1)}`] !== false
    return isShow && !filterType.includes(item.type)
  }) || []

  return {
    items: dialogFormItems,
    inline: false,
    labelWidth: 'auto',
    cols: 2,
    submitButtonText: '保存',
    resetButtonText: '取消',
    isReverseButton: true,
    showSubmit: dialogType.value !== 'view',
    showReset: true,
    ...(props.config.dialog ? (((props.config.dialog as any).form || {})) : {}),
  }
})

// 加载数据
const loadData = () => {
  loading.value = true
  emit('getTableData', pagination.value, searchData.value, (data?: TableData) => {
    loading.value = false
    if (data) {
      _cardData.value = data
      pagination.value.total = data.totalNums || 0
      if (pagination.value.pageNum > (data.totalPages || 1)) {
        pagination.value.pageNum = 1
      }
    }
  })
}

// 搜索提交
const handleSearchSubmit = (data: any) => {
  searchData.value = data
  pagination.value.pageNum = 1
  loadData()
}

// 搜索重置
const handleSearchReset = () => {
  searchData.value = {}
  pagination.value.pageNum = 1
  loadData()
}

// 页码变更
const pageChange = (page: number, size: number) => {
  pagination.value.pageNum = page
  pagination.value.pageSize = size
  loadData()
  emit('pageChange', page, size)
}

// 每页大小变更
const handleSizeChange = (size: number) => {
  pagination.value.pageSize = size
  pagination.value.pageNum = 1
  loadData()
}

// 工具栏按钮点击
const handleToolbarButtonClick = (btn: ToolbarButton) => {
  const { btnType } = btn
  if (btnType === 'add') {
    openDialog('add')
  } else if (btnType === 'batchDelete') {
    handleBatchDelete()
  } else if (btnType === 'import') {
    emit('tableImport', (_info: any, _type: 'Blob' | 'url', _fileName?: string) => {
      if (_info) loadData()
    }, pagination.value, searchData.value)
  } else if (btnType === 'export') {
    emit('tableExport', pagination.value, searchData.value)
  } else if (btnType === 'refresh') {
    loadData()
  } else {
    emit('toolbarButtonClick', btn, (result: any) => {
      if (result !== false) {
        loadData()
      }
    })
  }
}

// 操作按钮点击
const handleOperateButtonClick = (btn: ToolbarButton, row: any) => {
  const { btnType } = btn
  if (btnType === 'view' || btnType === 'edit') {
    openDialog(btnType, row)
  } else if (btnType === 'delete') {
    ElMessageBox.confirm('确定删除该数据吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        loading.value = true
        emit('delSubmit', row, [row[cardListConfig.value.rowKey]], (info: any) => {
          loading.value = false
          if (info !== false) {
            ElMessage.success(info.msg || '删除成功')
            loadData()
          }
        })
      })
      .catch(() => {})
  } else {
    emit('operateButtonClick', btn, row, (data: any) => {
      if (data !== false) loadData()
    })
  }
}

// 批量删除
const handleBatchDelete = () => {
  let selection = cardAreaRef.value?.getSelectionRows() || []
  if (selection.length === 0) {
    ElMessage.warning('请先选择要删除的数据')
    return
  }
  const ids = selection.map((item: any) => item[cardListConfig.value.rowKey])
  ElMessageBox.confirm(`确定删除选中的 ${selection.length} 条数据吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      loading.value = true
      emit('delSubmit', selection, ids, (result: any) => {
        loading.value = false
        if (result !== false) {
          ElMessage.success(result.msg || `删除成功 ${selection.length} 条数据`)
          cardAreaRef.value?.clearSelection()
          loadData()
        }
      })
    })
    .catch(() => {})
}

// 选择变化
const handleSelectionChange = (selection: any[]) => {
  emit('selectionChange', selection)
}

// 卡片点击
const handleCardClick = (row: any, index: number) => {
  emit('cardClick', row, index)
}

// 打开弹窗
const openDialog = (type: 'add' | 'edit' | 'view', row?: any) => {
  dialogType.value = type
  if (type === 'add') {
    currentRow.value = null
  } else {
    currentRow.value = row
  }
  const dialogTitleMap: Record<string, string> = { add: '新增', edit: '编辑', view: '查看' }
  const dialogWidth = props.config.dialog ? ((props.config.dialog as any).width || '50%') : '50%'
  dialogRef.value?.open({
    type,
    record: row,
    title: dialogTitleMap[type],
    width: dialogWidth,
  })
}

// 弹窗提交
const handleDialogSubmit = (data: Record<string, any>, done: (ok?: boolean) => void) => {
  if (dialogType.value === 'add') {
    emit('addSubmit', data, (result: any) => {
      if (result !== false) {
        done(true)
        loadData()
      } else {
        done(false)
      }
    })
  } else if (dialogType.value === 'edit') {
    emit('editSubmit', { ...currentRow.value, ...data }, (result: any) => {
      if (result !== false) {
        done(true)
        loadData()
      } else {
        done(false)
      }
    })
  } else {
    done(true)
  }
}

// 弹窗取消
const handleDialogCancel = () => {}

// 弹窗关闭
const handleDialogClosed = () => {
  dialogType.value = ''
  currentRow.value = null
}

// 初始化
onMounted(() => {
  if (props.config.isStartGet !== false) {
    loadData()
  }
})

// 监听页码大小
watch(
  () => props.config.page ? (props.config.page as any).size : undefined,
  (newSize) => {
    if (newSize) pagination.value.pageSize = newSize
  }
)

// 监听数据变化
watch(
  () => props.data,
  (newData) => {
    if (newData && newData.records?.length > 0) {
      _cardData.value = newData
      pagination.value.total = newData.totalNums || 0
    }
  },
  { immediate: true, deep: true }
)

// 暴露方法
defineExpose({
  closeTheLoading: (off = true) => {
    loading.value = !off
  },
  openDialog,
  closeDialog: () => {
    dialogRef.value?.close()
  },
  searchSubmit: (info?: Record<string, any>, page?: any) => {
    if (info) searchData.value = info
    if (page) pagination.value = { ...pagination.value, ...page }
    loadData()
  },
  pageChange,
  refresh: loadData,
  clearSelection: () => cardAreaRef.value?.clearSelection(),
  getSelectionRows: () => cardAreaRef.value?.getSelectionRows() || [],
  toggleRowSelection: (row: any, selected?: boolean) => cardAreaRef.value?.toggleRowSelection(row, selected),
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
