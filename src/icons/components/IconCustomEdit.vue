<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="m31.707 13.539-7.398-7.398 3.246-3.239a1.66 1.66 0 0 1 2.347 0l5.043 5.051a1.66 1.66 0 0 1 0 2.348zM5 31.656l.492-5.593c.067-.778.41-1.508.961-2.06l16.211-16.21 7.399 7.398-16.215 16.207a3.33 3.33 0 0 1-2.055.961l-5.594.497A1.105 1.105 0 0 1 5 31.656m-1.316 3.48H36.34a1.17 1.17 0 0 1 1.172 1.173 1.17 1.17 0 0 1-1.172 1.172H3.684a1.17 1.17 0 0 1-1.172-1.172 1.17 1.17 0 0 1 1.172-1.172"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomEdit' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
