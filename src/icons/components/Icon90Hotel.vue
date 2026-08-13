<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M5.543 37.164h28.992c.945 0 1.715-.766 1.715-1.715V20.22c0-2.828-2.211-5.133-4.934-5.133H24.73v-2.672c0-2.156-1.285-4.102-3.203-4.844L10.176 3.172a4.48 4.48 0 0 0-4.203.496c-1.344.918-2.145 2.477-2.145 4.164v27.617c0 .946.77 1.715 1.715 1.715m15.762-20.363v-4.39c0-.75-.407-1.411-1.016-1.645L8.938 6.37a1.07 1.07 0 0 0-1.024.129c-.41.281-.652.781-.652 1.336v25.898h14.043zm-9.918 1.715h5.96a1.715 1.715 0 1 0 0-3.43h-5.96c-.946 0-1.715.77-1.715 1.715s.77 1.715 1.715 1.715M32.82 33.734h-8.086V18.516h6.582c.829 0 1.504.761 1.504 1.703zm-21.433-5.41h5.96a1.715 1.715 0 1 0 0-3.43h-5.96c-.946 0-1.715.77-1.715 1.715s.77 1.715 1.715 1.715"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Hotel' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
