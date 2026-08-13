<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M13.672 26.008a1.73 1.73 0 0 0 1.433.496 17.72 17.72 0 0 0 10.38-5.047l9.335-9.336a3.503 3.503 0 0 0 0-4.953l-2.308-2.309a3.51 3.51 0 0 0-4.953 0l-9.336 9.336a17.7 17.7 0 0 0-5.047 10.38 1.73 1.73 0 0 0 .496 1.433m-4.34 10.125h20.3l-.003-.004a5.1 5.1 0 0 0 5.098-5.094V19.738a1.735 1.735 0 0 0-3.47 0V31.04c0 .899-.73 1.625-1.624 1.625H9.332c-.895 0-1.625-.73-1.625-1.625V11.227c0-.899.73-1.625 1.625-1.625h9.473a1.735 1.735 0 0 0 0-3.47H9.332a5.1 5.1 0 0 0-5.098 5.095v19.812a5.103 5.103 0 0 0 5.098 5.094m11.344-19.485 9.379-9.335 2.308 2.308a.03.03 0 0 1 0 .043L23.027 19a14.3 14.3 0 0 1-5.886 3.535 14.26 14.26 0 0 1 3.535-5.887"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Edit2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
