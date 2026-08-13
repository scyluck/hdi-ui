<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M37.514 16.213v15.08a4.966 4.966 0 0 1-4.957 4.969H7.447c-2.734 0-4.96-2.23-4.96-4.969V8.656a4.925 4.925 0 0 1 4.917-4.918h6.946c1.625 0 3.14.801 4.05 2.145q.113.165.184.347l1.371 3.512c.27.317.664.5 1.086.5h11.563a4.916 4.916 0 0 1 4.91 4.91zm-3.496-.136-.004.118v15.098c0 .809-.653 1.465-1.457 1.465H7.443a1.46 1.46 0 0 1-1.457-1.465V8.66a1.42 1.42 0 0 1 1.418-1.418h6.953c.41 0 .793.18 1.059.485l1.371 3.511q.072.183.184.348a4.92 4.92 0 0 0 4.078 2.16H32.61c.778 0 1.407.629 1.407 1.406zM19.604 29.82a1.75 1.75 0 0 1-1.75-1.75v-3.03h-3.028a1.75 1.75 0 1 1 0-3.5h3.028v-3.032a1.75 1.75 0 1 1 3.5 0v3.031h3.03a1.75 1.75 0 1 1 0 3.5h-3.03v3.027a1.75 1.75 0 0 1-1.75 1.754"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90FolderAdd' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
