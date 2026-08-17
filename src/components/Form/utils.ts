/**
 * 表单工具函数
 * 提供表单相关的工具方法
 */
import { getDictionaryCache } from '../Dictionary/useDictionary'
import type { FormItem } from './types'

/**
 * 解析表单项选项
 *
 * @param {FormItem} item - 表单项对象，包含 options 属性
 * @returns {any[]} 返回解析后的选项数组
 *   - 如果 options 是字符串，则根据字典code获取选项
 *   - 如果 options 是数组，则直接返回该数组
 *   - 其他情况返回空数组
 */
export function resolveFormOptions(item: FormItem): any[] {
  const { options } = item

  // 字符串 = 字典code，从 HdiDictionary 缓存获取
  if (typeof options === 'string') {
    return getDictionaryCache(options) || []
  }

  // 数组 = 直接选项
  if (Array.isArray(options)) {
    return options
  }

  return []
}

/**
 * 获取选项的值字段名
 *
 * @param {FormItem} config - 表单项配置对象
 * @returns {string} 返回选项值字段名
 *   - 如果配置了 selectValue，则优先使用
 *   - 否则返回默认值 'value'
 */
export function getFormValueKey(config: FormItem): string {
  return config.selectValue || 'value'
}

/**
 * 获取选项的标签字段名
 *
 * @param {FormItem} config - 表单项配置对象
 * @returns {string} 返回选项标签字段名
 *   - 如果配置了 selectLabel，则优先使用
 *   - 否则返回默认值 'label'
 * @remarks 注意：FormItem.label 是表单项标题（字段说明），与选项标签字段名无关
 */
export function getFormLabelKey(config: FormItem): string {
  return config.selectLabel || 'label'
}

/**
 * 获取选项标签
 *
 * 根据表单项配置从选项对象中提取并格式化显示标签
 *
 * @param option - 选项对象，包含值和标签信息
 * @param item - 表单项配置对象，包含标签显示规则
 * @returns {string} 格式化后的标签字符串
 *   - 如果 isLabelHasValue 为 true，返回 "值.标签" 的形式
 *   - 否则返回纯标签
 */
export function getOptionDisplayLabel(option: any, item: FormItem): string {
  const valueKey = getFormValueKey(item)
  const labelKey = getFormLabelKey(item)

  const value = option[valueKey]
  const label = option[labelKey] || option.label || String(value)

  // 如果需要显示值+标签的形式
  if (item.isLabelHasValue) {
    return `${value}.${label}`
  }

  return label
}

/**
 * 根据表单项配置和值获取对应的显示标签
 *
 * 支持两种模式：
 * 1. 字典模式：当 options 为字符串时，从字典中获取标签
 * 2. 选项模式：当 options 为配置对象时，从选项列表中查找匹配的标签
 *
 * @param value - 要查找的值，可以是字符串或数字
 * @param item - 表单项配置对象，包含 options 和其他配置信息
 * @returns {string} 对应的显示标签
 *   - 如果找到匹配的标签，返回格式化后的标签
 *   - 如果找不到，返回原始值的字符串形式
 */
export function getValueDisplayLabel(value: string | number, item: FormItem): string {
  const { options } = item

  // 字典模式：从 HdiDictionary 缓存查找标签
  if (options && typeof options === 'string') {
    const dictItems = getDictionaryCache(options) || []
    const valueKey = getFormValueKey(item)
    const found = dictItems.find(opt => String(opt[valueKey] || opt.value) === String(value))
    return found ? getOptionDisplayLabel(found, item) : String(value)
  }

  // 选项模式
  const tempOptions = resolveFormOptions(item)
  const valueKey = getFormValueKey(item)

  const found = tempOptions.find(opt => String(opt[valueKey] || opt.value) === String(value))
  return found ? getOptionDisplayLabel(found, item) : String(value)
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
