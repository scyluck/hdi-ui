<script setup lang="ts">
import { computed } from 'vue'
import { hasPermission } from '../../directives/permission'
import type { PermissionMode, PermissionValue } from '../../directives/permission'

defineOptions({ name: 'HdiPermission' })

interface Props {
  /** 权限标识，单个或数组 */
  value: PermissionValue
  /** 校验模式：all=必须全部拥有（默认） / any=任一拥有 / none=必须都不包含 */
  mode?: PermissionMode
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'all',
})

const allowed = computed(() => hasPermission(props.value, props.mode))
</script>

<template>
  <slot v-if="allowed" />
  <slot v-else name="fallback" />
</template>
