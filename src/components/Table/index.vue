<template>
  <div class="page-table-container">
    <!-- 头部：搜索 + 工具栏 -->
    <div :class="['page-table-header', { 'is-row': config.isSearchAndToolbarRow }]">
      <SearchArea
          :show="showSearch"
          :searchConfig="searchConfig"
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
      />
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
        v-model:visible="dialogVisible"
        v-model:formData="dialogFormData"
        :type="dialogType"
        :title="dialogTitle"
        :width="dialogWidth"
        :formConfig="dialogFormConfig"
        :loading="dialogLoading"
        @submit="handleDialogSubmit"
        @reset="handleDialogReset"
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
import type {TableSetConfig, TableData, PageInfo, TableEmits, ToolbarButton} from './types'
import {filterType} from './const'
import {buildTableTree, shouldShowButton, enrichButton, flattenTableTree} from './utils'
import {useTableDictionaries} from './useTableDictionaries'

defineOptions({ name: 'HdiTable' })

/**
 * 表格组件
 * 功能：集成搜索、工具栏、表格、分页和弹窗的完整表格解决方案
 * 支持：增删改查、批量操作、自定义列、权限控制等功能
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
const dialogVisible = ref(false) // 弹窗可见性
const dialogType = ref<DialogType>('') // 弹窗类型：add/edit/view
const currentRow = ref<any>(null) // 当前操作的行数据
const dialogFormData = ref<Record<string, any>>({}) // 弹窗表单数据
const dialogLoading = ref(false) // 弹窗加载状态

const searchItems = computed(() => flattenTableTree(props.config.items).filter((item) => item.isSearch !== false && !filterType.includes(item.type)) || [])
// 是否显示搜索区域, search不设置为false且有搜索项
const showSearch = computed(() => props.config.search !== false && !!searchItems.value?.length)
// 是否显示工具栏, toolbar不设置为false且有工具栏按钮
const showToolbar = computed(
    () => props.config.toolbar !== false && !!(leftToolbarButtons.value?.length || rightToolbarButtons.value.length)
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

// 表格列配置
const tableColumns = computed(() =>
    buildTableTree(props.config.items.filter((item) => item.isTable !== false) || [])
)

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
const paginationConfig = computed(() => ({
  layout: 'total, sizes, prev, pager, next',
  pageSizes: [10, 20, 50, 100],
  background: true,
  hideOnSinglePage: false,
  align: 'center',
  // 用户配置覆盖
  ...props.config.page,
}))

// 弹窗相关计算
const dialogTitle = computed(() => {
  const map = {add: '新增', edit: '编辑', view: '查看'}
  return map[dialogType.value || 'add'] || ''
})
const dialogWidth = computed(() => props.config.dialog ? ((props.config.dialog as any).width || '50%') : '50%')
const dialogFormItems = computed(() => {
  if (!dialogType.value) return []
  const typeKey = dialogType.value
  return flattenTableTree(props.config.items).filter((item) => {
    const isShow = item[`is${typeKey.charAt(0).toUpperCase() + typeKey.slice(1)}`] !== false
    return isShow && !filterType.includes(item.type)
  }) || []
})
const dialogFormConfig = computed(() => ({
  items: dialogFormItems.value,
  inline: false,
  labelWidth: 'auto',
  cols: 2,
  submitButtonText: '保存',
  resetButtonText: '取消',
  isReverseButton: true,
  showSubmit: dialogType.value !== 'view',
  showReset: dialogType.value !== 'view',
  ...(props.config.dialog ? (((props.config.dialog as any).form || {})) : {}),
}))

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
    dialogFormData.value = {}
    currentRow.value = null
  } else {
    currentRow.value = row
    dialogFormData.value = {...row}
  }
  dialogVisible.value = true
}

/**
 * 弹窗提交
 * 触发addSubmit或editSubmit事件，由父组件处理提交逻辑
 */
const handleDialogSubmit = () => {
  dialogLoading.value = true
  if (dialogType.value === 'add') {
    emit('addSubmit', dialogFormData.value, (result: any) => {
      dialogLoading.value = false
      if (result !== false) {
        dialogVisible.value = false
        loadData()
      }
    })
  } else if (dialogType.value === 'edit') {
    emit('editSubmit', {...currentRow.value, ...dialogFormData.value}, (result: any) => {
      dialogLoading.value = false
      if (result !== false) {
        dialogVisible.value = false
        loadData()
      }
    })
  }
}

/**
 * 弹窗重置
 * 重置弹窗表单数据
 */
const handleDialogReset = () => {
  if (dialogType.value === 'add') {
    dialogFormData.value = {}
  } else if (dialogType.value === 'edit' && currentRow.value) {
    dialogFormData.value = {...currentRow.value}
  }
}

/**
 * 弹窗关闭
 * 重置弹窗状态
 */
const handleDialogClosed = () => {
  dialogType.value = ''
  currentRow.value = null
  dialogFormData.value = {}
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
    dialogVisible.value = false
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
  getElTable
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
