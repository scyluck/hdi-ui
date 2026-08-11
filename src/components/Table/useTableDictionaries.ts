/**
 * 表格字典加载工具
 * 自动收集表格列中使用的字典code，并触发请求
 */
import { useDictionary } from '../Dictionary/useDictionary'
import type { TableColumn } from './types'
import type { FormItem } from '../Form/types'

/**
 * 从表格列配置中收集所有字典code
 */
export function collectDictCodes(items: TableColumn[] | FormItem[]): string[] {
  const codes: string[] = []
  const seen = new Set<string>()

  const walk = (cols: (TableColumn | FormItem)[]) => {
    for (const col of cols) {
      if (typeof col.options === 'string' && !seen.has(col.options)) {
        seen.add(col.options)
        codes.push(col.options)
      }
      if (col.children?.length) {
        walk(col.children)
      }
    }
  }

  walk(items)
  return codes
}

/**
 * 在组件 setup 中自动加载表格所需的所有字典
 * @param getItems 获取表格列的函数
 */
export function useTableDictionaries(getItems: () => TableColumn[]) {
  // 收集所有字典code（setup 阶段确定）
  const dictCodes = collectDictCodes(getItems())

  // 为每个字典code调用 useDictionary（在 setup 顶层调用，符合 composable 规范）
  // useDictionary 内部会在 onMounted 时自动触发请求
  const dictResults = dictCodes.map(code => useDictionary(code))

  return { dictCodes, dictResults }
}
