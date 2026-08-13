<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M35.11 30.234h-2.77V17.043a11.4 11.4 0 0 0-.973-4.629 11.7 11.7 0 0 0-2.644-3.766 12.4 12.4 0 0 0-7.508-3.402V3.688a1.17 1.17 0 0 0-1.172-1.172 1.17 1.17 0 0 0-1.172 1.172v1.554a12.42 12.42 0 0 0-7.508 3.403A11.8 11.8 0 0 0 8.72 12.41a11.4 11.4 0 0 0-.973 4.629v13.195h-2.77a1.17 1.17 0 0 0-1.171 1.172 1.17 1.17 0 0 0 1.172 1.172H15.16a4.89 4.89 0 0 0 4.883 4.863 4.89 4.89 0 0 0 4.883-4.863h10.183a1.17 1.17 0 0 0 1.172-1.172 1.17 1.17 0 0 0-1.172-1.172m-15.067 4.864a2.54 2.54 0 0 1-2.54-2.52h5.079a2.54 2.54 0 0 1-2.539 2.52m9.953-4.864H10.09V17.043c0-5.242 4.465-9.508 9.953-9.508s9.953 4.266 9.953 9.508z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon60Bell' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
