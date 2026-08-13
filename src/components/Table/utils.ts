// utils.ts
import type {TableColumn, ToolbarButton} from './types'
import type {EventHandler} from '../Form/types'
import {
  getValueDisplayLabel
} from '../Form/utils'
import { permissionUtils } from '../../directives/permission'
import {defaultButtonMap} from './const'

/**
 * 构建表格树形结构
 * 如果 items 中存在 children，使用 children 作为子表头
 * 否则说明它是单表头
 */
export function buildTableTree(items: TableColumn[]): TableColumn[] {
  const result: TableColumn[] = []

  for (const item of items) {
    if (item.isTable === false) continue

    // 深度复制当前项，避免修改原始数据
    const tableItem: TableColumn = { ...item }

    // 如果有 children 且不为空，递归处理子项（只要有children就作为分组表头）
    if (tableItem.children && tableItem.children.length > 0) {
      const childItems = buildTableTree(tableItem.children)

      if (childItems.length > 0) {
        tableItem.children = childItems
      } else {
        // 如果没有有效的子项，移除 children 属性
        delete tableItem.children
      }
    } else {
      // 单表头，确保没有 children 属性
      delete tableItem.children
    }

    result.push(tableItem)
  }

  return result
}

/**
 * 扁平化表格树结构（用于某些需要扁平结构的场景）
 */
export function flattenTableTree(items: TableColumn[]): TableColumn[] {
  const result: TableColumn[] = []

  for (const item of items) {
    // 添加当前项
    const flatItem = { ...item }
    delete flatItem.children // 移除 children 属性
    result.push(flatItem)

    // 递归添加子项
    if (item.children && item.children.length > 0) {
      result.push(...flattenTableTree(item.children))
    }
  }

  return result
}

/**
 * 检查是否为分组表头
 */
export function isGroupHeader(column: TableColumn): boolean {
  if (!column) return false
  // 只要有 children 且不为空，就视为分组表头
  return !!(column.children && column.children.length > 0)
}


/**
 * 获取表格单元格显示内容
 */
export function getTableCellDisplay(column: TableColumn, row: Record<string, any>): string {
  const value = row[column?.prop || '']
  if (value === undefined || value === null) return ''
  switch (column.tableCellType) {
    case 'ENUM':
      return getEnumDisplay(column, value)

    case 'ENUMS':
      return getEnumsDisplay(column, value)

    case 'BOOLEAN':
      return getBooleanDisplay(value, column.tableCellFormatter)

    case 'DATE':
      return formatDateValue(value, column.tableCellFormatter)

    case 'TAG':
      return getEnumDisplay(column, value) // TAG类型也使用枚举显示逻辑

    default:
      return String(value)
  }
}

/**
 * 获取枚举类型显示
 */
function getEnumDisplay(column: TableColumn, value: any): string {
  return getValueDisplayLabel(value, column)
}

/**
 * 获取多值枚举显示
 */
function getEnumsDisplay(column: TableColumn, value: any): string {
  const separator = column.tableCellFormatter || ','
  const values = Array.isArray(value) ? value : String(value).split(separator)
  return values.map((v) => getEnumDisplay(column, v.trim()) || v).join(separator)
}

/**
 * 获取布尔值显示
 */
function getBooleanDisplay(value: any, format?: string): string {
  const parts = format?.split(',') || []
  const trueText = parts[0] || '是'
  const falseText = parts[1] || '否'

  if (value === 'true' || value === true || value === '1' || value === 1) return trueText
  if (value === 'false' || value === false || value === '0' || value === 0) return falseText
  return String(value)
}

/**
 * 格式化日期值
 */
function formatDateValue(value: any, format?: string): string {
  if (!value) return ''

  // 这里可以接入日期格式化工具
  try {
    const date = new Date(value)
    if (isNaN(date.getTime())) return String(value)
    return formatTime(value, format || 'YYYY-MM-DD HH:mm:ss')
  } catch {
    return String(value)
  }
}

/**
 * 处理表格配置合并
 */
export function mergeTableConfig(defaultConfig: any, userConfig: any): any {
  const result = { ...defaultConfig }

  for (const key in userConfig) {
    if (Array.isArray(userConfig[key]) && Array.isArray(result[key])) {
      // 数组类型的特殊处理
      if (key === 'items' || key === 'toolbar') {
        result[key] = mergeArrayConfig(result[key], userConfig[key], key)
      } else {
        result[key] = userConfig[key]
      }
    } else if (typeof userConfig[key] === 'object' && userConfig[key] !== null) {
      // 对象类型的递归合并
      result[key] = mergeTableConfig(result[key] || {}, userConfig[key])
    } else {
      // 基本类型的直接覆盖
      result[key] = userConfig[key]
    }
  }

  return result
}

