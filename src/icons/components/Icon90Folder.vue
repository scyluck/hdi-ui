<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M37.473 16.266v14.976c0 2.719-2.207 4.934-4.922 4.934H7.629a4.93 4.93 0 0 1-4.922-4.93V8.777A4.89 4.89 0 0 1 7.59 3.895h6.894c1.61 0 3.114.796 4.024 2.128.074.11.137.223.183.348l1.36 3.488c.27.313.66.496 1.078.496h11.473a4.877 4.877 0 0 1 4.87 4.872zm-3.477-1.047v16.023c0 .8-.648 1.453-1.445 1.453H7.629a1.45 1.45 0 0 1-1.445-1.453V8.777c0-.777.632-1.406 1.406-1.406h6.894c.407 0 .79.176 1.051.48l1.356 3.485c.047.125.109.238.183.348a4.9 4.9 0 0 0 4.051 2.14h11.477c.77 0 1.394.625 1.394 1.395"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Folder' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
