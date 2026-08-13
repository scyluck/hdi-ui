<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M8.77 36.36h22.316a4.9 4.9 0 0 0 4.89-4.891v-18.04a4.88 4.88 0 0 0-1.187-3.19L30.441 5.19a4.87 4.87 0 0 0-3.703-1.699H8.77a4.9 4.9 0 0 0-4.891 4.89V31.47a4.9 4.9 0 0 0 4.89 4.89M26.53 20.272H13.324c-.96 0-1.742-.78-1.742-1.742V6.981H8.77c-.774 0-1.403.628-1.403 1.402v23.086c0 .773.63 1.402 1.403 1.402h22.32c.773 0 1.402-.629 1.402-1.402v-18.04a1.4 1.4 0 0 0-.34-.913l-3.879-4.5v10.515a1.74 1.74 0 0 1-1.742 1.742M24.79 6.98h-9.723v9.81h9.723zm-3.16 7.09c-.961 0-1.742-.78-1.742-1.742v-1.11a1.743 1.743 0 0 1 3.484.001v1.11a1.74 1.74 0 0 1-1.742 1.741"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Save2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
