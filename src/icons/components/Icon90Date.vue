<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M9.086 36.258h21.867a5.29 5.29 0 0 0 5.281-5.274V9.114a5.283 5.283 0 0 0-5.277-5.278H9.086a5.283 5.283 0 0 0-5.277 5.277V30.98a5.283 5.283 0 0 0 5.277 5.278M7.313 9.113c0-.976.796-1.773 1.773-1.773h21.871c.977 0 1.773.797 1.773 1.773v21.871c0 .977-.796 1.774-1.773 1.774H9.086a1.777 1.777 0 0 1-1.773-1.774zm3.707 15.32c.34.34.789.512 1.238.512.445 0 .894-.172 1.238-.511l4.227-4.23 3.379 3.378a1.75 1.75 0 0 0 2.476 0l5.445-5.441a1.752 1.752 0 0 0-2.476-2.477l-4.207 4.203-3.38-3.379c-.655-.656-1.82-.656-2.476 0l-5.464 5.469a1.75 1.75 0 0 0 0 2.477"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Date' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
