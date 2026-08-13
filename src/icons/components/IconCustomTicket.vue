<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M28.617 9.84h3.262a4.34 4.34 0 0 1 4.336 4.336v17.71a4.34 4.34 0 0 1-4.336 4.337H12.883a5 5 0 0 1-.469-.028h-5.68a2.89 2.89 0 0 1-2.89-2.89V6.735a2.89 2.89 0 0 1 2.89-2.891h18.993a2.89 2.89 0 0 1 2.89 2.89zM16.23 30.055c2.68 0 5.2-1.043 7.094-2.938a9.96 9.96 0 0 0 2.938-7.094 9.96 9.96 0 0 0-2.938-7.093 9.97 9.97 0 0 0-7.094-2.938 9.96 9.96 0 0 0-7.093 2.938 9.97 9.97 0 0 0-2.938 7.093c0 2.68 1.043 5.2 2.938 7.094a9.97 9.97 0 0 0 7.093 2.938m15.649 3.277c.797 0 1.445-.648 1.445-1.445V14.176c0-.797-.648-1.446-1.445-1.446h-3.262v20.602zM16.23 12.879c-3.937 0-7.144 3.203-7.144 7.144 0 1.278.336 2.477.926 3.516l10.527-9.207a7.07 7.07 0 0 0-4.309-1.453M11.918 25.71a7.1 7.1 0 0 0 4.312 1.453c3.938 0 7.145-3.203 7.145-7.144a7.1 7.1 0 0 0-.926-3.516z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomTicket' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
