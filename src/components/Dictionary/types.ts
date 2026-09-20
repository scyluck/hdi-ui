export interface DictionaryItem {
  label: string
  value: string | number
  [key: string]: unknown
}

export type DictionaryFetcher = (dictName: string) => Promise<DictionaryItem[]>

export interface DictionaryProviderConfig {
  fetcher: DictionaryFetcher
  /** Cache lifetime in milliseconds. Defaults to five minutes. */
  ttl?: number
  /** Maximum retained dictionary entries. Defaults to 100. */
  maxEntries?: number
}

import type { Ref } from 'vue'

export interface DictionaryStoreEntry {
  items: Ref<DictionaryItem[]>
  loading: Ref<boolean>
  error: Ref<Error | null>
  expiresAt: number
  lastAccessedAt: number
  subscriberCount: number
  promise?: Promise<DictionaryItem[]>
  requestId: number
  valueIndexes: Map<string, Map<string, DictionaryItem>>
}

export interface DictionaryStore {
  getEntry: (dictName: string) => DictionaryStoreEntry
  getItems: (dictName: string) => DictionaryItem[]
  getItem: (dictName: string, value: string | number, valueKey?: string) => DictionaryItem | undefined
  load: (dictName: string, force?: boolean) => Promise<DictionaryItem[]>
  clear: (dictName: string) => void
  clearAll: () => void
}

export interface DictionaryProps {
  dictName: string
  /** 是否立即加载，默认 true */
  immediate?: boolean
}
