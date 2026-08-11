<template>
    <!-- 分组表头 -->
    <el-table-column
        v-if="isGroupHeader(config)"
        :label="config.label"
        v-bind="getColumnProps(config)"
    >
      <template v-for="column in config.children" :key="column.prop">
        <TableContent :config="column" :pageInfo="pageInfo" @operateClick="handleOperateClick" />
      </template>
    </el-table-column>

    <!-- 单表头 -->
    <el-table-column
        v-else
        :prop="config.prop"
        :label="config.label"
        :type="config.type"
        v-bind="getColumnProps(config)"
    >
      <!-- 自定义插槽 -->
      <template v-for="(value, key) in config?.tableColumnSlots" #[key]="scope">
        <slot :name="value" v-bind="scope"/>
      </template>
      <!-- 默认插槽，筛选、序号列不渲染 -->
      <template v-if="!Object.keys(config?.tableColumnSlots || {})?.includes('default') && !defaultSlotType.includes(config.type)" #default="scope">
        <template v-if="config.type === 'operate'">
          <div class="operate-buttons">
            <template v-for="btn in operateButtons" :key="btn.btnType">
              <OperateButton
                  :btn="btn"
                  :row="scope.row"
                  @click="handleOperateClick"
              />
            </template>
          </div>
        </template>
        <template v-else>
          <TableCellRenderer :column="config" :row="scope.row"/>
        </template>
      </template>
    </el-table-column>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ElTableColumn } from 'element-plus'
import type {TableColumn, ToolbarButton, PageInfo} from './types'
import {isGroupHeader, shouldShowButton, enrichButton} from './utils'
import TableCellRenderer from './table-cell.vue'
import OperateButton from './operation.vue'
import {defaultSlotType} from './const'
import TableContent from './table-content.vue'

const props = defineProps<{
  config: TableColumn
  pageInfo?: PageInfo // 分页信息,用于索引计算
}>()

const emit = defineEmits<{
  (e: 'operateClick', btn: ToolbarButton, row: any): void
}>()

const operateButtons = computed(() => {
  if (props.config.type !== 'operate') return []
  const options = (props.config.options || []) as ToolbarButton[][]
  return options.flat()
      .filter((btn: ToolbarButton) => shouldShowButton(btn))
      .map(enrichButton)
})

const getColumnProps = (column: TableColumn) => {
  const { bindColumn, type } = column
  const result: Record<string, any> = {
    ...bindColumn,
    align: bindColumn?.align || 'center',
  }

  if (type === 'index') {
    result.index = indexMethodFunc
  }

  return result
}

const handleOperateClick = (btn: ToolbarButton, row: any) => {
  emit('operateClick', btn, row)
}

// 序号列索引计算
const indexMethodFunc: Function | Number = (index: number, row: any) => {
  const { indexMethod } = props.config
  const { pageNum = 1, pageSize = 10 } = props.pageInfo || {}

  if (typeof indexMethod === 'function') {
    // 函数模式：调用自定义索引方法
    return indexMethod(index, row, props.pageInfo || { pageNum: 1, pageSize: 10, total: 0 })
  } else if (typeof indexMethod === 'string') {
    // 字符串模式,直接返回字符串
    return indexMethod
  } else {
    // 默认模式：配合分页累加计算
    return (pageNum - 1) * pageSize + index + 1
  }
}
</script>
