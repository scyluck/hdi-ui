<template>
  <div class="page-table-container">
    <!-- 头部：搜索 + 工具栏 -->
    <div :class="['page-table-header', { 'is-row': config.isSearchAndToolbarRow }]">
      <SearchArea
          :show="showSearch"
          :searchConfig="searchConfig"
          :items="searchItemsRaw"
          :customSearchState="isCustomSearchEnabled ? customSearchState : null"
          v-model="searchData"
          @submit="handleSearchSubmit"
          @reset="handleSearchReset"
      >
        <template v-for="slot in Object.keys($slots)" #[slot]="scope">
          <slot :name="slot" v-bind="scope" :prop="slot"/>
        </template>
      </SearchArea>
      <ToolbarArea
          :show="showToolbar"
          :leftButtons="leftToolbarButtons"
          :rightButtons="rightToolbarButtons"
          @click="handleToolbarButtonClick"
      >
        <!-- 自定义列设置按钮注入到工具栏右侧 -->
        <template v-if="isCustomColumnsEnabled" #custom-columns>
          <CustomColumnsConfig
              :items="config.items"
              :state="customColumnsState"
              :button-text="customColumnsState.resolvedConfig.value.buttonText"
              :icon="customColumnsState.resolvedConfig.value.icon || defaultColumnsIcon"
              :btn-bind="customColumnsState.resolvedConfig.value.btnBind"
          />
        </template>
      </ToolbarArea>
    </div>

    <!-- 表格区域 -->
    <div class="table-area">
      <!--   使用自定义表格插槽 -->
      <slot v-if="tableConfig.tableBoxType === 'slot'" name="tableBox" :data="tableData"/>

      <TableArea
          v-else
          ref="tableAreaRef"
          :data="tableData"
          :loading="loading"
          :columns="tableColumns"
          :tableConfig="tableConfig"
          :pageInfo="pagination"
          @operateClick="handleOperateButtonClick"
      >
        <!-- 透传所有插槽 -->
        <template v-for="slotName in Object.keys($slots)" #[slotName]="scope">
          <slot :name="slotName" v-bind="scope"/>
        </template>
      </TableArea>

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
        <slot :name="slot" v-bind="scope"/>
      </template>
    </DialogForm>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, watch, onMounted} from 'vue'
import {ElMessage, ElMessageBox} from 'element-plus'
import SearchArea from './search.vue'
import ToolbarArea from './toolbar.vue'
import TableArea from './table.vue'
import PaginationArea from './pagination.vue'
import DialogForm from './dialog.vue'
import CustomColumnsConfig from './custom-columns.vue'
import type {TableSetConfig, TableData, PageInfo, TableEmits, ToolbarButton} from './types'
import {filterType} from './const'
import {buildTableTree, shouldShowButton, enrichButton, flattenTableTree} from './utils'
import {useTableDictionaries} from './useTableDictionaries'
import {useTableCustomColumns} from './useTableCustomColumns'
import {useTableCustomSearch} from './useTableCustomSearch'
import {Icon80Settings as defaultColumnsIcon} from '../../icons'

defineOptions({ name: 'HdiTable' })

/**
 * 表格组件
 * 功能：集成搜索、工具栏、表格、分页和弹窗的完整表格解决方案
 * 支持：增删改查、批量操作、自定义列、自定义搜索、权限控制等功能
 */

// 类型定义
type DialogType = 'add' | 'edit' | 'view' | ''


// 组件属性
const props = withDefaults(
    defineProps<{
      config: TableSetConfig // 表格配置
      data?: TableData // 可选的外部数据（如不提供，通过 getTableData 事件获取）
    }>(),
    {
      data: () => ({records: [], totalNums: 0, totalPages: 1}),
    }
)

// 自动加载表格所需的字典数据
useTableDictionaries(() => props.config.items)

// 事件
const emit = defineEmits<TableEmits>()

// 表格区域引用
const tableAreaRef = ref()

// 核心状态
const loading = ref(false) // 表格加载状态
const searchData = ref({}) // 搜索条件
const _tableData = ref<TableData>({records: [], totalNums: 0, totalPages: 1}) // 内部表格数据
const pagination = ref<PageInfo>({
  pageNum: 1,
  pageSize: props.config.page ? (props.config.page as any).size || 10 : 10,
  total: 0,
})

