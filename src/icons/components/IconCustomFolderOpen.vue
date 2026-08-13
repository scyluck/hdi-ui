<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M35.27 14.238h-.434v-1.672c0-1.234-1-2.23-2.23-2.23h-13.2c-.73 0-1.418-.36-1.832-.961L15.43 6.277a2.23 2.23 0 0 0-1.832-.96H4.73a2.23 2.23 0 0 0-2.23 2.23v22.86a4.46 4.46 0 0 0 4.46 4.46h22.231A4.465 4.465 0 0 0 33.5 31.57l3.922-14.52a2.232 2.232 0 0 0-2.152-2.812m-2.665 0H9.781a2.23 2.23 0 0 0-2.152 1.649l-2.352 8.699c-.082.312-.547.254-.547-.074V8.105c0-.304.25-.558.56-.558h8.019a.55.55 0 0 1 .457.242l2.004 2.89a4.46 4.46 0 0 0 3.644 1.887h12.637c.304 0 .558.25.558.559v1.113z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomFolderOpen' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
