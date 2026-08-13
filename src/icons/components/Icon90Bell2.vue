<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M21.797 5.907c6.186.865 10.965 6.252 10.965 12.745v5.918l2.14 4.106c.422.808.39 1.758-.082 2.539a2.54 2.54 0 0 1-2.195 1.238h-6.709a5.94 5.94 0 0 1-5.87 5.055 5.94 5.94 0 0 1-5.868-5.055h-6.71a2.55 2.55 0 0 1-2.195-1.238 2.57 2.57 0 0 1-.082-2.54l2.141-4.105v-5.918c0-6.493 4.778-11.88 10.965-12.745v-1.66a1.75 1.75 0 1 1 3.5 0zm-4.02 26.546a2.435 2.435 0 0 0 4.54 0zm13.32-3.5h-22.1l1.632-3.144c.129-.25.2-.528.2-.809v-6.348c0-5.164 4.132-9.363 9.214-9.363s9.215 4.2 9.215 9.363V25c0 .281.07.559.199.809zm-7.16-10.703a1.75 1.75 0 0 0 1.727 1.484q.136-.002.266-.015a1.75 1.75 0 0 0 1.465-1.996c-.497-3.227-2.973-5.743-6.16-6.262a1.75 1.75 0 0 0-.562 3.453c1.686.273 2.999 1.613 3.265 3.336"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Bell2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
