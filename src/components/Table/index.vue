<template>
  <div class="page-table-container">
    <!-- 头部：搜索 + 工具栏 -->
    <div :class="['page-table-header', { 'is-row': config.isSearchAndToolbarRow }]">
      <SearchArea
          :show="showSearch"
          :searchConfig="searchConfig"
          :items="searchItemsRaw"
          :customSearchState="isCustomSearchEnabled ? customSearchState : null"
          v-model="searchData"
          @submit="handleSearchSubmit"
          @reset="handleSearchReset"
      >
        <template v-for="slot in Object.keys($slots)" #[slot]="scope">
          <slot :name="slot" v-bind="scope" :prop="slot"/>
        </template>
      </SearchArea>
      <ToolbarArea
          :show="showToolbar"
          :leftButtons="leftToolbarButtons"
          :rightButtons="rightToolbarButtons"
          @click="handleToolbarButtonClick"
      >
        <!-- 自定义列设置按钮注入到工具栏右侧 -->
        <template v-if="isCustomColumnsEnabled" #custom-columns>
          <CustomColumnsConfig
              :items="config.items"
              :state="customColumnsState"
              :button-text="customColumnsState.resolvedConfig.value.buttonText"
              :icon="customColumnsState.resolvedConfig.value.icon || defaultColumnsIcon"
              :btn-bind="customColumnsState.resolvedConfig.value.btnBind"
          />
        </template>
      </ToolbarArea>
    </div>

    <!-- 表格区域 -->
    <div class="table-area">
      <!--   使用自定义表格插槽 -->
      <slot v-if="tableConfig.tableBoxType === 'slot'" name="tableBox" :data="dataRecords"/>

      <TableArea
          v-else
          ref="tableAreaRef"
          :data="dataRecords"
          :loading="loading"
          :columns="tableColumns"
          :tableConfig="tableConfig"
          :pageInfo="pagination"
          @operateClick="handleOperateButtonClick"
      >
        <!-- 透传所有插槽 -->
        <template v-for="slotName in Object.keys($slots)" #[slotName]="scope">
          <slot :name="slotName" v-bind="scope"/>
        </template>
      </TableArea>

    </div>

    <PaginationArea
        :show="showPagination"
        v-model="pagination"
        :total="pagination.total"
        :paginationConfig="paginationConfig"
        @change="pageChange"
        @sizeChange="handleSizeChange"
    />
    <!-- 弹窗 -->
    <DialogForm
        ref="dialogRef"
        :formConfig="dialogFormConfig"
        :dialogConfig="config.dialog === false ? undefined : config.dialog"
        @submit="handleDialogSubmit"
        @cancel="handleDialogCancel"
        @closed="handleDialogClosed"
    >
      <template v-for="slot in Object.keys($slots)" #[slot]="scope">
        <slot :name="slot" v-bind="scope"/>
      </template>
    </DialogForm>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue'
import SearchArea from './search.vue'
import ToolbarArea from './toolbar.vue'
import TableArea from './table.vue'
import PaginationArea from './pagination.vue'
import DialogForm from './dialog.vue'
import CustomColumnsConfig from './custom-columns.vue'
import type {TableSetConfig, TableData, TableEmits} from './types'
import {buildTableTree} from './utils'
import {prepareTableColumns} from './table-columns'
import {useTableCustomColumns} from './useTableCustomColumns'
import {useTableCustomSearch} from './useTableCustomSearch'
import {useDataView} from '../../composables/useDataView'
import {Icon80Settings as defaultColumnsIcon} from '../../icons'

defineOptions({ name: 'HdiTable' })

/**
 * 表格组件
 * 功能：集成搜索、工具栏、表格、分页和弹窗的完整表格解决方案
 * 支持：增删改查、批量操作、自定义列、自定义搜索、权限控制等功能
 * 数据层逻辑（加载/搜索/分页/工具栏/弹窗）由 useDataView 提供
 */

