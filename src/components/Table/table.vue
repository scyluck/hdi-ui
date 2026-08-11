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
      <!-- 数据列 -->
      <TableContent
          v-for="(col, index) in columns"
          :key="index"
          :config="col"
          :pageInfo="pageInfo"
          @operateClick="operateClick"
      >
        <template v-for="slotName in Object.keys($slots)" #[slotName]="scope">
          <slot :name="slotName" v-bind="scope" />
        </template>
      </TableContent>
      <!-- 自定义插槽 -->
      <template v-for="(value, key) in tableConfig?.tableSlots" #[key]="scope">
        <slot :name="value" v-bind="scope" />
      </template>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElTable } from 'element-plus'
import TableContent from './table-content.vue'
import type { TableColumn, ToolbarButton, PageInfo } from './types'
import {enrichTableEvents} from './utils'
import type { TableInstance } from 'element-plus'

withDefaults(defineProps<{
  data?: any[]
  loading?: boolean
  columns?: TableColumn[]
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

const operateClick = (btn: ToolbarButton, row: any) => {
  emit('operateClick', btn, row)
}

// 直接暴露 el-table 实例
// 用户可以通过 tableRef 直接访问 el-table 的所有方法
defineExpose({
  tableRef
})

</script>
