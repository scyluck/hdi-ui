<template>
  <div
    class="card-item-wrapper"
    :class="{ 'is-selected': selected }"
    @click="handleCardClick"
  >
    <!-- 选择框 -->
    <div v-if="selectable" class="card-item-checkbox" @click.stop>
      <el-checkbox :model-value="selected" @change="handleSelectChange" />
    </div>

    <el-card
      :shadow="cardConfig.shadow || 'hover'"
      :body-style="cardConfig.bodyStyle"
    >
      <!-- 完全自定义卡片内容 -->
      <slot v-if="$slots.card" name="card" :row="row" :index="index" />

      <template v-else>
        <!-- 封面图 -->
        <div
          v-if="cardConfig.coverField || $slots['card-cover']"
          class="card-cover"
          :style="{ height: coverHeight }"
        >
          <slot v-if="$slots['card-cover']" name="card-cover" :row="row" :index="index" />
          <el-image
            v-else
            :src="row[cardConfig.coverField!]"
            :fit="cardConfig.coverFit || 'cover'"
            lazy
          >
            <template #placeholder>
              <div class="card-cover-placeholder">{{ cardConfig.coverPlaceholder || '加载中...' }}</div>
            </template>
            <template #error>
              <div class="card-cover-placeholder">{{ cardConfig.coverPlaceholder || '暂无图片' }}</div>
            </template>
          </el-image>
        </div>

        <!-- 标题 -->
        <div
          v-if="cardConfig.titleField || $slots['card-title']"
          class="card-title"
        >
          <slot v-if="$slots['card-title']" name="card-title" :row="row" :index="index" />
          <span v-else class="card-title-text">{{ row[cardConfig.titleField!] }}</span>
        </div>

        <!-- 描述 -->
        <div
          v-if="cardConfig.descField || $slots['card-desc']"
          class="card-desc"
        >
          <slot v-if="$slots['card-desc']" name="card-desc" :row="row" :index="index" />
          <span v-else class="card-desc-text">{{ row[cardConfig.descField!] }}</span>
        </div>

        <!-- 字段列表 -->
        <div
          v-if="displayFields.length || $slots['card-fields']"
          class="card-fields"
        >
          <slot v-if="$slots['card-fields']" name="card-fields" :row="row" :index="index" />
          <template v-else>
            <div
              v-for="field in displayFields"
              :key="field.prop"
              class="card-field"
            >
              <span class="card-field-label">{{ field.label }}</span>
              <span class="card-field-value">
                <!-- 插槽渲染 -->
                <slot
                  v-if="field.tableCellType === 'SLOT'"
                  :name="field.tableCellFormatter"
                  :row="row"
                  :column="field"
                />
                <el-tag
                  v-else-if="field.tableCellType === 'TAG'"
                  v-bind="getCellProps(field, row)"
                >
                  {{ getTableCellDisplay(field, row) }}
                </el-tag>
                <span v-else v-bind="getCellProps(field, row)">
                  {{ getTableCellDisplay(field, row) }}
                </span>
              </span>
            </div>
          </template>
        </div>

        <!-- 操作按钮 -->
        <div
          v-if="operateButtons.length || $slots['card-operate']"
          class="card-operate"
          :class="[`card-operate--${cardConfig.operatePosition || 'bottom'}`]"
        >
          <slot v-if="$slots['card-operate']" name="card-operate" :row="row" :index="index" />
          <div v-else class="card-operate-buttons">
            <OperateButton
              v-for="btn in operateButtons"
              :key="btn.btnType"
              :btn="btn"
              :row="row"
              @click="handleOperateClick"
            />
          </div>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ElCard, ElImage, ElTag, ElCheckbox } from 'element-plus'
import type { TableColumn, ToolbarButton } from '../Table/types'
import type { CardItemConfig } from './types'
import { getTableCellDisplay } from '../Table/utils'
import { shouldShowButton, enrichButton } from '../Table/utils'
import { filterType } from '../Table/const'
import OperateButton from '../Table/operation.vue'

