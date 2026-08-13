<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M33.965 33.32h1.797a1.762 1.762 0 0 1 0 3.524H4.234a1.762 1.762 0 0 1 0-3.524h1.797V8.488a5.343 5.343 0 0 1 5.336-5.336H28.63a5.343 5.343 0 0 1 5.336 5.336zm-7.606-5.328v5.328h4.082V8.488c0-.996-.812-1.808-1.808-1.808H11.367c-.996 0-1.808.812-1.808 1.808V33.32h4.082v-5.328A6.365 6.365 0 0 1 20 21.632a6.365 6.365 0 0 1 6.36 6.36M14.113 9.488h2.395a1.762 1.762 0 0 1 0 3.524h-2.395a1.762 1.762 0 0 1 0-3.524m9.38 0h2.394a1.762 1.762 0 0 1 0 3.524h-2.395a1.762 1.762 0 0 1 0-3.524m-9.38 6.07h2.395a1.762 1.762 0 0 1 0 3.524h-2.395a1.762 1.762 0 0 1 0-3.523m9.38 0h2.394a1.762 1.762 0 0 1 0 3.524h-2.395a1.762 1.762 0 0 1 0-3.523m-6.329 12.434v5.328h5.668v-5.328a2.834 2.834 0 0 0-5.668 0"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Building7' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
