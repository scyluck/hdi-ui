<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M32.805 12.57h-6.278V7.246A4.69 4.69 0 0 0 21.84 2.56h-3.75a4.69 4.69 0 0 0-4.688 4.687v5.324H7.227a4.69 4.69 0 0 0-4.688 4.688v1.25a4.69 4.69 0 0 0 2.129 3.926v10.359a4.69 4.69 0 0 0 4.687 4.687h21.286a4.69 4.69 0 0 0 4.687-4.687V22.461a4.69 4.69 0 0 0 2.168-3.95v-1.25a4.7 4.7 0 0 0-4.691-4.69m-27.14 4.688c0-.864.698-1.563 1.562-1.563h9.3v-8.45c0-.863.7-1.562 1.563-1.562h3.75c.863 0 1.562.699 1.562 1.562v8.45h9.403a1.56 1.56 0 0 1 1.562 1.562v1.25c0 .863-.699 1.562-1.562 1.562H7.227a1.56 1.56 0 0 1-1.563-1.562zm26.534 15.535c0 .863-.699 1.562-1.562 1.562h-2.852V29.66a1.562 1.562 0 1 0-3.125 0v4.695h-3.156V29.66a1.562 1.562 0 1 0-3.125 0v4.695H15.28v-4.703a1.562 1.562 0 1 0-3.125 0v4.703h-2.8a1.56 1.56 0 0 1-1.563-1.562v-9.598h24.41v9.598z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon80Clear' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
