<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M30.328 14.324h3.25a3.913 3.913 0 0 1 3.906 3.906v15.418a3.913 3.913 0 0 1-3.906 3.907H6.406A3.913 3.913 0 0 1 2.5 33.648V18.23a3.913 3.913 0 0 1 3.906-3.906h3.25v-1.691c0-2.7 1.082-5.235 3.043-7.14a10.43 10.43 0 0 1 7.293-2.934c2.754 0 5.344 1.039 7.293 2.933 1.961 1.903 3.043 4.442 3.043 7.14zM19.992 5.68c-3.976 0-7.21 3.12-7.21 6.953v1.691h14.421v-1.691c0-3.836-3.234-6.953-7.21-6.953m13.586 28.75c.43 0 .781-.352.781-.782h-.004V18.23a.784.784 0 0 0-.78-.78H6.405a.784.784 0 0 0-.781.78v15.418c0 .43.352.782.781.782zM18.43 28.36a1.562 1.562 0 1 0 3.125 0v-4.688a1.562 1.562 0 1 0-3.125 0z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon80Lock' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
