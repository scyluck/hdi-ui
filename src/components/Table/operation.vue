<template>
  <template v-if="btn?.btnType === 'slot'">
    <slot :name="btn.btnName" :rowInfo="{ row: row, btn: btn }"></slot>
  </template>
  <template v-else>
    <el-popconfirm
        v-if="btn?.btnType === 'delete'"
        title="删除后无法恢复，您确定要删除吗？"
        confirm-button-text="删除"
        cancel-button-text="取消"
        @confirm.stop="handleClick"
    >
      <template #reference>
        <el-button link type="danger" v-bind="buttonProps">
          <template v-if="btn?.icon" #icon>
            <component :is="btn.icon"/>
          </template>
          <template v-if="btn?.btnName" #default>{{ btn.btnName }}</template>
        </el-button>
      </template>
    </el-popconfirm>
    <el-button
        v-else
        link
        type="primary"
        v-bind="buttonProps"
        @click.stop="handleClick"
    >
      <template v-if="btn?.icon" #icon>
        <component :is="btn.icon"/>
      </template>
      <template v-if="btn?.btnName" #default>{{ btn.btnName }}</template>
    </el-button>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ElPopconfirm, ElButton } from 'element-plus'
import type { ToolbarButton } from './types'

const props = withDefaults(defineProps<{
  btn?: ToolbarButton
  row?: any
}>(), {
  btn: () => ({ btnType: '' }),
  row: () => ({})
})

const emit = defineEmits<{
  (e: 'click', btn: ToolbarButton, row: any): void
}>()

const buttonProps = computed(() => {
  const disabled = typeof props.btn.disabled === 'function'
      ? props.btn.disabled(props.row)
      : props.btn.disabled
  return {
    ...props.btn.btnBind,
    disabled
  }
})

const handleClick = () => {
  emit('click', props.btn, props.row)
}
</script>
