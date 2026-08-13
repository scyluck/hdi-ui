<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M12.16 12.89h15.81q.06 0 .118-.003h2.91c.968 0 1.753.789 1.753 1.754v7.02h-4.617v-.563a1.754 1.754 0 1 0-3.508 0v.562h-9.121v-.562a1.754 1.754 0 1 0-3.508 0v.562H7.383v-7.015c0-.97.789-1.754 1.754-1.754v-.004h2.905q.058.003.118.004m-1.754-3.507V7.648a5.25 5.25 0 0 1 5.246-5.246h8.825a5.25 5.25 0 0 1 5.246 5.246v1.735h1.273a5.265 5.265 0 0 1 5.258 5.258v17.55a5.267 5.267 0 0 1-5.262 5.254H9.137a5.265 5.265 0 0 1-5.258-5.257v-8.163a1.75 1.75 0 0 1 0-1.222v-8.162a5.265 5.265 0 0 1 5.258-5.258zm3.508 0V7.648c0-.96.777-1.742 1.738-1.742h8.825c.96 0 1.742.782 1.742 1.742v1.735zM7.383 25.168v7.027c0 .965.785 1.754 1.754 1.754h21.86c.964 0 1.753-.785 1.753-1.754v-7.027h-4.617v.562a1.754 1.754 0 1 1-3.508 0v-.562h-9.121v.562a1.754 1.754 0 1 1-3.508 0v-.562z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Briefcase' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
