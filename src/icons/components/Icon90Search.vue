<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M3.715 18.871c0 8.188 6.66 14.852 14.851 14.852 3.525 0 6.766-1.234 9.316-3.293l5.622 5.304c.316.297.715.446 1.117.446a1.64 1.64 0 0 0 1.188-.508 1.63 1.63 0 0 0-.067-2.3l-5.564-5.251a14.78 14.78 0 0 0 3.24-9.25c0-8.187-6.664-14.851-14.852-14.851-8.187 0-14.851 6.664-14.851 14.851m23.109 8.136a11.56 11.56 0 0 0 3.34-8.136c0-6.394-5.203-11.598-11.598-11.598-6.394 0-11.597 5.204-11.597 11.598S12.172 30.47 18.566 30.47a11.56 11.56 0 0 0 8.16-3.367q.047-.05.098-.095"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Search' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
