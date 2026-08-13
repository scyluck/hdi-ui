<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M8.016 36.066h23.691a5.77 5.77 0 0 0 5.766-5.765v-9.04c0-.96-.782-1.741-1.743-1.741h-6.304V9.082a5.25 5.25 0 0 0-5.246-5.246H8.016A5.25 5.25 0 0 0 2.77 9.082V30.82a5.25 5.25 0 0 0 5.246 5.246m17.925-6.632V9.082c0-.973-.789-1.762-1.761-1.762H8.016c-.973 0-1.762.79-1.762 1.762V30.82c0 .973.789 1.762 1.762 1.762h18.396a5.7 5.7 0 0 1-.47-2.281zm5.77 3.148a2.284 2.284 0 0 0 2.281-2.281v-7.297H29.43V30.3a2.284 2.284 0 0 0 2.28 2.281M11.44 17.227h9.168a1.741 1.741 0 1 0 0-3.485H11.44c-.96 0-1.742.781-1.742 1.742s.781 1.743 1.742 1.743m0 8.586h5.684a1.744 1.744 0 0 0 0-3.484H11.44a1.743 1.743 0 0 0 0 3.484"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Paper' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
