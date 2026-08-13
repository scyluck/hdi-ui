<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="m12.265 10.137-2.261-3.64a1.743 1.743 0 0 1 2.96-1.837l3.402 5.477h7.589l3.4-5.477a1.742 1.742 0 1 1 2.96 1.836l-2.26 3.64h4.168a5.23 5.23 0 0 1 5.226 5.227v15.598a5.236 5.236 0 0 1-5.226 5.227H7.859a5.23 5.23 0 0 1-5.226-5.227V15.363a5.23 5.23 0 0 1 5.226-5.226zm-6.152 5.226c0-.965.785-1.746 1.746-1.746h24.364c.965 0 1.746.785 1.746 1.746v15.598c0 .965-.785 1.746-1.746 1.746H7.859a1.75 1.75 0 0 1-1.746-1.746zM17.77 27.45a1.71 1.71 0 0 0 1.765-.051l4.43-2.761c.512-.317.82-.875.82-1.477 0-.601-.308-1.16-.82-1.476l-4.43-2.762a1.73 1.73 0 0 0-1.765-.047c-.551.309-.895.89-.895 1.523v5.528c0 .633.344 1.215.895 1.523"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Live' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
