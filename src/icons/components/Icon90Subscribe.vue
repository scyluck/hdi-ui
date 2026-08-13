<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M16.074 36.465a7.7 7.7 0 0 0 3.832 1.023 7.7 7.7 0 0 0 3.832-1.023l8.239-4.68c2.558-1.457 4.148-4.23 4.148-7.246v-13.7c0-4.593-3.625-8.331-8.078-8.331H11.766c-4.453 0-8.078 3.738-8.078 8.332v13.695c0 3.016 1.59 5.793 4.148 7.246zM7.184 10.84c0-2.664 2.054-4.832 4.582-4.832h16.277c2.527 0 4.582 2.168 4.582 4.832v13.699c0 1.758-.91 3.367-2.379 4.203l-8.238 4.684c-1.317.75-2.89.75-4.207 0l-8.238-4.684c-1.47-.832-2.38-2.445-2.38-4.203zm12.722 13.898a1.75 1.75 0 0 1-1.75-1.75v-3H15.16a1.75 1.75 0 1 1 0-3.5h2.996v-2.996a1.75 1.75 0 1 1 3.5 0v2.996h3a1.75 1.75 0 1 1 0 3.5h-3v3c0 .965-.785 1.75-1.75 1.75"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Subscribe' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
