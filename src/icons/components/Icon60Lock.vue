<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M30.504 15.137h3.402a3.52 3.52 0 0 1 3.516 3.515v15.27a3.52 3.52 0 0 1-3.516 3.515H6.078a3.52 3.52 0 0 1-3.516-3.515v-15.27a3.52 3.52 0 0 1 3.516-3.515H9.48v-2.293c0-2.739 1.098-5.317 3.09-7.25 1.985-1.926 4.621-2.989 7.422-2.989s5.438 1.063 7.422 2.989c1.992 1.933 3.09 4.508 3.09 7.25zM19.988 4.949c-4.504 0-8.168 3.543-8.168 7.895v2.293h16.336v-2.293c0-4.352-3.664-7.895-8.168-7.895m13.918 30.145c.645 0 1.172-.528 1.172-1.172v-15.27c0-.644-.527-1.172-1.172-1.172H6.074c-.644 0-1.172.528-1.172 1.172v15.27c0 .644.528 1.172 1.172 1.172zm-15.086-6.07a1.17 1.17 0 0 0 1.172 1.171c.645 0 1.172-.527 1.172-1.172v-5.468a1.17 1.17 0 0 0-1.172-1.172 1.17 1.17 0 0 0-1.172 1.172z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon60Lock' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
