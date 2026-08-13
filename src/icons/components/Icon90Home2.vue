<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M34.613 17.348c.305.214.653.316.996.316l-.004.008a1.735 1.735 0 0 0 1-3.156L22.711 4.762a5.08 5.08 0 0 0-5.895.043L3.371 14.527a1.735 1.735 0 0 0 2.035 2.809l13.442-9.727a1.61 1.61 0 0 1 1.87-.011zm-20.394 5.82a5.86 5.86 0 0 0 5.851 5.852 5.86 5.86 0 0 0 5.852-5.852 5.86 5.86 0 0 0-5.852-5.852 5.86 5.86 0 0 0-5.851 5.852m-3.367 12.996h18.23l-.004-.004a5.066 5.066 0 0 0 5.063-5.062V20.082a1.735 1.735 0 0 0-3.47 0v11.016c0 .879-.714 1.593-1.593 1.593H10.852a1.595 1.595 0 0 1-1.594-1.593V20.082a1.735 1.735 0 0 0-3.469 0v11.02a5.066 5.066 0 0 0 5.063 5.062m6.836-12.996a2.385 2.385 0 0 1 2.382-2.383 2.387 2.387 0 0 1 2.383 2.383 2.385 2.385 0 0 1-2.383 2.383 2.385 2.385 0 0 1-2.382-2.383"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Home2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
