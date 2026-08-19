// types.ts
import type { FormItem, FormConfig } from '../Form/types'
import type { PaginationProps } from 'element-plus'
import type { Component } from 'vue'

// 自定义列配置（自定义表头展示）
export interface CustomColumnsConfig {
  // localStorage 持久化的 key，未设置时根据 rowKey 自动生成，传 false 关闭本地持久化
  storageKey?: string | false
  // 是否允许拖拽排序，默认 true
  enableReorder?: boolean
  // 不可隐藏/不可移除的列 prop 列表（默认包含 selection / index / expand / operate）
  fixedProps?: string[]
  // 默认隐藏的列 prop 列表
  defaultHidden?: string[]
  // 按钮文字，默认 '列设置'
  buttonText?: string
  // 按钮图标，默认使用框架内置图标
  icon?: Component
  // 自定义按钮透传到 el-button 的属性
  btnBind?: Record<string, any>
}

// 自定义搜索配置
export interface CustomSearchConfig {
  // localStorage 持久化的 key，未设置时自动生成，传 false 关闭本地持久化
  storageKey?: string | false
  // 是否启用「高级搜索」展开/收起能力，默认 true
  enableAdvanced?: boolean
  // 高级搜索触发按钮文字，默认 '高级搜索'
  advancedLabel?: string
  // 高级搜索收起按钮文字，默认 '收起'
  advancedCollapseLabel?: string
  // 不可隐藏的搜索字段 prop 列表
  fixedProps?: string[]
  // 默认隐藏的搜索字段 prop 列表
  defaultHidden?: string[]
  // 自定义搜索按钮文字，默认 '自定义搜索'
  buttonText?: string
  // 自定义搜索按钮图标
  icon?: Component
  // 自定义按钮透传到 el-button 的属性
  btnBind?: Record<string, any>
}

// 表格列配置
export interface TableColumn extends FormItem {
  // 扩展列的类型
  // 包含form和table中所支持的所有类型
  // form的类型请参考form组件的类型
  // table的类型包括 'default' | 'selection' | 'index' | 'expand' | 'operate'
  type: string
  isSearch?: boolean    // 搜索栏中是否显示，默认 true
  isTable?: boolean    // 表格列中是否显示，默认 true
  isAdd?: boolean    // 新增弹窗中是否显示，默认 true
  isEdit?: boolean   // 编辑弹窗中是否显示，默认 true
  isView?: boolean   // 查看弹窗中是否显示，默认 true
  // 搜索字段是否属于「高级搜索」（默认收起，开启自定义搜索时生效），默认 false
  isAdvanced?: boolean
  tableCellType?: 'TEXT' | 'ENUM' | 'ENUMS' | 'BOOLEAN' | 'DATE' | 'TAG' | 'SLOT'
  // 配合tableCellType使用
  // TEXT \ Enum \ TAG：设置无效
  // Enums：数据的分隔符，默认为逗号。
  // DATE: 日期格式化类型，默认YYYY-MM-DD HH:mm:ss。
  // BOOLEAN: 布尔值显示的文字，默认’是，否‘。
  // SLOT：插槽名称。
  tableCellFormatter?: string // 单元格内容的格式化配置
  children?: TableColumn[]
  bindCell?: Record<string, any> // 单元格内容的属性
  bindColumn?: Record<string, any> // 列的属性
  tableColumnSlots?: Record<string, any> // 自定义表格列插槽
}

// 表格配置
export interface TableConfig {
  tableBoxType?: 'table' | 'slot' // 表格组件的类型，默认为table, 可选值为table, slot,插槽名为tableBox
  maxHeight?: string,
  rowKey?: string,
  tableSlots?: Record<string, any> // 自定义插槽
  tableAttrs?: Record<string, any> // element-plus table组件的Table 属性
  tableEvents?: Record<string, (...args: any[]) => void> // 表格事件
  // 自定义列（自定义表头展示），传 true 使用默认配置，传对象覆盖默认配置
  customColumns?: boolean | CustomColumnsConfig
}

