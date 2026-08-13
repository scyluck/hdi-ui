<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path d="M35.789 32.652h-.234V13.81c0-.625-.336-1.207-.875-1.52L20.453 4.07a1.76 1.76 0 0 0-1.992.164l-9.363 7.704a1.75 1.75 0 0 0-.641 1.355v5.973L4.855 22.03a1.75 1.75 0 0 0-.687 1.39v9.235a1.753 1.753 0 0 0 .039 3.504h31.582a1.754 1.754 0 1 0 0-3.508m-3.742 0h-5.781V21.977c0-.68-.395-1.301-1.008-1.586l-3.86-1.817V8.668l10.649 6.152zM15.969 19.898l2.676 1.258c.148.102.316.176.492.23l3.62 1.704v9.566H15.97zm-4-5.777L17.89 9.25v7.672l-2.985-1.403a1.76 1.76 0 0 0-1.816.196l-1.121.86zm.492 6.5v12.031H7.68V24.29l4.777-3.668z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Building6' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
