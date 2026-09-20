import { defineComponent, h, type PropType, type Slots, type VNode } from 'vue'
import { ElTableColumn, ElTag } from 'element-plus'
import OperateButton from './operation.vue'
import { defaultSlotType } from './const'
import { enrichButton, getTableCellDisplay, shouldShowButton } from './utils'
import type { PageInfo, TableColumn, ToolbarButton } from './types'
import type { DictionaryStore } from '../Dictionary/types'
import { useOptionalDictionaryStore } from '../Dictionary/useDictionary'

type DynamicCellProp = [string, unknown]

export interface PreparedTableColumn extends TableColumn {
  _hdiColumnKey: string
  _hdiColumnProps: Record<string, unknown>
  _hdiStaticCellProps: Record<string, unknown>
  _hdiDynamicCellProps: DynamicCellProp[]
  _hdiOperateButtons?: ToolbarButton[]
  children?: PreparedTableColumn[]
}

/**
 * Columns are static for most table renders. Normalize their stable props once
 * so cell rendering only evaluates bindings that actually depend on row data.
 */
export function prepareTableColumns(columns: TableColumn[], path = ''): PreparedTableColumn[] {
  return columns.map((column, index) => {
    const columnPath = path ? `${path}.${index}` : String(index)
    const staticCellProps: Record<string, unknown> = {}
    const dynamicCellProps: DynamicCellProp[] = []

    for (const [key, value] of Object.entries(column.bindCell || {})) {
      if (typeof value === 'function' || (value !== null && typeof value === 'object')) {
        dynamicCellProps.push([key, value])
      } else {
        staticCellProps[key] = value
      }
    }

    const { children, ...columnWithoutChildren } = column
    const bindColumn = column.bindColumn || {}
    const prepared: PreparedTableColumn = {
      ...columnWithoutChildren,
      _hdiColumnKey: column.prop || `${column.type || 'column'}-${columnPath}`,
      _hdiColumnProps: {
        ...bindColumn,
        align: bindColumn.align || 'center',
      },
      _hdiStaticCellProps: staticCellProps,
      _hdiDynamicCellProps: dynamicCellProps,
    }

    if (column.type === 'operate') {
      prepared._hdiOperateButtons = ((column.options || []) as ToolbarButton[][])
        .flat()
        .map(enrichButton)
    }

    if (children?.length) {
      prepared.children = prepareTableColumns(children, columnPath)
    } else {
      delete prepared.children
    }

    return prepared
  })
}

export function resolvePreparedCellProps(column: PreparedTableColumn, row: Record<string, unknown>): Record<string, unknown> {
  if (!column._hdiDynamicCellProps.length) return column._hdiStaticCellProps

  const value = column.prop ? row[column.prop] : undefined
  const props = { ...column._hdiStaticCellProps }
  for (const [key, binding] of column._hdiDynamicCellProps) {
    if (typeof binding === 'function') {
      props[key] = binding(value, row)
    } else if (binding && typeof binding === 'object') {
      props[key] = (binding as Record<PropertyKey, unknown>)[String(value)]
    }
  }
  return props
}

function getIndexMethod(column: PreparedTableColumn, pageInfo?: PageInfo) {
  return (index: number, row: Record<string, unknown>) => {
    const { indexMethod } = column
    const { pageNum = 1, pageSize = 10 } = pageInfo || {}

    if (typeof indexMethod === 'function') {
      return indexMethod(index, row, pageInfo || { pageNum: 1, pageSize: 10, total: 0 })
    }
    if (typeof indexMethod === 'string') return indexMethod
    return (pageNum - 1) * pageSize + index + 1
  }
}

function renderCell(
  column: PreparedTableColumn,
  scope: { row: Record<string, unknown> },
  slots: Slots,
  emitOperateClick: (btn: ToolbarButton, row: Record<string, unknown>) => void,
  dictionaryStore?: DictionaryStore,
): VNode | VNode[] | undefined {
  const row = scope.row

  if (column.type === 'operate') {
    const buttons = (column._hdiOperateButtons || []).filter((button) =>
      shouldShowButton(button, { row }),
    )
    return h('div', { class: 'operate-buttons' }, buttons.map((button, index) =>
      h(
        OperateButton,
        {
          key: `${button.btnType}-${index}`,
          btn: button,
          row,
          onClick: (clickedButton: ToolbarButton, clickedRow: Record<string, unknown>) =>
            emitOperateClick(clickedButton, clickedRow),
        },
        slots,
      ),
    ))
  }

  const cellProps = resolvePreparedCellProps(column, row)
  if (column.tableCellType === 'SLOT') {
    return slots[column.tableCellFormatter || '']?.({ row, column, ...cellProps })
  }
  if (column.tableCellType === 'TAG') {
    return h(ElTag, cellProps, () => getTableCellDisplay(column, row, dictionaryStore))
  }
  return h('span', cellProps, getTableCellDisplay(column, row, dictionaryStore))
}

function renderColumn(
  column: PreparedTableColumn,
  pageInfo: PageInfo | undefined,
  slots: Slots,
  emitOperateClick: (btn: ToolbarButton, row: Record<string, unknown>) => void,
  dictionaryStore?: DictionaryStore,
): VNode {
  const isGroup = !!column.children?.length
  const columnProps: Record<string, unknown> = {
    key: column._hdiColumnKey,
    label: column.label,
    ...column._hdiColumnProps,
  }

  if (!isGroup) {
    columnProps.prop = column.prop
    columnProps.type = column.type
    if (column.type === 'index') columnProps.index = getIndexMethod(column, pageInfo)
  }

  if (isGroup) {
    return h(ElTableColumn, columnProps, {
      default: () => column.children!.map((child) => renderColumn(child, pageInfo, slots, emitOperateClick, dictionaryStore)),
    })
  }

  const columnSlots: Record<string, (scope: { row: Record<string, unknown> }) => VNode | VNode[] | undefined> = {}
  for (const [slotName, sourceSlotName] of Object.entries(column.tableColumnSlots || {})) {
    columnSlots[slotName] = (scope) => slots[String(sourceSlotName)]?.(scope)
  }
  if (!Object.prototype.hasOwnProperty.call(columnSlots, 'default') && !defaultSlotType.includes(column.type)) {
    columnSlots.default = (scope) => renderCell(column, scope, slots, emitOperateClick, dictionaryStore)
  }

  return h(ElTableColumn, columnProps, columnSlots)
}

export default defineComponent({
  name: 'HdiTableColumns',
  props: {
    columns: {
      type: Array as PropType<PreparedTableColumn[]>,
      default: () => [],
    },
    pageInfo: {
      type: Object as PropType<PageInfo>,
      default: undefined,
    },
    cellSlots: {
      type: Object as PropType<Slots>,
      default: () => ({}),
    },
  },
  emits: ['operateClick'],
  setup(props, { emit }) {
    const dictionaryStore = useOptionalDictionaryStore()
    const emitOperateClick = (btn: ToolbarButton, row: Record<string, unknown>) => {
      emit('operateClick', btn, row)
    }

    return () => props.columns.map((column) =>
      renderColumn(column, props.pageInfo, props.cellSlots, emitOperateClick, dictionaryStore),
    )
  },
})
