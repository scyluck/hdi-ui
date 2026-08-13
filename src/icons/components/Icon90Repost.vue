<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M19.973 36.258c-8.938 0-16.211-7.274-16.211-16.211 0-8.938 7.273-16.211 16.21-16.211a1.622 1.622 0 0 1 0 3.242c-7.152 0-12.968 5.817-12.968 12.969s5.816 12.969 12.969 12.969 12.968-5.817 12.968-12.97a1.622 1.622 0 0 1 3.243 0c0 8.938-7.27 16.212-16.211 16.212M32.94 12.582a1.622 1.622 0 0 0 3.243 0V8.629a4.8 4.8 0 0 0-4.793-4.793h-3.996a1.622 1.622 0 0 0 0 3.242h3.285L18.852 18.906a1.622 1.622 0 0 0 2.289 2.297l11.8-11.8z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Repost' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