/**
 * 合并数组配置
 */
function mergeArrayConfig(defaultArray: any[], userArray: any[], arrayType: string): any[] {
  if (arrayType === 'items') {
    return userArray.map((userItem) => {
      const defaultItem = defaultArray.find((d) => d.prop === userItem.prop) || {}
      return { ...defaultItem, ...userItem }
    })
  }

  if (arrayType === 'toolbar') {
    return userArray.map((userItem) => {
      const defaultItem = defaultArray.find((d) => d.btnType === userItem.btnType) || {}
      return { ...defaultItem, ...userItem }
    })
  }

  return userArray
}


/**
 * @param {date} time 需要转换的时间
 * @param {String} fmt 需要转换的格式 如 yyyy-MM-dd、yyyy-MM-dd HH:mm:ss
 *
 * 时间分量：
 * y 年
 * M 月
 * d 日
 * s 秒
 * S 毫秒
 * q 月中第几周
 * e 星期
 * E 星期（中文）
 * a AM/PM
 * A 上午/下午
 */
export function formatTime(time: Date | string, fmt: string): string {
  if (!time) return '';

  let self: Date;
  if (!(time instanceof Date)) {
    self = new Date(time);
    if (isNaN(self.getTime())) return '';
  } else {
    self = time;
  }

  const o: Record<string, () => string | number> = {
    'M+': () => self.getMonth() + 1,
    'd+': () => self.getDate(),
    'h+': () => {
      const h = self.getHours() % 12;
      return h === 0 ? 12 : h;
    },
    'H+': () => self.getHours(),
    'm+': () => self.getMinutes(),
    's+': () => self.getSeconds(),
    'S+': () => self.getMilliseconds(),
    'q+': () => Math.floor((self.getMonth() + 3) / 3),
    'e+': () => self.getDay(),
    'E+': () => ['日', '一', '二', '三', '四', '五', '六'][self.getDay()] || '',
    'a+': () => (self.getHours() < 12 ? 'AM' : 'PM'),
    'A+': () => (self.getHours() < 12 ? '上午' : '下午')
  };

  // 处理年份
  const yearMatch = fmt.match(/(y+)/);
  if (yearMatch) {
    const yearStr = String(self.getFullYear());
    fmt = fmt.replace(yearMatch[0], yearStr.slice(4 - yearMatch[0].length));
  }

  // 处理其他格式 —— 用 Object.entries 避免 TS2722
  for (const [key, fn] of Object.entries(o)) {
    const reg = new RegExp(`(${key})`);
    const match = fmt.match(reg);
    if (match) {
      let val = String(fn());
      const noPad = /^[eEaA]/.test(key);
      if (!noPad && match[0].length > 1) {
        val = ('00' + val).slice(-match[0].length);
      }
      fmt = fmt.replace(match[0], val);
    }
  }

  return fmt;
}



/**
 * 检查按钮是否应该显示
 * @param btn 按钮配置
 * @param scope 作用域
 * @returns 是否显示
 */
export const shouldShowButton = (btn: any, scope?: any): boolean => {
  let flag1 = true, flag2 = true
  // 权限检查
  if (btn.directive && Object.keys(btn.directive)?.length) {
    for (const v in btn.directive) {
      if (permissionUtils[v]) {
        flag1 = permissionUtils[v](btn.directive[v])
        if (!flag1) break // 只要有一个权限检查失败，就停止检查
      }
    }
  }
  // 显示条件检查
  if (typeof btn.show === 'function' && scope?.row) {
    flag2 = btn.show(scope.row)
  } else {
    flag2 = btn.show !== false
  }
  return flag1 && flag2
}


/**
 * 丰富按钮配置
 * 补充默认按钮名称，icon 仅在用户明确配置时使用
 * @param btn 按钮配置
 * @returns 丰富后的按钮配置
 */
export const enrichButton = (btn: ToolbarButton): ToolbarButton => {
  const defaults = defaultButtonMap[btn.btnType]
  if (defaults) {
    return {
      ...btn,
      btnName: Object.keys(btn).includes('btnName') ? btn.btnName : defaults.btnName,
    }
  }
  return btn
}

// 丰富表格事件
export function enrichTableEvents(events: Record<string, EventHandler> = {}) {
  const enhancedEvents: Record<string, EventHandler> = {}

  for (const [eventName, handler] of Object.entries(events)) {
    enhancedEvents[eventName] = function (...args: any[]) {
      // 特殊处理逻辑
      // if（eventName === 'selection-change') {}
      // 其他事件正常处理
      return handler.call(this, ...args)
    }
  }

  return enhancedEvents
}
