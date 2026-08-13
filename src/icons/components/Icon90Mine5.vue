<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M26.75 35.754a1.75 1.75 0 1 0 3.5 0 10.23 10.23 0 0 0-1.844-5.852C32.47 27.137 35 22.477 35 17.496c0-8.27-6.723-15-14.996-15S5 9.223 5 17.496c0 4.984 2.527 9.64 6.594 12.406a10.25 10.25 0 0 0-1.844 5.852 1.75 1.75 0 1 0 3.5 0 6.75 6.75 0 0 1 2.234-5.004c.434-.39.641-.973.559-1.55a1.76 1.76 0 0 0-.98-1.329C11.078 25.97 8.5 21.898 8.5 17.496c0-6.34 5.16-11.5 11.5-11.5s11.5 5.16 11.5 11.5c0 4.398-2.574 8.473-6.562 10.375a1.754 1.754 0 0 0-.896 2.173c.098.271.26.513.474.706a6.76 6.76 0 0 1 2.234 5.004M13.16 17.602a1.75 1.75 0 1 0 3.5 0v-2.25a1.75 1.75 0 1 0-3.5 0zm6.688 0a1.75 1.75 0 1 0 3.5 0v-2.25a1.75 1.75 0 1 0-3.5 0z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Mine5' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
