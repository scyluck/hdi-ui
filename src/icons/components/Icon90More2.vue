<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M2.508 20.012c0 9.652 7.851 17.504 17.504 17.504 9.652 0 17.504-7.852 17.504-17.504S29.664 2.508 20.012 2.508 2.508 10.359 2.508 20.012m3.5 0c0-7.723 6.281-14.004 14.004-14.004 7.719 0 14.004 6.281 14.004 14.004s-6.282 14.004-14.004 14.004c-7.723 0-14.004-6.282-14.004-14.004m5.17 1.392a1.969 1.969 0 1 1 2.784-2.784 1.969 1.969 0 0 1-2.784 2.784m6.865-1.392a1.97 1.97 0 1 0 3.939 0 1.97 1.97 0 0 0-3.939 0m7.587.753a1.97 1.97 0 1 1 3.64-1.507 1.97 1.97 0 0 1-3.64 1.507"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90More2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
