<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M7.422 3.848h25.035A4.96 4.96 0 0 1 37.41 8.8v18.492a4.96 4.96 0 0 1-4.953 4.953h-6l-3.02 3.14a4.9 4.9 0 0 1-3.562 1.516h-.023a4.9 4.9 0 0 1-3.57-1.55l-2.934-3.11H7.422a4.96 4.96 0 0 1-4.953-4.953V8.801a4.96 4.96 0 0 1 4.953-4.953M32.46 28.75c.8 0 1.457-.656 1.457-1.46V8.8a1.46 1.46 0 0 0-1.457-1.46H7.421c-.804 0-1.46.656-1.46 1.46v18.49c0 .804.656 1.46 1.46 1.46h5.981a3.37 3.37 0 0 1 2.446 1.055l2.972 3.152c.274.29.649.45 1.047.453h.008c.395 0 .766-.16 1.043-.445l3.059-3.184a3.37 3.37 0 0 1 2.421-1.031zM21.684 16.895h3.558c.965 0 1.75.78 1.746 1.75 0 .964-.781 1.746-1.746 1.746h-3.558v3.554a1.745 1.745 0 1 1-3.493 0v-3.558h-3.558a1.745 1.745 0 1 1 0-3.492h3.558v-3.56a1.745 1.745 0 1 1 3.493 0z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Inquire' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
