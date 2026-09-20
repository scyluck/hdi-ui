/**
 * useDataView
 * 数据视图组件（Table / CardList / InfiniteScroll）公共数据层逻辑
 * 职责：加载状态、搜索、分页、工具栏按钮、操作按钮、批量删除、弹窗、字典加载
 *
 * 各组件的差异点通过注入点处理：
 * - selection：选择行能力的来源（el-table 实例 / CardArea / 无）
 * - getRowKey：删除操作取主键的字段名来源
 */
import { ref, computed, watch, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { PaginationProps } from 'element-plus'
import type { FormConfig } from '../components/Form/types'
import type {
  TableColumn,
  TableData,
  PageInfo,
  ToolbarButton,
  DialogConfig,
} from '../components/Table/types'
import { filterType } from '../components/Table/const'
import { flattenTableTree, shouldShowButton, enrichButton } from '../components/Table/utils'
import { useTableDictionaries } from '../components/Table/useTableDictionaries'

/** 公共配置基础类型：TableSetConfig 与 CardListSetConfig 都满足该结构 */
export interface BaseDataViewConfig {
  /**
   * 列配置数组（同时控制搜索栏、展示区、弹窗）。
   * Table 必填（列定义）；CardList/InfiniteScroll 在使用 `#card`/`#item` 插槽完全自定义渲染时可省略。
   */
  items?: TableColumn[]
  search?: FormConfig | false
  toolbar?: ToolbarButton[] | false
  page?: PaginationProps | false
  dialog?: DialogConfig | false
  isStartGet?: boolean
  isSearchAndToolbarRow?: boolean
}

/** 组件 props 的公共结构 */
export interface DataViewProps<T extends BaseDataViewConfig> {
  config: T
  data?: TableData
}

/** 选择能力注入：由各组件根据自身选择实现提供 */
export interface DataViewSelection {
  /** 获取当前选中行 */
  getRows: () => any[]
  /** 清空选中 */
  clear: () => void
  /** 切换单行选中 */
  toggle?: (row: any, selected?: boolean) => void
  /** 切换全选 */
  toggleAll?: () => void
}

/** useDataView 选项 */
export interface UseDataViewOptions<T extends BaseDataViewConfig> {
  props: DataViewProps<T>
  /** emit 函数（运行时为宽松类型，组件侧保留各自的严格 emit 类型） */
  emit: (event: string, ...args: any[]) => void
  /** 选择能力注入；不传时批量删除不可用 */
  selection?: DataViewSelection
  /** rowKey 取值函数，默认 () => 'id'，用于删除操作定位主键 */
  getRowKey?: () => string
  /**
   * 累积模式：pageNum > 1 时新数据 records 追加到已有列表尾部（无限滚动用）。
   * 默认 false：每次加载整页替换 internalData。
   * 累积模式下，搜索/重置会因 pageNum 重置为 1 而触发整页替换（清空旧数据）。
   */
  accumulative?: boolean
}

type DialogType = 'add' | 'edit' | 'view' | ''

/**
 * 数据视图公共逻辑
 */
export function useDataView<T extends BaseDataViewConfig>(options: UseDataViewOptions<T>) {
  const { props, emit } = options
  const selection = options.selection
  const getRowKey = options.getRowKey ?? (() => 'id')
  const accumulative = options.accumulative ?? false

  // 自动加载配置项中引用的字典数据
  useTableDictionaries(() => props.config.items || [])

  // ===== 核心状态 =====
  const loading = ref(false)
  const searchData = ref<Record<string, any>>({})
  const internalData = ref<TableData>({ records: [], totalNums: 0, totalPages: 1 })
  let latestLoadRequestId = 0
  const pagination = ref<PageInfo>({
    pageNum: 1,
    pageSize: props.config.page ? (props.config.page as any).size || 10 : 10,
    total: 0,
  })

  // ===== 弹窗状态 =====
  const dialogRef = ref()
  const dialogType = ref<DialogType>('')
  const currentRow = ref<any>(null)

  // ===== 计算：可搜索字段 =====
  const searchItemsRaw = computed(
    () =>
      flattenTableTree(props.config.items).filter(
        (item) => item.isSearch !== false && !filterType.includes(item.type)
      ) || []
  )

  // ===== 计算：数据记录（传入 data 时始终由外部受控，包括空数组） =====
  const dataRecords = computed(() => (props.data ?? internalData.value).records || [])

  // ===== 计算：工具栏按钮 =====
  const leftToolbarButtons = computed(() =>
    (props.config.toolbar || [])
      .filter((btn) => btn.direction === 'left' && shouldShowButton(btn))
      .map(enrichButton)
  )

  const rightToolbarButtons = computed(() =>
    (props.config.toolbar || [])
      .filter((btn) => btn.direction !== 'left' && shouldShowButton(btn))
      .map(enrichButton)
  )

  // ===== 计算：是否显示工具栏 =====
  // 注意：Table 启用自定义列时需要在工具栏注入列设置按钮，由各组件自行增强此判断
  const showToolbar = computed(
    () =>
      props.config.toolbar !== false &&
      !!(leftToolbarButtons.value?.length || rightToolbarButtons.value.length)
  )

  // ===== 计算：是否显示分页 =====
  const showPagination = computed(
    () => props.config.page !== false && pagination.value.total > 0
  )

  // ===== 计算：分页配置 =====
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

  // ===== 计算：弹窗表单配置 =====
  const dialogFormConfig = computed(() => {
    if (!dialogType.value) return { items: [] }
    const typeKey = dialogType.value
    const dialogFormItems =
      flattenTableTree(props.config.items).filter((item) => {
        const isShow =
          item[`is${typeKey.charAt(0).toUpperCase() + typeKey.slice(1)}`] !== false
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
      ...(props.config.dialog ? (props.config.dialog as any).form || {} : {}),
    }
  })

  // ===== 数据加载 =====
  const loadData = () => {
    const requestId = ++latestLoadRequestId
    const pageInfo = { ...pagination.value }
    const formSearch = { ...searchData.value }
    loading.value = true
    emit('getTableData', pageInfo, formSearch, (data?: TableData) => {
      // 搜索、翻页等操作可能并发进行；迟到的响应不能覆盖最新结果。
      if (requestId !== latestLoadRequestId) return
      loading.value = false
      if (data) {
        // 累积模式：pageNum > 1 时追加；pageNum === 1（首屏/搜索/重置）整页替换
        if (accumulative && pageInfo.pageNum > 1) {
          internalData.value = {
            ...data,
            records: [...internalData.value.records, ...data.records],
          }
        } else {
          internalData.value = data
        }
        pagination.value.total = data.totalNums || 0
        // 累积模式下不重置 pageNum（避免触底越界回到第 1 页），仅替换模式处理越界
        if (!accumulative && pageInfo.pageNum > (data.totalPages || 1)) {
          pagination.value.pageNum = 1
        }
      }
    })
  }

  // ===== 搜索 =====
  const handleSearchSubmit = (data: any) => {
    searchData.value = data
    pagination.value.pageNum = 1
    loadData()
  }

  const handleSearchReset = () => {
    searchData.value = {}
    pagination.value.pageNum = 1
    loadData()
  }

  // ===== 分页 =====
  const pageChange = (page: number, size: number) => {
    pagination.value.pageNum = page
    pagination.value.pageSize = size
    loadData()
    emit('pageChange', page, size)
  }

  const handleSizeChange = (size: number) => {
    pagination.value.pageSize = size
    pagination.value.pageNum = 1
    loadData()
  }

  // ===== 工具栏按钮 =====
  const handleToolbarButtonClick = (btn: ToolbarButton) => {
    const { btnType } = btn
    if (btnType === 'add') {
      openDialog('add')
    } else if (btnType === 'batchDelete') {
      handleBatchDelete()
    } else if (btnType === 'import') {
      emit(
        'tableImport',
        (_info: any, _type: 'Blob' | 'url', _fileName?: string) => {
          if (_info) loadData()
        },
        pagination.value,
        searchData.value
      )
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

  // ===== 操作按钮 =====
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
          emit('delSubmit', row, [row[getRowKey()]], (info: any) => {
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

  // ===== 批量删除 =====
  const handleBatchDelete = () => {
    if (!selection) return
    let selected = selection.getRows()
    if (selected.length === 0) {
      ElMessage.warning('请先选择要删除的数据')
      return
    }
    const ids = selected.map((item: any) => item[getRowKey()])
    ElMessageBox.confirm(`确定删除选中的 ${selected.length} 条数据吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        loading.value = true
        emit('delSubmit', selected, ids, (result: any) => {
          loading.value = false
          if (result !== false) {
            ElMessage.success(result.msg || `删除成功 ${selected.length} 条数据`)
            selection.clear()
            selected = []
            loadData()
          }
        })
      })
      .catch(() => {})
  }

  // ===== 弹窗 =====
  const openDialog = (type: 'add' | 'edit' | 'view', row?: any) => {
    dialogType.value = type
    if (type === 'add') {
      currentRow.value = null
    } else {
      currentRow.value = row
    }
    // 不再手动计算 title / width：
    // - HdiFormDialog 按 type 内建默认 title（新增/编辑/查看）
    // - config.dialog.title / width / mode / direction 等属性通过 DialogForm
    //   的 dialogConfig prop 直接透传到 HdiFormDialog props，与 FormConfig 一致。
    dialogRef.value?.open({
      type,
      record: row,
    })
  }

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

  const handleDialogCancel = () => {}

  const handleDialogClosed = () => {
    dialogType.value = ''
    currentRow.value = null
  }

  // ===== 生命周期 =====
  onMounted(() => {
    if (props.config.isStartGet !== false) {
      loadData()
    }
  })

  watch(
    () => (props.config.page ? (props.config.page as any).size : undefined),
    (newSize) => {
      if (newSize) pagination.value.pageSize = newSize
    }
  )

  watch(
    () => [props.data?.records, props.data?.totalNums, props.data?.totalPages] as const,
    () => {
      const newData = props.data
      if (newData) {
        internalData.value = newData
        pagination.value.total = newData.totalNums || 0
      }
    },
    { immediate: true }
  )

  // ===== 供组件 expose 复用的方法 =====
  const closeTheLoading = (off = true) => {
    loading.value = !off
  }

  const searchSubmit = (info?: Record<string, any>, page?: any) => {
    if (info) searchData.value = info
    if (page) pagination.value = { ...pagination.value, ...page }
    loadData()
  }

  return {
    // 状态
    loading,
    searchData,
    internalData,
    pagination,
    dialogRef,
    dialogType,
    currentRow,
    // 计算
    dataRecords,
    searchItemsRaw,
    leftToolbarButtons,
    rightToolbarButtons,
    showToolbar,
    showPagination,
    paginationConfig,
    dialogFormConfig,
    // 方法
    loadData,
    handleSearchSubmit,
    handleSearchReset,
    pageChange,
    handleSizeChange,
    handleToolbarButtonClick,
    handleOperateButtonClick,
    handleBatchDelete,
    openDialog,
    handleDialogSubmit,
    handleDialogCancel,
    handleDialogClosed,
    closeTheLoading,
    searchSubmit,
    // 选择能力（原样透传，供组件 expose）
    selection,
  }
}
