<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M9.086 37.406h21.828a5.26 5.26 0 0 0 5.258-5.258V7.852a5.265 5.265 0 0 0-5.258-5.258H9.086a5.265 5.265 0 0 0-5.258 5.258v24.296a5.265 5.265 0 0 0 5.258 5.258M7.309 7.852c0-.98.796-1.778 1.777-1.778h21.828c.98 0 1.777.797 1.777 1.778v24.296c0 .981-.796 1.778-1.777 1.778H9.086c-.98 0-1.777-.797-1.777-1.778zm7.238 13.336h4.766a4.165 4.165 0 0 0 4.156-4.16v-4.766a4.16 4.16 0 0 0-4.156-4.157h-4.766a4.163 4.163 0 0 0-4.16 4.157v4.765a4.166 4.166 0 0 0 4.16 4.16m-.676-8.926c0-.371.3-.676.676-.676h4.766c.37 0 .675.3.675.676v4.765c0 .371-.3.676-.675.676h-4.766a.676.676 0 0 1-.676-.676zm-1.312 16.91h9.789c.965 0 1.742-.777 1.742-1.742s-.781-1.742-1.742-1.742h-9.79a1.741 1.741 0 1 0 0 3.484"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Record2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
