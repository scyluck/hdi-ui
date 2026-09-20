/** Automatically preload dictionary codes referenced by reactive table columns. */
import { computed, watch } from 'vue'
import { useOptionalDictionaryStore } from '../Dictionary/useDictionary'
import type { TableColumn } from './types'
import type { FormItem } from '../Form/types'

export function collectDictCodes(items: TableColumn[] | FormItem[] = []): string[] {
  const codes: string[] = []
  const seen = new Set<string>()
  const walk = (columns: (TableColumn | FormItem)[]) => {
    for (const column of columns) {
      if (typeof column.options === 'string' && !seen.has(column.options)) {
        seen.add(column.options)
        codes.push(column.options)
      }
      if (column.children?.length) walk(column.children)
    }
  }
  walk(items)
  return codes
}

export function useTableDictionaries(getItems: () => TableColumn[]) {
  const store = useOptionalDictionaryStore()
  const dictCodes = computed(() => collectDictCodes(getItems()))
  watch(dictCodes, (codes) => {
    if (!codes.length) return
    if (!store) {
      throw new Error('[HdiDictionary] 未配置字典 Store，请先 app.use(createDictionaryPlugin({ fetcher }))')
    }
    for (const code of codes) void store.load(code).catch(() => {})
  }, { immediate: true })
  return { dictCodes, store }
}
