<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M35.008 2.52a2.539 2.539 0 0 1 1.168 4.793v4.011a1.17 1.17 0 0 1-1.172 1.172 1.17 1.17 0 0 1-1.172-1.172V7.313A2.56 2.56 0 0 1 32.75 6.23H7.27A2.5 2.5 0 0 1 6.21 7.3v25.458c.45.23.825.594 1.067 1.039h4.875a1.17 1.17 0 0 1 1.172 1.172 1.17 1.17 0 0 1-1.172 1.172H7.32a2.539 2.539 0 1 1-3.453-3.375V7.32a2.539 2.539 0 1 1 3.406-3.434h25.48a2.54 2.54 0 0 1 2.255-1.366m-2.88 10.976 4.888 4.89a1.71 1.71 0 0 1 0 2.419L23.46 34.359c-.375.375-.875.61-1.402.653l-5.075.426q-.073.006-.148.007a1.77 1.77 0 0 1-1.762-1.918l.426-5.07a2.26 2.26 0 0 1 .652-1.402l13.555-13.559a1.715 1.715 0 0 1 2.422 0M28.43 18.09l3.992 3.996 2.492-2.492-3.992-3.996zM17.465 33.047l4.363-.367 8.938-8.934-3.996-3.996-8.938 8.938z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon60DrawShape' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
