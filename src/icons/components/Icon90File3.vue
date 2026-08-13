<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M4 7.5a5 5 0 0 1 5-5h22a5 5 0 0 1 5 5v25a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM9 6h22a1.5 1.5 0 0 1 1.5 1.5v25A1.5 1.5 0 0 1 31 34H9a1.5 1.5 0 0 1-1.5-1.5v-25A1.5 1.5 0 0 1 9 6m9.238 9h-4.597c-.965 0-1.75-.785-1.75-1.75s.785-1.75 1.75-1.75h4.597c.965 0 1.75.785 1.75 1.75S19.203 15 18.238 15m-4.597 6.855h12.597c.965 0 1.75-.785 1.75-1.75 0-.964-.785-1.75-1.75-1.75H13.641c-.965 0-1.75.786-1.75 1.75 0 .965.785 1.75 1.75 1.75m0 6.735h12.597c.965 0 1.75-.785 1.75-1.75s-.785-1.75-1.75-1.75H13.641c-.965 0-1.75.785-1.75 1.75s.785 1.75 1.75 1.75"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90File3' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
