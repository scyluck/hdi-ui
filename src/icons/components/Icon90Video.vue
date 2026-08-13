<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M7.691 32.453h15.684a5.22 5.22 0 0 0 5.219-5.215v-.442l4.347 1.852a3.23 3.23 0 0 0 3.07-.281 3.25 3.25 0 0 0 1.462-2.715V14.574a3.252 3.252 0 0 0-4.532-2.992l-4.347 1.852v-.442a5.223 5.223 0 0 0-5.219-5.219H7.691a5.223 5.223 0 0 0-5.218 5.22v14.241a5.223 5.223 0 0 0 5.218 5.22m20.903-15.215v5.754l5.379 2.293v-10.34zm-3.5-1.273v-2.973c0-.945-.77-1.719-1.719-1.719H7.691c-.945 0-1.718.77-1.718 1.72v14.245c0 .946.77 1.719 1.718 1.719h15.684c.945 0 1.719-.77 1.719-1.719v-2.973l-.004-.117v-8.066q0-.06.004-.117M8.189 16.1a1.969 1.969 0 1 1 3.638-1.507A1.969 1.969 0 0 1 8.189 16.1"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Video' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
