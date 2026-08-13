<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M23.902 17.566h10.72a1.63 1.63 0 0 0 1.628-1.628c0-6.739-5.48-12.22-12.219-12.223a1.63 1.63 0 0 0-1.629 1.629c0 2.597-.03 3.758-.062 4.984-.031 1.277-.067 2.598-.067 5.61 0 .898.73 1.628 1.63 1.628M3.7 21.34c0 8.254 6.715 14.969 14.969 14.969s14.969-6.715 14.973-14.965a1.63 1.63 0 0 0-1.63-1.63H20.298V8a1.63 1.63 0 0 0-1.629-1.629C10.415 6.371 3.7 13.086 3.7 21.34m29.145-7.031H25.53c.012-1.871.04-2.899.059-3.899.023-.93.047-1.816.058-3.293a8.99 8.99 0 0 1 7.196 7.192m-25.89 7.03c0-5.905 4.394-10.804 10.085-11.6v11.6c0 .9.73 1.63 1.629 1.63H30.27c-.797 5.691-5.696 10.086-11.602 10.086-6.461 0-11.715-5.258-11.715-11.715"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90PieChart' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
