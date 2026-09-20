import type { TableSetConfig, TableData, PageInfo, ToolbarButton, TableColumn } from '../Table/types'

/**
 * 无限滚动配置
 */
export interface InfiniteScrollConfig {
  /** 行数据唯一标识字段名，默认 'id' */
  rowKey?: string
  /** 滚动容器高度（传给 el-scrollbar 的 height），默认 '100%' */
  height?: string | number
  /** 触底距离阈值 px，距底部小于该值即触发加载下一页，默认 50 */
  threshold?: number
  /** 每页条数（内部按分页请求，但不渲染分页器），默认 10 */
  pageSize?: number
  /** 是否启用虚拟渲染，默认 true；关闭后渲染全部已加载项目 */
  virtual?: boolean
  /** 项目未完成测量时使用的预估高度 px，默认 96 */
  estimatedItemHeight?: number
  /** 视口上下额外保留的项目数，默认 5 */
  overscan?: number
  /** 空数据文案，默认 '暂无数据' */
  emptyText?: string
  /** 加载中文案，默认 '加载中...' */
  loadingText?: string
  /** 没有更多数据时的文案，默认 '没有更多了' */
  noMoreText?: string
  /**
   * 默认列表项展示的字段（取 items 中的 prop）。
   * 未提供时，默认展示所有 isTable !== false 且具有 prop 的字段。
   * 提供时按给定顺序展示对应字段。
   */
  showFields?: string[]
}

/**
 * 无限滚动整体配置
 * 与 TableSetConfig 一致，仅将 `table` 与 `page`（无分页器）替换为 `infiniteScroll`
 */
export interface InfiniteScrollSetConfig extends Omit<TableSetConfig, 'table' | 'page' | 'items'> {
  /**
   * 列配置数组（同时控制搜索栏、列表项、弹窗）。
   * 使用 `#item` 插槽完全自定义列表项内容时可省略。
   */
  items?: TableColumn[]
  /** 无限滚动专用配置 */
  infiniteScroll?: InfiniteScrollConfig
}

/**
 * 无限滚动事件
 */
export interface InfiniteScrollEmits {
  (e: 'getTableData', pageInfo: PageInfo, formSearch: Record<string, any>, callback?: (data?: TableData) => void): void
  (e: 'addSubmit', formData: any, callback: (info?: any) => void): void
  (e: 'editSubmit', formData: any, callback: (info?: any) => void): void
  (e: 'delSubmit', formData: any, ids: any[], callback: (info?: any) => void): void
  (e: 'toolbarButtonClick', btnInfo: any, callback: (data?: any) => void): void
  (e: 'operateButtonClick', btnInfo: any, rowData: any, callback: (data?: any) => void): void
  (e: 'tableImport', callback: (info: any, type: 'Blob' | 'url', fileName?: string) => void, formData?: any, searchData?: any): void
  (e: 'tableExport', formData?: any, searchData?: any): void
  /** 触底加载下一页时触发，pageInfo 为即将请求的分页信息 */
  (e: 'loadMore', pageInfo: PageInfo): void
}

export type { TableData, PageInfo, ToolbarButton, TableColumn }
