export interface DictionaryItem {
  label: string
  value: string | number
  [key: string]: unknown
}

export type DictionaryFetcher = (dictName: string) => Promise<DictionaryItem[]>

export interface DictionaryProviderConfig {
  fetcher: DictionaryFetcher
}

export interface DictionaryProps {
  dictName: string
  /** 是否立即加载，默认 true */
  immediate?: boolean
}
