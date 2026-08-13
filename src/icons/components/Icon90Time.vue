<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M2.527 19.992c0 9.649 7.852 17.5 17.5 17.5 9.653 0 17.5-7.851 17.5-17.5 0-9.648-7.851-17.5-17.5-17.5-9.648 0-17.5 7.852-17.5 17.5m3.5 0c0-7.719 6.282-14 14-14 7.723 0 14 6.281 14 14s-6.28 14-14 14c-7.718 0-14-6.281-14-14m14 2.54h7.317c.965 0 1.75-.786 1.75-1.75 0-.966-.785-1.75-1.75-1.75h-5.578l-.063-9.114a1.75 1.75 0 0 0-1.75-1.738h-.012a1.75 1.75 0 0 0-1.738 1.761l.074 10.852c.008.96.79 1.738 1.75 1.738"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Time' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
