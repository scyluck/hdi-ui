<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M35.844 34.402H4.14a1.562 1.562 0 1 0 0 3.125h31.703a1.562 1.562 0 1 0 0-3.125M6.688 32.215h26.699c.863 0 1.562-.7 1.562-1.563V4.132c0-.636-.386-1.206-.976-1.448a1.56 1.56 0 0 0-1.707.359l-9.586 9.875-4.992-4.426a1.56 1.56 0 0 0-2.16.086L5.565 18.902a1.57 1.57 0 0 0-.437 1.086v10.664a1.556 1.556 0 0 0 1.559 1.563M8.25 20.617l8.484-8.793 4.989 4.426c.625.555 1.574.52 2.156-.082l7.945-8.184V29.09H8.25z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon80AreaChart' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