// 组件属性
const props = defineProps<{
  config: TableSetConfig // 表格配置
  data?: TableData // 可选的外部数据（如不提供，通过 getTableData 事件获取）
}>()

// 事件
const emit = defineEmits<TableEmits>()

// 表格区域引用
const tableAreaRef = ref()

// 获取 el-table 实例
const getElTable = () => {
  return tableAreaRef.value?.tableRef
}

// 表格配置
const tableConfig = computed(() => {
  return {
    // 默认配置
    tableBoxType: 'table',
    // 用户配置覆盖
    ...props.config.table
  }
})

// 公共数据层逻辑 + 选择能力注入
const {
  loading,
  searchData,
  pagination,
  dialogRef,
  dialogFormConfig,
  dataRecords,
  searchItemsRaw,
  leftToolbarButtons,
  rightToolbarButtons,
  showPagination,
  paginationConfig,
  loadData,
  handleSearchSubmit,
  handleSearchReset,
  pageChange,
  handleSizeChange,
  handleToolbarButtonClick,
  handleOperateButtonClick,
  openDialog,
  handleDialogSubmit,
  handleDialogCancel,
  handleDialogClosed,
  closeTheLoading,
  searchSubmit,
} = useDataView({
  props,
  emit: emit as unknown as (event: string, ...args: any[]) => void,
  selection: {
    getRows: () => getElTable()?.getSelectionRows() || [],
    clear: () => getElTable()?.clearSelection(),
    toggle: (row: any, selected?: boolean) => getElTable()?.toggleRowSelection(row, selected),
    toggleAll: () => getElTable()?.toggleAllSelection(),
  },
  getRowKey: () => tableConfig.value.rowKey || 'id',
})

// ===== 自定义列（自定义表头展示）=====
// 生成默认持久化 key（基于 rowKey + 路径，避免多表格冲突）
const customColumnsStorageKey = computed(() => {
  const rowKey = (props.config.table as any)?.rowKey || 'id'
  // 尝试用路由 path 作为命名空间，避免不同页面同 rowKey 冲突
  let ns = ''
  try {
    ns = (window.location?.pathname || '') + ':'
  } catch {
    ns = ''
  }
  return `${ns}hdi-table-columns:${rowKey}`
})

// 自定义列配置（响应式）：true/对象启用，未配置则不启用
const customColumnsConfig = computed(() => (props.config.table as any)?.customColumns)
// 是否启用自定义列
const isCustomColumnsEnabled = computed(() => !!customColumnsConfig.value)

// 所有可显示在表格中的列
const allTableItems = computed(() =>
    props.config.items.filter((item) => item.isTable !== false) || []
)

// 在 setup 期间只调用一次 composable，避免重复创建状态
const customColumnsState = useTableCustomColumns(
    allTableItems,
    customColumnsConfig,
    customColumnsStorageKey.value,
)

// 注册变化事件回调（仅启用时触发 emit）
customColumnsState.onChange((visibleProps, order) => {
  if (isCustomColumnsEnabled.value) {
    emit('columnsChange', visibleProps, order)
  }
})

// 自定义列顺序与可见性应用后的最终列
const tableColumns = computed(() => {
  const baseItems = allTableItems.value
  // 未启用自定义列：保持原行为
  if (!isCustomColumnsEnabled.value) {
    return prepareTableColumns(buildTableTree(baseItems))
  }
  const visibleSet = new Set(customColumnsState.visibleProps.value)
  // 按 state.order.value 重排序：仅取可见项；order 中可能含已被移除的 prop，需过滤
  const orderedVisibleItems: typeof baseItems = []
  customColumnsState.order.value.forEach((prop) => {
    const found = baseItems.find((it) => it.prop === prop)
    if (found && visibleSet.has(prop)) {
      orderedVisibleItems.push(found)
    }
  })
  // 兜底：原始顺序中存在但 order 中漏掉的可见项追加到末尾
  baseItems.forEach((it) => {
    if (it.prop && visibleSet.has(it.prop) && !orderedVisibleItems.includes(it)) {
      orderedVisibleItems.push(it)
    }
  })
  return prepareTableColumns(buildTableTree(orderedVisibleItems))
})

