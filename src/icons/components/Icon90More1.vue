<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path d="M34.5 8.77H5.637c-.965 0-1.75-.786-1.75-1.75 0-.965.785-1.75 1.75-1.75H34.5c.965 0 1.75.785 1.75 1.75 0 .964-.785 1.75-1.75 1.75m0 12.683H5.637c-.965 0-1.75-.785-1.75-1.75s.785-1.75 1.75-1.75H34.5c.965 0 1.75.785 1.75 1.75s-.785 1.75-1.75 1.75m0 12.68H5.637c-.965 0-1.75-.785-1.75-1.75s.785-1.75 1.75-1.75H34.5c.965 0 1.75.785 1.75 1.75s-.785 1.75-1.75 1.75"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90More1' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
