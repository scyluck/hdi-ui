<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="m17.69 27.356-3.414-3.414a1.6 1.6 0 0 0-2.262 2.264l4.525 4.525.021.021a1.6 1.6 0 0 0 2.262 0l9.05-9.052a1.6 1.6 0 0 0-2.262-2.261zm13.977-12.69V7.2H8.2v7.467zM8.2 4h23.467a3.2 3.2 0 0 1 3.2 3.2v25.6a3.2 3.2 0 0 1-3.2 3.2H8.2A3.2 3.2 0 0 1 5 32.8V7.2A3.2 3.2 0 0 1 8.2 4m4.267 5.333H21a1.066 1.066 0 0 1 1.067 1.067v1.067A1.066 1.066 0 0 1 21 12.533h-8.533a1.067 1.067 0 0 1-1.067-1.066V10.4a1.067 1.067 0 0 1 1.067-1.067m13.866 0H27.4a1.066 1.066 0 0 1 1.067 1.067v1.067a1.066 1.066 0 0 1-1.067 1.066h-1.067a1.066 1.066 0 0 1-1.066-1.066V10.4a1.066 1.066 0 0 1 1.066-1.067"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomTask' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
