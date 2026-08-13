<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M8.895 37.488h22.09a4.88 4.88 0 0 0 4.874-4.879V14.387c0-1.383-.59-2.707-1.62-3.633l-7.825-7.012a4.87 4.87 0 0 0-3.258-1.246H8.895a4.883 4.883 0 0 0-4.88 4.879v25.234a4.883 4.883 0 0 0 4.88 4.88M32.053 13.52a1.4 1.4 0 0 0-.15-.16l-7.825-7.011A1.4 1.4 0 0 0 23.266 6v6.121a1.4 1.4 0 0 0 1.398 1.398zm-7.393 3.5h7.7v15.594a1.38 1.38 0 0 1-1.38 1.38H8.895a1.38 1.38 0 0 1-1.38-1.38V7.375a1.38 1.38 0 0 1 1.38-1.379h10.87v6.125a4.9 4.9 0 0 0 4.895 4.898m-11.02 6.336h12.598c.965 0 1.75-.785 1.75-1.75 0-.964-.785-1.75-1.75-1.75H13.641c-.965 0-1.75.786-1.75 1.75 0 .965.785 1.75 1.75 1.75m0 6.735h12.598c.965 0 1.75-.785 1.75-1.75s-.785-1.75-1.75-1.75H13.641c-.965 0-1.75.785-1.75 1.75s.785 1.75 1.75 1.75"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90File2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
