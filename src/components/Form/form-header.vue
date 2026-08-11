<template>
  <!-- 表单头部组件 -->
  <div
      class="form-header"
      :class="item.headerClassName || (isFirstLevel ? 'title1' : 'title2')"
      :key="item.id"
  >
      <span style="display: flex; align-items: center; gap: 0.5rem">
        <!-- 标题文本 -->
        {{ item.label }}
        <!-- 提示信息 -->
        <el-tooltip
            v-if="item.desc"
            class="item"
            effect="dark"
            :content="item.desc"
            placement="top"
            popper-class="reportFillTooltip"
        >
          <a class="tips-info">i</a>
        </el-tooltip>
      </span>
  </div>
</template>

<script setup lang="ts">
import { ElTooltip } from 'element-plus'
import type { FormItem } from './types'

/**
 * 表单头部组件
 * 用于显示表单分组标题
 */
withDefaults(
    defineProps<{
      item: FormItem  // 表单项配置
      isFirstLevel: boolean  // 是否为首层标题
    }>(),
    {
      item: () => ({}) as FormItem,
      isFirstLevel: () => true,
    },
)
</script>

<style scoped lang="scss">
/**
 * 表单头部基础样式
 */
.form-header {
  width: 100%;
}

/**
 * 一级标题样式
 */
.form-header.title1 {
  font-size: 16px;
  font-weight: bold;
  position: relative;
  padding-left: 14px;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
    width: 6px;
    height: 24px;
    border-radius: 0 4px 4px 0;
    background: var(--el-color-warning);
  }
}

/**
 * 二级标题样式
 */
.form-header.title2 {
  font-size: 14px;
  font-weight: bold;
}

/**
 * 提示信息样式
 */
.tips-info {
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--el-color-white);
  font-size: 12px;
  background-color: var(--el-color-info);
  border-radius: 50%;
  vertical-align: middle;
}
</style>
