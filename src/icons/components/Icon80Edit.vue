<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M4.586 30.889q-.071.81.502 1.384l.003.002q.514.506 1.231.506.101 0 .159-.006l8.308-.737q.627-.054 1.076-.503L34.559 12.84q.511-.512.511-1.232 0-.721-.51-1.232l-7.575-7.578q-.512-.513-1.234-.513-.726 0-1.232.515L5.823 21.497q-.45.449-.503 1.08zM23.02 9.224l5.114 5.114 2.731-2.731-5.11-5.115zM8.24 29.122l5.609-.499 11.82-11.817-5.113-5.114-11.821 11.82zm28.682 8.139q.452-.453.452-1.094 0-.642-.452-1.094-.453-.453-1.095-.453H4.173q-.642 0-1.095.453-.452.452-.452 1.094 0 .641.452 1.094.453.453 1.095.453h31.654q.642 0 1.095-.453"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon80Edit' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
