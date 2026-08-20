import type { TableSetConfig, TableData, PageInfo, ToolbarButton, TableColumn } from '../Table/types'

/**
 * 卡片网格布局配置
 */
export interface CardGridConfig {
  /** 每行列数（默认 4），优先级低于响应式断点 */
  cols?: number
  /** 卡片间距 px，默认 16 */
  gutter?: number
  /** 响应式列数：<768px 时 */
  xs?: number
  /** ≥768px */
  sm?: number
  /** ≥992px */
  md?: number
  /** ≥1200px */
  lg?: number
  /** ≥1920px */
  xl?: number
}

/**
 * 单个卡片的渲染配置
 */
export interface CardItemConfig {
  /** 封面图字段名（取 row[coverField]） */
  coverField?: string
  /** 封面图占位提示 */
  coverPlaceholder?: string
  /** 封面图高度，默认 180 */
  coverHeight?: number | string
  /** 封面图 fit 模式，默认 'cover' */
  coverFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  /** 标题字段名 */
  titleField?: string
  /** 描述字段名 */
  descField?: string
  /** 需要在卡片内容区展示的字段列表（来自 items 的 prop） */
  showFields?: string[]
  /** 阴影：always / hover / never，默认 'hover' */
  shadow?: 'always' | 'hover' | 'never'
  /** 卡片 body 样式 */
  bodyStyle?: Record<string, any>
  /** 是否支持选择，默认 false */
  selectable?: boolean
  /** 操作按钮位置：bottom 卡片底部 / top 右上角悬浮，默认 'bottom' */
  operatePosition?: 'bottom' | 'top'
}

/**
 * 卡片列表专用配置（替代 Table 的 table 字段）
 */
export interface CardListConfig {
  /** 网格布局 */
  grid?: CardGridConfig
  /** 单卡片渲染 */
  card?: CardItemConfig
  /** 行数据的唯一标识字段名，默认 'id' */
  rowKey?: string
  /** 空数据文案，默认 '暂无数据' */
  emptyText?: string
}

/**
 * 卡片列表整体配置
 * 与 TableSetConfig 几乎一致，仅将 `table` 替换为 `cardList`
 */
export interface CardListSetConfig extends Omit<TableSetConfig, 'table'> {
  /** 卡片列表专用配置 */
  cardList?: CardListConfig
}

/**
 * 卡片列表事件（与 TableEmits 一致，额外支持 selectionChange）
 */
export interface CardListEmits {
  (e: 'getTableData', pageInfo: PageInfo, formSearch: Record<string, any>, callback?: (data?: TableData) => void): void
  (e: 'pageChange', currentPage: number, pageSize: number): void
  (e: 'addSubmit', formData: any, callback: (info?: any) => void): void
  (e: 'editSubmit', formData: any, callback: (info?: any) => void): void
  (e: 'delSubmit', formData: any, ids: any[], callback: (info?: any) => void): void
  (e: 'toolbarButtonClick', btnInfo: any, callback: (data?: any) => void): void
  (e: 'operateButtonClick', btnInfo: any, rowData: any, callback: (data?: any) => void): void
  (e: 'tableImport', callback: (info: any, type: 'Blob' | 'url', fileName?: string) => void, formData?: any, searchData?: any): void
  (e: 'tableExport', formData?: any, searchData?: any): void
  /** 选择变化事件（卡片选择不依赖 el-table） */
  (e: 'selectionChange', selection: any[]): void
  /** 卡片点击事件 */
  (e: 'cardClick', rowData: any, index: number): void
}

export type { TableData, PageInfo, ToolbarButton, TableColumn }
