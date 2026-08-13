<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M3.984 8.035c0-1.726 1.4-3.125 3.125-3.125h13.126a3.125 3.125 0 0 1 3.125 3.125v9.113h9.765c1.726 0 3.125 1.4 3.125 3.125v14.231a.78.78 0 0 1-.781.781H4.766a.78.78 0 0 1-.782-.78zm4.895 9.113a.78.78 0 0 0-.782.781v1.5c0 .432.35.782.782.782h9.587c.432 0 .781-.35.781-.782v-1.5a.78.78 0 0 0-.78-.78zm18.4 6.344a.78.78 0 0 0-.781.781v1.5c0 .432.35.781.781.781h5.052c.432 0 .782-.35.782-.78v-1.5a.78.78 0 0 0-.782-.782zM8.88 10.804a.78.78 0 0 0-.782.782v1.5c0 .431.35.78.782.78h9.587a.78.78 0 0 0 .781-.78v-1.5a.78.78 0 0 0-.78-.782z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomBuilding' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
