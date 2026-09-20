<template>
  <div
      :style="{
      'max-height': tableConfig?.maxHeight || '100%'
    }"
  >
    <el-table
        ref="tableRef"
        :data="data"
        v-loading="loading"
        height="100%"
        v-bind="tableConfig?.tableAttrs"
        v-on="enrichTableEvents(tableConfig?.tableEvents || {})"
    >
      <TableColumns
          :columns="columns"
          :page-info="pageInfo"
          :cell-slots="slots"
          @operate-click="operateClick"
      />
      <!-- 自定义插槽 -->
      <template v-for="(value, key) in tableConfig?.tableSlots" #[key]="scope">
        <slot :name="value" v-bind="scope" />
      </template>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, useSlots } from 'vue'
import { ElTable } from 'element-plus'
import TableColumns, { type PreparedTableColumn } from './table-columns'
import type { ToolbarButton, PageInfo } from './types'
import {enrichTableEvents} from './utils'
import type { TableInstance } from 'element-plus'

withDefaults(defineProps<{
  data?: any[]
  loading?: boolean
  columns?: PreparedTableColumn[]
  tableConfig?: Record<string, any>
  pageInfo?: PageInfo // 分页信息,用于索引计算
}>(), {
  data: () => [],
  loading: false
})

const emit = defineEmits<{
  (e: 'operateClick', btn: ToolbarButton, row: any): void
}>()

const tableRef = ref<TableInstance>()
const slots = useSlots()

const operateClick = (btn: ToolbarButton, row: any) => {
  emit('operateClick', btn, row)
}

// 直接暴露 el-table 实例
// 用户可以通过 tableRef 直接访问 el-table 的所有方法
defineExpose({
  tableRef
})

</script>
