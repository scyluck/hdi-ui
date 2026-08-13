<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M36.348 37.488H3.73a1.17 1.17 0 0 1-1.171-1.172 1.17 1.17 0 0 1 1.171-1.171h32.618a1.17 1.17 0 0 1 1.171 1.171 1.17 1.17 0 0 1-1.171 1.172m-2.485-4.492H6.183a1.17 1.17 0 0 1-1.171-1.172V20.86c0-.293.11-.578.308-.793l10.403-11.32a1.173 1.173 0 0 1 1.644-.082l5.73 5.113 9.868-10.82a1.18 1.18 0 0 1 1.289-.305c.45.18.746.614.746 1.098l.035 28.074a1.18 1.18 0 0 1-1.172 1.172M7.355 30.652h25.332L32.66 6.77l-8.617 9.445a1.174 1.174 0 0 1-1.645.086l-5.73-5.117-9.313 10.132z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon60AreaChart' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