// 弹窗状态
const dialogRef = ref() // DialogForm 引用
const dialogType = ref<DialogType>('') // 弹窗类型：add/edit/view
const currentRow = ref<any>(null) // 当前操作的行数据

// 原始可搜索字段（用于自定义搜索 popover 列表与显示判断）
const searchItemsRaw = computed(() =>
    flattenTableTree(props.config.items).filter((item) => item.isSearch !== false && !filterType.includes(item.type)) || []
)

// ===== 自定义列（自定义表头展示）=====
// 生成默认持久化 key（基于 rowKey + 路径，避免多表格冲突）
const customColumnsStorageKey = computed(() => {
  const rowKey = (props.config.table as any)?.rowKey || 'id'
  // 尝试用路由 path 作为命名空间，避免不同页面同 rowKey 冲突
  let ns = ''
  try {
    ns = (window.location?.pathname || '') + ':'
  } catch {
    ns = ''
  }
  return `${ns}hdi-table-columns:${rowKey}`
})

// 自定义列配置（响应式）：true/对象启用，未配置则不启用
const customColumnsConfig = computed(() => (props.config.table as any)?.customColumns)
// 是否启用自定义列
const isCustomColumnsEnabled = computed(() => !!customColumnsConfig.value)

// 所有可显示在表格中的列
const allTableItems = computed(() =>
    props.config.items.filter((item) => item.isTable !== false) || []
)

// 在 setup 期间只调用一次 composable，避免重复创建状态
const customColumnsState = useTableCustomColumns(
    allTableItems,
    customColumnsConfig,
    customColumnsStorageKey.value,
)

// 注册变化事件回调（仅启用时触发 emit）
customColumnsState.onChange((visibleProps, order) => {
  if (isCustomColumnsEnabled.value) {
    emit('columnsChange', visibleProps, order)
  }
})

// 自定义列顺序与可见性应用后的最终列
const tableColumns = computed(() => {
  const baseItems = allTableItems.value
  // 未启用自定义列：保持原行为
  if (!isCustomColumnsEnabled.value) {
    return buildTableTree(baseItems)
  }
  const visibleSet = new Set(customColumnsState.visibleProps.value)
  // 按 state.order.value 重排序：仅取可见项；order 中可能含已被移除的 prop，需过滤
  const orderedVisibleItems: typeof baseItems = []
  customColumnsState.order.value.forEach((prop) => {
    const found = baseItems.find((it) => it.prop === prop)
    if (found && visibleSet.has(prop)) {
      orderedVisibleItems.push(found)
    }
  })
  // 兜底：原始顺序中存在但 order 中漏掉的可见项追加到末尾
  baseItems.forEach((it) => {
    if (it.prop && visibleSet.has(it.prop) && !orderedVisibleItems.includes(it)) {
      orderedVisibleItems.push(it)
    }
  })
  return buildTableTree(orderedVisibleItems)
})

// ===== 自定义搜索 =====
const customSearchStorageKey = computed(() => {
  let ns = ''
  try {
    ns = (window.location?.pathname || '') + ':'
  } catch {
    ns = ''
  }
  return `${ns}hdi-table-custom-search`
})

const customSearchConfig = computed(() => props.config.customSearch)
const isCustomSearchEnabled = computed(() => !!customSearchConfig.value)

const allSearchItemsRef = computed(() => props.config.items || [])
const customSearchState = useTableCustomSearch(
    allSearchItemsRef,
    customSearchConfig,
    customSearchStorageKey.value,
)

customSearchState.onChange((visibleProps, advancedExpanded) => {
  if (isCustomSearchEnabled.value) {
    emit('searchChange', visibleProps, advancedExpanded)
  }
})

// 实际渲染的搜索项：根据自定义搜索状态过滤
const searchItems = computed(() => {
  const raw = searchItemsRaw.value
  if (!isCustomSearchEnabled.value) return raw
  const visibleSet = new Set(customSearchState.visibleProps.value)
  return raw.filter((item) => {
    if (!item.prop) return true
    if (!visibleSet.has(item.prop)) return false
    // 高级搜索收起时，隐藏 isAdvanced 字段
    if (item.isAdvanced === true && !customSearchState.advancedExpanded.value) {
      return false
    }
    return true
  })
})

