<template>
  <slot
      v-if="column.tableCellType === 'SLOT'"
      :name="column.tableCellFormatter"
      :row="row"
      :column="column"
      v-bind="getCellProps(column, row)"
  />

  <el-tag v-else-if="column.tableCellType === 'TAG'" v-bind="getCellProps(column, row)">
    {{ getTableCellDisplay(column, row) }}
  </el-tag>

  <span v-else v-bind="getCellProps(column, row)">
      {{ getTableCellDisplay(column, row) }}
    </span>
</template>

<script setup lang="ts">
import { ElTag } from 'element-plus'
import type {TableColumn} from './types'
import {getTableCellDisplay} from './utils'

defineProps<{
  column: TableColumn
  row: Record<string, any>
}>()

const getCellProps = (column: TableColumn, row: Record<string, any>) => {
  const value = column.prop ? row[column.prop] : undefined
  const style = column.bindCell || {}

  // 处理每个配置项
  return Object.keys(style).reduce((props, key) => {
    const val = style[key]

    if (typeof val === 'function') {
      // 函数：调用并传入值和行
      props[key] = val(value, row)
    } else if (val && typeof val === 'object') {
      // 对象映射：根据值查找对应属性
      props[key] = val[value]
    } else {
      // 静态值
      props[key] = val
    }

    return props
  }, {} as Record<string, any>)
}
</script>
