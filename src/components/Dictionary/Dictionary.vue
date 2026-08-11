<template>
  <slot
    :items="items"
    :loading="loading"
    :error="error"
    :load="load"
    :refresh="refresh"
    :clear-cache="clearCache"
  />
</template>

<script setup lang="ts">
import { useDictionary } from './useDictionary'

defineOptions({ name: 'HdiDictionary' })

const props = withDefaults(defineProps<{
  dictName: string
  immediate?: boolean
}>(), {
  immediate: true,
})

const { items, loading, error, load, refresh, clearCache } = useDictionary(props.dictName, props.immediate)

defineExpose({
  items,
  loading,
  error,
  load,
  refresh,
  clearCache,
})
</script>
