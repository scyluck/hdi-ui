<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M21.809 30.064v2.678h2.644a1.758 1.758 0 0 1 0 3.516h-8.8a1.758 1.758 0 0 1 0-3.516h2.64v-2.678c-5.15-.797-9.175-5.044-9.636-10.294h-.86a5.213 5.213 0 0 1-5.207-5.208 5.213 5.213 0 0 1 5.207-5.207h.816v-.382a5.03 5.03 0 0 1 5.028-5.028h12.824a5.034 5.034 0 0 1 5.027 5.028v.386h.817a5.213 5.213 0 0 1 5.207 5.207 5.21 5.21 0 0 1-5.207 5.204h-.861c-.463 5.252-4.49 9.497-9.64 10.294m6.164-18.959v7.653c0 4.367-3.559 7.922-7.922 7.922s-7.918-3.555-7.918-7.918V8.977a1.51 1.51 0 0 1 1.508-1.508v-.004h12.824a1.51 1.51 0 0 1 1.508 1.508zm3.52 5.145h.816a1.69 1.69 0 0 0 1.687-1.688 1.69 1.69 0 0 0-1.687-1.687h-.817zm-22.88-3.367h-.816v-.004a1.69 1.69 0 0 0-1.688 1.687c0 .93.758 1.688 1.688 1.688h.816z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Trophy3' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
