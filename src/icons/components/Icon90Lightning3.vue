<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path d="M15.508 37.512H9.43a2.658 2.658 0 0 1-2.446-3.7L12.464 21H7.942a2.659 2.659 0 0 1-2.29-4.008l7.783-13.195a2.67 2.67 0 0 1 2.289-1.309H32.06a2.659 2.659 0 0 1 2.289 4.008l-6.465 10.965h1.808a2.658 2.658 0 0 1 1.914 4.5L17.422 36.695c-.5.52-1.195.817-1.914.817m-4.75-3.535h4.379l12.496-12.985h-1.281a2.659 2.659 0 0 1-2.289-4.008l6.464-10.96H16.223L9.477 17.46h4.316c.894 0 1.727.445 2.219 1.195.492.746.578 1.684.226 2.508z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Lightning3' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
