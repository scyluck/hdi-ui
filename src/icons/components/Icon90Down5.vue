<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M32.424 7.407c.36.36.539.832.539 1.305s-.18.945-.54 1.305L21.366 21.075a1.84 1.84 0 0 1-2.61 0L7.698 10.017a1.84 1.84 0 0 1 0-2.61 1.84 1.84 0 0 1 2.61 0l9.754 9.754 9.753-9.754a1.84 1.84 0 0 1 2.61 0m0 11.366c.36.36.539.832.539 1.305s-.18.945-.54 1.305L21.366 32.44a1.84 1.84 0 0 1-2.61 0L7.698 21.383a1.84 1.84 0 0 1 0-2.61 1.84 1.84 0 0 1 2.61 0l9.754 9.754 9.753-9.754a1.84 1.84 0 0 1 2.61 0"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Down5' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
