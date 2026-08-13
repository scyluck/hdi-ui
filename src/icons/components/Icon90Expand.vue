<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M32.559 17.379c0 .96.78 1.742 1.742 1.742.96 0 1.742-.781 1.742-1.742V8.652a4.8 4.8 0 0 0-1.325-3.315 2 2 0 0 0-.176-.176 4.8 4.8 0 0 0-3.315-1.325H22.5c-.961 0-1.742.781-1.742 1.742S21.539 7.32 22.5 7.32h7.594l-8.117 8.118a1.745 1.745 0 0 0 1.23 2.976c.445 0 .895-.172 1.234-.512l8.118-8.117zM8.645 36.082h8.722a1.744 1.744 0 0 0 0-3.488h-7.62l8.112-8.11c.68-.68.68-1.785 0-2.464a1.745 1.745 0 0 0-2.464 0l-8.082 8.082v-7.563a1.744 1.744 0 0 0-3.484 0v8.727a4.82 4.82 0 0 0 4.816 4.816"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Expand' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