// 是否显示搜索区域
const showSearch = computed(() => {
  if (props.config.search === false) return false
  // 启用自定义搜索时，只要有可配置的搜索字段就显示搜索区（即使当前过滤后为空也保留区域）
  if (isCustomSearchEnabled.value && searchItemsRaw.value.length > 0) {
    // 若高级搜索未展开且全部字段均为高级，则隐藏（避免空白搜索区）
    if (searchItems.value.length === 0) return false
    return true
  }
  return !!searchItems.value?.length
})
// 是否显示工具栏, toolbar不设置为false且有工具栏按钮（或启用自定义列按钮）
const showToolbar = computed(
    () => props.config.toolbar !== false && !!(leftToolbarButtons.value?.length || rightToolbarButtons.value.length || isCustomColumnsEnabled.value)
)
// 是否显示分页, page不设置为false且有数据
const showPagination = computed(
    () => props.config.page !== false && pagination.value.total > 0
)

// 搜索配置
const searchConfig = computed(() => ({
  items: searchItems.value,
  inline: true,
  labelWidth: 'auto',
  submitButtonText: '查询',
  cols: 4,
  ...props.config.search,
}))

// 表格配置
const tableConfig = computed(() => {
  return {
    // 默认配置
    tableBoxType: 'table',
    // 用户配置覆盖
    ...props.config.table
  }
})

