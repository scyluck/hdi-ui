<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M2.473 20.102c0 9.648 7.851 17.5 17.5 17.5 9.652 0 17.5-7.852 17.5-17.5s-7.852-17.5-17.5-17.5-17.5 7.851-17.5 17.5m3.5 0c0-7.72 6.28-14 14-14 7.722 0 14 6.28 14 14 0 7.718-6.282 14-14 14-7.72 0-14-6.282-14-14m12.25 0a1.75 1.75 0 1 0 3.5-.004v-7.086c0-.965-.786-1.75-1.75-1.75-.965 0-1.75.785-1.75 1.75zm.358 6.642a1.969 1.969 0 1 1 2.784-2.785 1.969 1.969 0 0 1-2.784 2.785"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Help' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
