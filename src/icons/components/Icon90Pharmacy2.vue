<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M19.645 6.36 6.512 15.3a1.75 1.75 0 0 1-2.43-.46 1.75 1.75 0 0 1 .461-2.43L18.66 2.797a1.76 1.76 0 0 1 1.969 0l14.113 9.613a1.75 1.75 0 0 1-.984 3.196c-.336 0-.68-.102-.98-.305zm.984 3.238 14.117 9.613h-.008c.48.328.766.867.766 1.445v14.985c0 .965-.781 1.746-1.746 1.746H5.523a1.745 1.745 0 0 1-1.746-1.746V20.656a1.75 1.75 0 0 1 .766-1.445L18.66 9.598a1.76 1.76 0 0 1 1.969 0M7.277 21.582v12.313H32.02V21.582L19.648 13.16zm10.989.852v-3.348a1.745 1.745 0 1 1 3.492 0v3.348h3.351a1.745 1.745 0 1 1 0 3.492h-3.351v3.347a1.745 1.745 0 1 1-3.492 0v-3.347h-3.348a1.745 1.745 0 1 1 0-3.492z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Pharmacy2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
