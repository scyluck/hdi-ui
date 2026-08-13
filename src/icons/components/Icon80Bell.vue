<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M34.715 28.969h-2.852V17.234c0-1.55-.316-3.058-.941-4.476a11.4 11.4 0 0 0-2.555-3.64 11.98 11.98 0 0 0-6.805-3.231v-1.79a1.562 1.562 0 1 0-3.125 0v1.79a11.93 11.93 0 0 0-6.8 3.23 11.4 11.4 0 0 0-2.555 3.64 11 11 0 0 0-.941 4.477V28.97H5.367a1.562 1.562 0 1 0 0 3.125H14.5a5.553 5.553 0 0 0 5.543 5.422 5.55 5.55 0 0 0 5.543-5.422h9.133a1.562 1.562 0 1 0-.004-3.125m-14.676 5.42a2.426 2.426 0 0 1-2.418-2.297h4.832a2.42 2.42 0 0 1-2.414 2.297m-8.777-5.422V17.234c0-4.59 3.918-8.32 8.738-8.32 4.816 0 8.738 3.734 8.738 8.32V28.97z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon80Bell' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
