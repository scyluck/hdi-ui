<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M2.547 20.023c0 9.63 7.836 17.465 17.465 17.465a17.4 17.4 0 0 0 12.41-5.186 17.4 17.4 0 0 0 5.055-12.275c0-9.629-7.836-17.464-17.465-17.464A17.4 17.4 0 0 0 7.766 7.586a2 2 0 0 0-.2.199 17.4 17.4 0 0 0-5.02 12.238m6.432-8.56a13.9 13.9 0 0 0-2.936 8.56c0 7.704 6.266 13.97 13.969 13.97a13.9 13.9 0 0 0 8.56-2.937zM31.04 28.588a13.9 13.9 0 0 0 2.94-8.565c0-7.703-6.266-13.968-13.97-13.968a13.9 13.9 0 0 0-8.563 2.94z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Forbid' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
