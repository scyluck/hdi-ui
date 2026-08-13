<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M30.02 14.242h2.132a5.345 5.345 0 0 1 5.34 5.34v14.484c0 .97-.785 1.758-1.758 1.758H4.27a1.76 1.76 0 0 1-1.758-1.758V19.578a5.345 5.345 0 0 1 5.34-5.34h2.132V9.512a5.345 5.345 0 0 1 5.34-5.34h9.356a5.345 5.345 0 0 1 5.34 5.34zm-14.696-6.55a1.823 1.823 0 0 0-1.824 1.82v22.797h13V9.512c0-1.004-.816-1.82-1.82-1.82zm6.434 6.55h1.715a1.758 1.758 0 0 1 0 3.516h-1.715v1.715a1.758 1.758 0 0 1-3.516 0v-1.715h-1.715a1.758 1.758 0 0 1 0-3.516h1.715v-1.715a1.758 1.758 0 0 1 3.516 0zm8.262 18.07h3.957l-.004-.003v-12.73a1.82 1.82 0 0 0-1.82-1.821H30.02zM7.852 17.762a1.823 1.823 0 0 0-1.825 1.82v12.73h3.957v-14.55z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Hospital' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