// ===== 自定义搜索 =====
const customSearchStorageKey = computed(() => {
  let ns = ''
  try {
    ns = (window.location?.pathname || '') + ':'
  } catch {
    ns = ''
  }
  return `${ns}hdi-table-custom-search`
})

const customSearchConfig = computed(() => props.config.customSearch)
const isCustomSearchEnabled = computed(() => !!customSearchConfig.value)

const allSearchItemsRef = computed(() => props.config.items || [])
const customSearchState = useTableCustomSearch(
    allSearchItemsRef,
    customSearchConfig,
    customSearchStorageKey.value,
)

customSearchState.onChange((visibleProps, advancedExpanded) => {
  if (isCustomSearchEnabled.value) {
    emit('searchChange', visibleProps, advancedExpanded)
  }
})

// 实际渲染的搜索项：根据自定义搜索状态过滤
const searchItems = computed(() => {
  const raw = searchItemsRaw.value
  if (!isCustomSearchEnabled.value) return raw
  const visibleSet = new Set(customSearchState.visibleProps.value)
  return raw.filter((item) => {
    if (!item.prop) return true
    if (!visibleSet.has(item.prop)) return false
    // 高级搜索收起时，隐藏 isAdvanced 字段
    if (item.isAdvanced === true && !customSearchState.advancedExpanded.value) {
      return false
    }
    return true
  })
})

// 是否显示搜索区域
const showSearch = computed(() => {
  if (props.config.search === false) return false
  // 启用自定义搜索时，只要有可配置的搜索字段就显示搜索区（即使当前过滤后为空也保留区域）
  if (isCustomSearchEnabled.value && searchItemsRaw.value.length > 0) {
    // 若高级搜索未展开且全部字段均为高级，则隐藏（避免空白搜索区）
    if (searchItems.value.length === 0) return false
    return true
  }
  return !!searchItems.value?.length
})

// 是否显示工具栏, toolbar不设置为false且有工具栏按钮（或启用自定义列按钮）
const showToolbar = computed(
    () => props.config.toolbar !== false && !!(leftToolbarButtons.value?.length || rightToolbarButtons.value.length || isCustomColumnsEnabled.value)
)

// 搜索配置
const searchConfig = computed(() => ({
  items: searchItems.value,
  inline: true,
  labelWidth: 'auto',
  submitButtonText: '查询',
  cols: 4,
  ...props.config.search,
}))


// 暴露方法
defineExpose({
  closeTheLoading,
  openDialog,
  closeDialog: () => {
    dialogRef.value?.close()
  },
  searchSubmit,
  pageChange,
  refresh: loadData,
  // 直接暴露 el-table 的常用方法
  clearSelection: () => getElTable()?.clearSelection(),
  getSelectionRows: () => getElTable()?.getSelectionRows() || [],
  toggleRowSelection: (row: any, selected?: boolean) => getElTable()?.toggleRowSelection(row, selected),
  toggleAllSelection: () => getElTable()?.toggleAllSelection(),
  setCurrentRow: (row?: any) => getElTable()?.setCurrentRow(row),
  // 保留获取 el-table 的方法，兼容旧代码
  getElTable,
  // 自定义列（自定义表头展示）相关方法
  resetCustomColumns: () => customColumnsState.reset(),
  getCustomColumnsState: () => customColumnsState,
  // 自定义搜索相关方法
  resetCustomSearch: () => customSearchState.reset(),
  toggleAdvancedSearch: () => customSearchState.toggleAdvanced(),
  getCustomSearchState: () => customSearchState,
})
</script>

<style scoped lang="scss">
/**
 * 表格组件样式
 */
.page-table-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 头部样式 */
.page-table-header {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 头部横向布局 */
.page-table-header.is-row {
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
}

/* 表格区域样式 */
.table-area {
  flex: 1;
  overflow: auto;
  height: 0; /* 配合flex:1实现自适应高度 */
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
