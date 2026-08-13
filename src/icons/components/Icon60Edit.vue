<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M36.34 35.137H3.684a1.17 1.17 0 0 0-1.172 1.172 1.17 1.17 0 0 0 1.172 1.171H36.34a1.17 1.17 0 0 0 1.172-1.171 1.17 1.17 0 0 0-1.172-1.172M6.145 33c.039 0 .082 0 .12-.004l8.313-.738c.32-.028.617-.168.844-.395l19.535-19.535a1.365 1.365 0 0 0 0-1.933l-7.574-7.579a1.37 1.37 0 0 0-.969-.402c-.363 0-.71.145-.965.402L5.91 22.356a1.37 1.37 0 0 0-.394.847l-.735 8.313c-.035.402.11.8.395 1.086.258.253.61.398.969.398M26.418 5.715l5.64 5.644-3.261 3.262-5.645-5.644zM8.195 23.937 21.22 10.914l5.644 5.645-13.023 13.02-6.192.55z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon60Edit' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
