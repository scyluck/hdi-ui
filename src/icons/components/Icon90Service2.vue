<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M17.52 35.25a3.443 3.443 0 0 0 5.008.008l13.995-14.766a3.445 3.445 0 0 0 .54-3.992L31.332 5.742a3.44 3.44 0 0 0-3.043-1.828H11.695c-1.273 0-2.437.7-3.039 1.824L2.934 16.422a3.45 3.45 0 0 0 .539 4.008zM11.7 7.414l16.546-.027 5.738 10.691L20.04 32.816 6.023 18.074zm8.312 14.563h.004c3.074 0 5.937-1.227 8.066-3.454a1.752 1.752 0 0 0-2.54-2.414 7.55 7.55 0 0 1-5.522 2.368h-.004a7.56 7.56 0 0 1-5.524-2.375 1.752 1.752 0 0 0-2.543 2.41 11.02 11.02 0 0 0 8.063 3.465"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Service2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
