<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M20.008 37.496c-2.188 0-15.746-10.55-15.746-19.246S11.309 2.504 20.008 2.504s15.746 7.05 15.746 15.746c0 8.695-13.559 19.246-15.746 19.246"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomPinpointFill' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
