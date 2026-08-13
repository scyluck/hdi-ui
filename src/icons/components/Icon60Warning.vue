<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M6.113 35.594h27.852c1.27 0 2.406-.656 3.043-1.758a3.47 3.47 0 0 0 0-3.516L23.082 6.203a3.47 3.47 0 0 0-3.043-1.758 3.48 3.48 0 0 0-3.043 1.758L3.07 30.32a3.47 3.47 0 0 0 0 3.516 3.47 3.47 0 0 0 3.043 1.758m-1.011-4.102L19.023 7.375a1.15 1.15 0 0 1 1.016-.586c.203 0 .711.059 1.016.586L34.98 31.492c.305.528.102.996 0 1.172a1.16 1.16 0 0 1-1.015.586H6.117a1.15 1.15 0 0 1-1.015-.586 1.15 1.15 0 0 1 0-1.172M18.469 15.04c0-.59.914-1.07 1.562-1.07.645 0 1.563.476 1.563 1.07l-.39 9.574c0 .59-.524 1.07-1.173 1.07-.648 0-1.172-.476-1.172-1.07zm2.163 11.968a1.563 1.563 0 1 1-1.196 2.887 1.563 1.563 0 0 1 1.196-2.887"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon60Warning' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