// 指令配置
export type directiveConfig = {
  hasPermission?: string | string[]
  hasNoPermission?: string | string[]
  hasAnyPermission?: string | string[]
}

// 工具栏按钮配置
export interface ToolbarButton {
  btnType: string
  btnName?: string
  icon?: string | Component
  direction?: 'left' | 'right'
  show?: boolean | ((row?: any) => boolean)
  disabled?: boolean | ((row?: any) => boolean)
  btnBind?: Record<string, any>
  isFold?: boolean // 是否放到折叠里
  directive?: directiveConfig
}

// 弹窗配置
export interface DialogConfig {
  title?: string
  width?: string
  height?: string
  showClose?: boolean
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
  appendToBody?: boolean,
  form?: FormConfig | false,
  slots?: Record<string, any> // 自定义插槽
}

// 表格整体配置
export interface TableSetConfig {
  items: TableColumn[]
  table?: TableConfig
  search?: FormConfig | false
  // 自定义搜索，传 true 使用默认配置，传对象覆盖默认配置
  customSearch?: boolean | CustomSearchConfig
  toolbar?: ToolbarButton[] | false
  page?: PaginationProps | false
  dialog?: DialogConfig | false
  isStartGet?: boolean// 是否自动获取数据，默认为true
  isSearchAndToolbarRow?: boolean // search栏和toolbar栏是否显示在同一行
}

// 表格数据
export interface TableData {
  records: any[]
  totalNums: number
  totalPages: number
  [key: string]: any
}

// 表格事件
export interface TableEmits {
  (
    e: 'getTableData',
    pageInfo: PageInfo,
    formSearch: Record<string, any>,
    callback?: (data?: TableData) => void,
  ): void // 获取表格数据
  (e: 'pageChange', currentPage: number, pageSize: number): void // 分页变化事件
  (e: 'addSubmit', formData: any, callback: (info?: any) => void): void // 新增提交事件
  (e: 'editSubmit', formData: any, callback: (info?: any) => void): void // 编辑提交事件
  (e: 'delSubmit', formData: any, ids: any[], callback: (info?: any) => void): void // 删除提交事件
  (e: 'toolbarButtonClick', btnInfo: any, callback: (data?: any) => void): void // 工具栏按钮点击事件
  (e: 'operateButtonClick', btnInfo: any, rowData: any, callback: (data?: any) => void): void // 操作按钮点击事件
  (e: 'tableImport', callback: (info: any, type: 'Blob' | 'url', fileName?: string) => void, formData?: any, searchData?: any): void // 导入表格事件
  (e: 'tableExport', formData?: any, searchData?: any): void // 导出表格事件
  // 自定义列变化事件：visibleProps 为当前显示的列 prop 列表（按显示顺序），order 为当前顺序
  (e: 'columnsChange', visibleProps: string[], order: string[]): void
  // 自定义搜索变化事件：visibleProps 为当前显示的搜索字段 prop 列表，advancedExpanded 为高级搜索是否展开
  (e: 'searchChange', visibleProps: string[], advancedExpanded: boolean): void
 }

// 分页信息
export interface PageInfo {
  pageNum: number
  pageSize: number,
  total: number,
}

// 表格引用方法
export interface TableExpose {
  closeTheLoading: (off?: boolean) => void
  openDialog: (type: 'add' | 'edit' | 'view', row?: any) => void
  closeDialog: () => void
  searchSubmit: (info?: Record<string, any>, page?: any) => void
  handlePageChange: (page: number, size: number) => void
  refresh: () => void
  clearSelection: () => void
  getSelectionRows: () => any[]
  toggleRowSelection: (row: any, selected?: boolean) => void
  setCurrentRow: (row?: any) => void
  tableRef: any
  // 自定义列（自定义表头展示）
  resetCustomColumns: () => void
  getCustomColumnsState: () => any
  // 自定义搜索
  resetCustomSearch: () => void
  toggleAdvancedSearch: () => void
  getCustomSearchState: () => any
}
