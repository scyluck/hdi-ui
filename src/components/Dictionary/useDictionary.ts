import { inject, onMounted, ref } from 'vue'
import type { DictionaryItem, DictionaryProviderConfig } from './types'

const DICTIONARY_PROVIDER_KEY = Symbol('hdi-dictionary-provider')

export function provideDictionary(config: DictionaryProviderConfig) {
  // Use a module-level store so provideDictionary works outside of component tree
  store.config = config
}

const store: {
  config: DictionaryProviderConfig | null
  cache: Map<string, DictionaryItem[]>
  promises: Map<string, Promise<DictionaryItem[]>>
} = {
  config: null,
  cache: new Map(),
  promises: new Map(),
}

export function useDictionary(dictName: string, immediate = true) {
  const injected = inject<DictionaryProviderConfig | null>(DICTIONARY_PROVIDER_KEY, null)
  const config = injected ?? store.config
  const items = ref<DictionaryItem[]>([])
  const loading = ref(false)
  const error = ref<Error | null>(null)

  async function load(force = false) {
    // 空字典名时不请求
    if (!dictName) return

    if (!config?.fetcher) {
      error.value = new Error('[HdiDictionary] 未配置字典获取器，请先调用 provideDictionary()')
      return
    }

    if (!force && store.cache.has(dictName)) {
      items.value = store.cache.get(dictName)!
      return
    }

    if (!force && store.promises.has(dictName)) {
      try {
        items.value = await store.promises.get(dictName)!
      } catch (e) {
        error.value = e as Error
      }
      return
    }

    loading.value = true
    error.value = null

    const promise = config.fetcher(dictName)
    store.promises.set(dictName, promise)

    try {
      const data = await promise
      store.cache.set(dictName, data)
      items.value = data
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
      store.promises.delete(dictName)
    }
  }

  function refresh() {
    store.cache.delete(dictName)
    load(true)
  }

  function clearCache() {
    store.cache.delete(dictName)
    items.value = []
  }

  onMounted(() => {
    if (immediate) load()
  })

  return {
    items,
    loading,
    error,
    load,
    refresh,
    clearCache,
  }
}

export { DICTIONARY_PROVIDER_KEY }

export function getDictionaryCache(dictName: string): DictionaryItem[] | undefined {
  return store.cache.get(dictName)
}

export function clearAllDictionaryCache() {
  store.cache.clear()
  store.promises.clear()
}