// 表格数据：优先使用父组件传入的 data prop，否则使用内部数据
const tableData = computed(() => {
  const data = props.data && props.data.records?.length > 0 ? props.data : _tableData.value
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
  // 排除 size 字段，它是框架自定义的初始 pageSize，不是 el-pagination 的 prop
  const { size: _size, total: _total, ...restPageConfig } = (props.config.page as any) || {}
  return {
    layout: 'total, sizes, prev, pager, next',
    pageSizes: [10, 20, 50, 100],
    background: true,
    hideOnSinglePage: false,
    align: 'center',
    // 用户配置覆盖（已排除 size 和 total）
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

/**
 * 加载数据
 * 触发getTableData事件，由父组件处理数据加载
 * 父组件通过 callback(data) 回传数据
 */
const loadData = () => {
  loading.value = true
  emit('getTableData', pagination.value, searchData.value, (data?: TableData) => {
    loading.value = false
    if (data) {
      _tableData.value = data
      pagination.value.total = data.totalNums || 0
      if (pagination.value.pageNum > (data.totalPages || 1)) {
        pagination.value.pageNum = 1
      }
    }
  })
}

// 事件处理
/**
 * 搜索提交
 * @param data 搜索条件
 */
const handleSearchSubmit = (data: any) => {
  searchData.value = data
  pagination.value.pageNum = 1
  loadData()
}

/**
 * 搜索重置
 */
const handleSearchReset = () => {
  searchData.value = {}
  pagination.value.pageNum = 1
  loadData()
}

/**
 * 页码变更
 * @param page 页码
 * @param size 每页大小
 */
const pageChange = (page: number, size: number) => {
  pagination.value.pageNum = page
  pagination.value.pageSize = size
  loadData()
  emit('pageChange', page, size)
}

/**
 * 每页大小变更
 * @param size 每页大小
 */
const handleSizeChange = (size: number) => {
  pagination.value.pageSize = size
  pagination.value.pageNum = 1
  loadData()
}

// 工具栏按钮点击
/**
 * 工具栏按钮点击
 * @param btn 按钮配置
 */
const handleToolbarButtonClick = (btn: ToolbarButton) => {
  const {btnType} = btn
  if (btnType === 'add') {
    // 新增按钮点击, 打开新增弹窗
    openDialog('add')
  } else if (btnType === 'batchDelete') {
    // 批量删除按钮点击, 执行批量删除操作
    handleBatchDelete()
  } else if (btnType === 'import') {
    // 导入按钮点击, 触发导入事件
    emit('tableImport', (_info: any, _type: 'Blob' | 'url', _fileName?: string) => {
      // 导入成功后刷新数据
      if (_info) loadData()
    }, pagination.value, searchData.value)
  } else if (btnType === 'export') {
    // 导出按钮点击, 触发导出事件
    emit('tableExport', pagination.value, searchData.value)
  } else if (btnType === 'refresh') {
    // 刷新按钮点击, 刷新数据
    loadData()
  } else {
    // 其他按钮点击, 触发自定义事件
    emit('toolbarButtonClick', btn, (result: any) => {
      // 自定义事件返回结果不为false时，刷新数据
      if (result !== false) {
        loadData()
      }
    })
  }
}

// 操作按钮点击
/**
 * 操作按钮点击
 * @param btn 按钮配置
 * @param row 行数据
 */
const handleOperateButtonClick = (btn: ToolbarButton, row: any) => {
  const {btnType} = btn
  if (btnType === 'view' || btnType === 'edit') {
    openDialog(btnType, row)
  } else if (btnType === 'delete') {
    // 统一的删除确认逻辑
    ElMessageBox.confirm(`确定删除该数据吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
        .then(() => {
          loading.value = true
          emit('delSubmit', row, [row[tableConfig.value.rowKey || 'id']],  (info: any) => {
            loading.value = false
            if (info !== false) {
              ElMessage.success(info.msg || '删除成功')
              loadData()
            }
          })
        })
        .catch(() => {
        })
  } else {
    emit('operateButtonClick', btn, row, (data: any) => {
      if (data !== false) loadData()
    })
  }
}

// 批量删除
const handleBatchDelete = () => {
  let selection = getElTable()?.getSelectionRows()
  if (selection.length === 0) {
    ElMessage.warning('请先选择要删除的数据')
    return
  }
  const ids = selection.map((item: any) => item[tableConfig.value.rowKey || 'id'])
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
            selection = []
            loadData()
          }
        })
      })
      .catch(() => {
      })
}

/**
 * 打开弹窗
 * @param type 弹窗类型
 * @param row 行数据
 */
const openDialog = (type: 'add' | 'edit' | 'view', row?: any) => {
  dialogType.value = type
  if (type === 'add') {
    currentRow.value = null
  } else {
    currentRow.value = row
  }
  const dialogTitleMap: Record<string, string> = {add: '新增', edit: '编辑', view: '查看'}
  const dialogWidth = props.config.dialog ? ((props.config.dialog as any).width || '50%') : '50%'
  dialogRef.value?.open({
    type,
    record: row,
    title: dialogTitleMap[type],
    width: dialogWidth,
  })
}

/**
 * 弹窗提交
 * 触发addSubmit或editSubmit事件，由父组件处理提交逻辑
 */
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

/**
 * 弹窗取消
 */
const handleDialogCancel = () => {
  if (dialogType.value === 'add') {
    // 新增取消，无需额外处理
  } else if (dialogType.value === 'edit' && currentRow.value) {
    // 编辑取消，无需额外处理
  }
}

/**
 * 弹窗关闭
 * 重置弹窗状态
 */
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

// 监听页码大小变化
watch(
    () => props.config.page ? (props.config.page as any).size : undefined,
    (newSize) => {
      if (newSize) pagination.value.pageSize = newSize
    }
)

// 监听数据变化（仅当父组件显式传入 data prop 时才覆盖内部数据）
watch(
    () => props.data,
    (newData) => {
      if (newData && newData.records?.length > 0) {
        _tableData.value = newData
        pagination.value.total = newData.totalNums || 0
      }
    },
    {immediate: true, deep: true}
)


// 获取 el-table 实例
const getElTable = () => {
  return tableAreaRef.value?.tableRef
}

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
    if (page) pagination.value = {...pagination.value, ...page}
    loadData()
  },
  pageChange,
  refresh: loadData,
  // 直接暴露 el-table 的常用方法
  clearSelection: () => getElTable()?.clearSelection(),
  getSelectionRows: () => getElTable()?.getSelectionRows() || [],
  toggleRowSelection: (row: any, selected?: boolean) => getElTable()?.toggleRowSelection(row, selected),
  toggleAllSelection: () => getElTable()?.toggleAllSelection(),
  setCurrentRow: (row?: any) => getElTable()?.setCurrentRow(row),
  // 保留获取 el-table 的方法，兼容旧代码
  getElTable,
  // 自定义列（自定义表头展示）相关方法
  resetCustomColumns: () => customColumnsState.reset(),
  getCustomColumnsState: () => customColumnsState,
  // 自定义搜索相关方法
  resetCustomSearch: () => customSearchState.reset(),
  toggleAdvancedSearch: () => customSearchState.toggleAdvanced(),
  getCustomSearchState: () => customSearchState,
})
</script>

<style scoped lang="scss">
/**
 * 表格组件样式
 */
.page-table-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 头部样式 */
.page-table-header {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 头部横向布局 */
.page-table-header.is-row {
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
}

/* 表格区域样式 */
.table-area {
  flex: 1;
  overflow: auto;
  height: 0; /* 配合flex:1实现自适应高度 */
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
