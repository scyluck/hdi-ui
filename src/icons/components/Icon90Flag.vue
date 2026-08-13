<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M16.223 22.266H7.62v13.476a1.745 1.745 0 1 1-3.492 0V7.722a5.16 5.16 0 0 1 5.156-5.156h9.59a4.96 4.96 0 0 1 4.953 4.954v1.02h7.074a5.03 5.03 0 0 1 5.024 5.023v9.656c0 2.762-2.254 5.015-5.024 5.015h-9.656a5.03 5.03 0 0 1-5.023-5.023zm1.628-3.493H7.621V7.723c0-.918.746-1.664 1.664-1.664h9.59c.805 0 1.46.656 1.46 1.46v9.786c0 .808-.655 1.468-1.46 1.468h-.789a2 2 0 0 0-.235 0m1.864 3.421v1.017a1.53 1.53 0 0 0 1.527 1.527h9.656a1.53 1.53 0 0 0 1.528-1.527v-9.652a1.53 1.53 0 0 0-1.528-1.528h-7.07v5.274a4.97 4.97 0 0 1-4.113 4.89"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Flag' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
