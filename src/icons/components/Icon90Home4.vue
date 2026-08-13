<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="m20.914 4.273 15.742 9.649.004-.004a1.75 1.75 0 0 1-1.828 2.984l-.43-.261v17.593c0 .965-.785 1.75-1.75 1.75-.964 0-1.75-.785-1.75-1.75V14.496L20 7.816l-10.898 6.68v19.742c0 .965-.786 1.75-1.75 1.75-.965 0-1.75-.785-1.75-1.75V16.645l-.43.261a1.75 1.75 0 0 1-1.828-2.984l15.742-9.649a1.75 1.75 0 0 1 1.828 0m4.652 21.2a1.755 1.755 0 0 1 2.461-.274l-.004-.008c.754.606.875 1.707.274 2.461-1.777 2.227-4.879 3.555-8.297 3.555-3.39 0-6.48-1.312-8.266-3.512a1.753 1.753 0 0 1 .258-2.46 1.753 1.753 0 0 1 2.461.257c1.11 1.367 3.235 2.219 5.547 2.219 2.332 0 4.461-.856 5.566-2.238"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Home4' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