const props = defineProps<{
  row: Record<string, any>
  index: number
  /** 来自 TableSetConfig.items 的完整列配置 */
  items: TableColumn[]
  /** 单卡片渲染配置 */
  cardConfig: CardItemConfig
  /** 是否可选 */
  selectable?: boolean
  /** 当前是否选中 */
  selected?: boolean
}>()

const emit = defineEmits<{
  (e: 'select', row: any, selected: boolean): void
  (e: 'cardClick', row: any, index: number): void
  (e: 'operateClick', btn: ToolbarButton, row: any): void
}>()

// 封面图高度
const coverHeight = computed(() => {
  const h = props.cardConfig.coverHeight
  return typeof h === 'number' ? `${h}px` : h || '180px'
})

// 需要在卡片内容区展示的字段
const displayFields = computed(() => {
  const { showFields } = props.cardConfig
  const excludeProps = new Set<string>([
    props.cardConfig.coverField,
    props.cardConfig.titleField,
    props.cardConfig.descField,
  ].filter(Boolean) as string[])

  if (showFields) {
    // 用户明确指定了展示字段
    return showFields
      .map(prop => props.items.find(it => it.prop === prop))
      .filter(Boolean)
      .filter(item => !filterType.includes(item!.type))
      .filter(item => excludeProps.has(item!.prop!) === false) as TableColumn[]
  }

  // 默认展示所有非特殊类型字段
  return props.items.filter(item =>
    !filterType.includes(item.type) &&
    item.isTable !== false &&
    !excludeProps.has(item.prop || '')
  )
})

// 操作按钮
const operateButtons = computed(() => {
  const operateCol = props.items.find(it => it.type === 'operate')
  if (!operateCol) return []
  const options = (operateCol.options || []) as ToolbarButton[][]
  return options.flat()
    .filter(btn => shouldShowButton(btn))
    .map(enrichButton)
})

const getCellProps = (column: TableColumn, row: Record<string, any>) => {
  const value = column.prop ? row[column.prop] : undefined
  const style = column.bindCell || {}
  return Object.keys(style).reduce((props, key) => {
    const val = style[key]
    if (typeof val === 'function') {
      props[key] = val(value, row)
    } else if (val && typeof val === 'object') {
      props[key] = val[value]
    } else {
      props[key] = val
    }
    return props
  }, {} as Record<string, any>)
}

const handleSelectChange = (val: any) => {
  emit('select', props.row, val)
}

const handleCardClick = () => {
  emit('cardClick', props.row, props.index)
}

const handleOperateClick = (btn: ToolbarButton, row: any) => {
  emit('operateClick', btn, row)
}
</script>

<style scoped lang="scss">
.card-item-wrapper {
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &.is-selected {
    :deep(.el-card) {
      border-color: var(--el-color-primary);
      box-shadow: 0 0 0 1px var(--el-color-primary);
    }
  }
}

.card-item-checkbox {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  padding: 2px 4px;
}

.card-cover {
  width: 100%;
  overflow: hidden;
  border-radius: 4px 4px 0 0;

  .el-image {
    width: 100%;
    height: 100%;
  }
}

.card-cover-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 14px;
}

.card-title {
  padding: 8px 0 4px;
  font-size: 16px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-desc {
  padding: 2px 0 8px;
  font-size: 13px;
  color: var(--el-text-color-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.card-fields {
  padding: 4px 0;

  .card-field {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 3px 0;
    font-size: 13px;
    line-height: 1.6;
  }

  .card-field-label {
    color: var(--el-text-color-secondary);
    flex-shrink: 0;
    min-width: 60px;

    &::after {
      content: '：';
    }
  }

  .card-field-value {
    color: var(--el-text-color-primary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.card-operate {
  &--bottom {
    padding-top: 8px;
    border-top: 1px solid var(--el-border-color-lighter);
  }

  &--top {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 1;
  }

  .card-operate-buttons {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
  }
}
</style>
