<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M5.61 3.979a2.823 2.823 0 0 0-2.823 2.823v24.223c0 1.833.979 3.455 2.458 4.325a3.76 3.76 0 0 0 2.187.671h21.137a4.84 4.84 0 0 0 4.669-3.565l3.871-14.186a2.892 2.892 0 0 0-2.514-3.64v-2.937A2.823 2.823 0 0 0 31.77 8.87H18.91c-.5 0-.97-.246-1.25-.655l-2.091-3.02a2.82 2.82 0 0 0-2.32-1.216zm.648 18.368v-6.435h.002v-8.46h6.65l1.922 2.773.004.005a5 5 0 0 0 4.082 2.113h12.207v2.275H10.592a2.89 2.89 0 0 0-2.789 2.13zm.906 9.82 3.85-14.105h22.583l-3.681 13.487a1.396 1.396 0 0 1-1.347 1.029H7.477a.324.324 0 0 1-.313-.41"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Folderopen' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
