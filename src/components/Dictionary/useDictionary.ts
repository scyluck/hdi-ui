import { computed, inject, onMounted, onUnmounted, ref, shallowRef, watch, type App, type Plugin, type Ref } from 'vue'
import type {
  DictionaryItem,
  DictionaryProviderConfig,
  DictionaryStore,
  DictionaryStoreEntry,
} from './types'

export const DICTIONARY_STORE_KEY = Symbol('hdi-dictionary-store')

const DEFAULT_TTL = 5 * 60_000
const DEFAULT_MAX_ENTRIES = 100

function createEntry(): DictionaryStoreEntry {
  return {
    items: ref<DictionaryItem[]>([]),
    loading: ref(false),
    error: ref<Error | null>(null),
    expiresAt: 0,
    lastAccessedAt: Date.now(),
    subscriberCount: 0,
    requestId: 0,
    valueIndexes: new Map(),
  }
}

function resetEntry(entry: DictionaryStoreEntry) {
  entry.requestId += 1
  entry.items.value = []
  entry.error.value = null
  entry.loading.value = false
  entry.expiresAt = 0
  entry.promise = undefined
  entry.valueIndexes.clear()
}

export function createDictionaryStore(config: DictionaryProviderConfig): DictionaryStore {
  if (typeof config.fetcher !== 'function') {
    throw new TypeError('[HdiDictionary] config.fetcher must be a function')
  }
  if (!Number.isFinite(config.ttl ?? DEFAULT_TTL) || (config.ttl ?? DEFAULT_TTL) < 0) {
    throw new RangeError('[HdiDictionary] config.ttl must be a non-negative finite number')
  }
  if (!Number.isFinite(config.maxEntries ?? DEFAULT_MAX_ENTRIES) || !Number.isInteger(config.maxEntries ?? DEFAULT_MAX_ENTRIES) || (config.maxEntries ?? DEFAULT_MAX_ENTRIES) < 1) {
    throw new RangeError('[HdiDictionary] config.maxEntries must be a positive integer')
  }

  const entries = new Map<string, DictionaryStoreEntry>()
  const ttl = config.ttl ?? DEFAULT_TTL
  const maxEntries = config.maxEntries ?? DEFAULT_MAX_ENTRIES

  const getEntry = (dictName: string) => {
    let entry = entries.get(dictName)
    if (!entry) {
      entry = createEntry()
      entries.set(dictName, entry)
    }
    entry.lastAccessedAt = Date.now()
    return entry
  }

  const evict = () => {
    while (entries.size > maxEntries) {
      const oldest = [...entries.entries()]
        .filter(([, entry]) => !entry.promise && entry.subscriberCount === 0)
        .sort(([, a], [, b]) => a.lastAccessedAt - b.lastAccessedAt)[0]
      if (!oldest) return
      entries.delete(oldest[0])
    }
  }

  const load = async (dictName: string, force = false): Promise<DictionaryItem[]> => {
    if (!dictName) return []
    const entry = getEntry(dictName)
    if (!force && entry.expiresAt > Date.now()) return entry.items.value
    if (!force && entry.promise) return entry.promise

    const requestId = ++entry.requestId
    entry.loading.value = true
    entry.error.value = null
    const request = Promise.resolve()
      .then(() => config.fetcher(dictName))
      .then((items) => {
        if (entry.requestId !== requestId) return entry.items.value
        entry.items.value = Array.isArray(items) ? items : []
        entry.valueIndexes.clear()
        entry.expiresAt = Date.now() + ttl
        entry.lastAccessedAt = Date.now()
        return entry.items.value
      })
      .catch((reason: unknown) => {
        const error = reason instanceof Error ? reason : new Error(String(reason))
        if (entry.requestId === requestId) entry.error.value = error
        throw error
      })
      .finally(() => {
        if (entry.requestId === requestId) {
          entry.loading.value = false
          entry.promise = undefined
          evict()
        }
      })
    entry.promise = request
    return request
  }

  const getItems = (dictName: string) => {
    const entry = entries.get(dictName)
    if (!entry) return []
    entry.lastAccessedAt = Date.now()
    return entry.items.value
  }
  const getItem = (dictName: string, value: string | number, valueKey = 'value') => {
    const entry = entries.get(dictName)
    if (!entry) return undefined
    entry.lastAccessedAt = Date.now()
    let index = entry.valueIndexes.get(valueKey)
    if (!index) {
      index = new Map(entry.items.value.map((item) => [String(item[valueKey] ?? item.value), item]))
      entry.valueIndexes.set(valueKey, index)
    }
    return index.get(String(value))
  }

  return {
    getEntry,
    getItems,
    getItem,
    load,
    clear(dictName) {
      resetEntry(getEntry(dictName))
    },
    clearAll() {
      for (const entry of entries.values()) resetEntry(entry)
      entries.clear()
    },
  }
}

export function createDictionaryPlugin(config: DictionaryProviderConfig): Plugin {
  return {
    install(app: App) {
      app.provide(DICTIONARY_STORE_KEY, createDictionaryStore(config))
    },
  }
}

export function useDictionaryStore(): DictionaryStore {
  const store = useOptionalDictionaryStore()
  if (!store) {
    throw new Error('[HdiDictionary] 未配置字典 Store，请先 app.use(createDictionaryPlugin({ fetcher }))')
  }
  return store
}

export function useOptionalDictionaryStore(): DictionaryStore | undefined {
  return inject<DictionaryStore | null>(DICTIONARY_STORE_KEY, null) ?? undefined
}

/** A dictionary entry is shared by every consumer in the same Vue application. */
export function useDictionary(dictName: string | Ref<string>, immediate = true) {
  const store = useOptionalDictionaryStore()
  const name = computed(() => typeof dictName === 'string' ? dictName : dictName.value)
  const getCurrentEntry = (dictName: string) => store && dictName ? store.getEntry(dictName) : createEntry()
  const entry = shallowRef<DictionaryStoreEntry>(getCurrentEntry(name.value))
  let subscribedEntry = entry.value
  let isSubscribed = Boolean(store && name.value)
  if (isSubscribed) subscribedEntry.subscriberCount += 1

  const load = (force = false) => {
    if (!name.value) return Promise.resolve([])
    if (!store) {
      const error = new Error('[HdiDictionary] 未配置字典 Store，请先 app.use(createDictionaryPlugin({ fetcher }))')
      entry.value.error.value = error
      return Promise.reject(error)
    }
    return store.load(name.value, force)
  }
  const refresh = () => load(true)
  const clearCache = () => {
    if (store && name.value) store.clear(name.value)
    else resetEntry(entry.value)
  }

  watch(name, (nextName) => {
    if (isSubscribed) subscribedEntry.subscriberCount = Math.max(0, subscribedEntry.subscriberCount - 1)
    entry.value = getCurrentEntry(nextName)
    subscribedEntry = entry.value
    isSubscribed = Boolean(store && nextName)
    if (isSubscribed) subscribedEntry.subscriberCount += 1
    if (immediate && nextName) void load().catch(() => {})
  })

  onMounted(() => {
    if (immediate && name.value) void load().catch(() => {})
  })

  onUnmounted(() => {
    if (isSubscribed) subscribedEntry.subscriberCount = Math.max(0, subscribedEntry.subscriberCount - 1)
  })

  return {
    items: computed(() => entry.value.items.value),
    loading: computed(() => entry.value.loading.value),
    error: computed(() => entry.value.error.value),
    load,
    refresh,
    clearCache,
  }
}
