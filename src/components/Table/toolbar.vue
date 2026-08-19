<template>
  <div v-if="show" class="toolbar-area">
    <div class="toolbar-left">
      <template v-for="btn in filterLeftButtons" :key="btn.btnType">
        <el-button v-bind="getButtonProps(btn)" @click="handleClick(btn)">
          <template v-if="btn.icon" #icon>
            <component :is="btn.icon"/>
          </template>
          <template v-if="btn?.btnName" #default>{{ btn.btnName }}</template>
        </el-button>
      </template>
      <el-dropdown v-if="filterFoldButtonsLeft?.length">
        <el-button type="primary">
          更多按钮<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="btn in filterFoldButtonsLeft" :key="btn.btnType">{{ btn.btnName }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="toolbar-right">
      <template v-for="btn in filterRightButtons" :key="btn.btnType">
        <el-button v-bind="getButtonProps(btn)" @click="handleClick(btn)">
          <template v-if="btn.icon" #icon>
            <component :is="btn.icon"/>
          </template>
          <template v-if="btn?.btnName" #default>{{ btn.btnName }}</template>
        </el-button>
      </template>
      <el-dropdown v-if="filterFoldButtonsRight?.length">
        <el-button type="primary">
          更多按钮<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="btn in filterFoldButtonsRight" :key="btn.btnType">{{ btn.btnName }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- 自定义列设置按钮（自定义表头展示），通过插槽注入 -->
      <slot name="custom-columns"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ElButton, ElDropdown, ElDropdownMenu, ElDropdownItem, ElIcon } from 'element-plus'
import type { ToolbarButton } from './types'
import { ArrowDown } from '@element-plus/icons-vue'

const props = withDefaults(defineProps<{
  show?: boolean
  leftButtons?: ToolbarButton[]
  rightButtons?: ToolbarButton[]
}>(), {
  show: false,
  leftButtons: () => [],
  rightButtons: () => []
})


const emit = defineEmits<{
  (e: 'click', btn: ToolbarButton): void
}>()

// 过滤出不放到折叠里的按钮
const filterLeftButtons = computed(() => props.leftButtons.filter(btn => !btn.isFold))
const filterRightButtons = computed(() => props.rightButtons.filter(btn => !btn.isFold))

// 过滤出放到折叠里的按钮，分左右按钮
const filterFoldButtonsLeft = computed(() => props.leftButtons.filter(btn => btn.isFold))
const filterFoldButtonsRight = computed(() => props.rightButtons.filter(btn => btn.isFold))
const getButtonProps = (btn: ToolbarButton) => {
  return {
    ...btn.btnBind,
    disabled: typeof btn.disabled === 'function' ? btn.disabled() : btn.disabled
  }
}

const handleClick = (btn: ToolbarButton) => {
  emit('click', btn)
}
</script>

<style scoped lang="scss">
.toolbar-area {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

:deep(.el-button + .el-dropdown) {
  margin-left: 12px;
}
</style>
