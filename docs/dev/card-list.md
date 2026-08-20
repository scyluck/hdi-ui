# CardList 卡片列表开发

本文档面向 **hdi-ui 框架的开发维护者**，介绍 CardList 的内部结构、与 Table 的复用关系、插槽体系，以及如何扩展卡片渲染。

::: tip 配套使用文档
业务侧使用方式见 [CardList 卡片列表](/components/card-list)。
:::

## 目录结构

```
src/components/CardList/
├── index.vue          # 主组件（集成搜索/工具栏/卡片区域/分页/弹窗）
├── card-area.vue      # 卡片网格区域（布局、选择管理、空状态）
├── card-item.vue      # 单卡片渲染（封面/标题/描述/字段/操作按钮）
├── types.ts           # 类型定义
└── index.ts           # 对外导出
```

## 与 Table 的复用关系

CardList 复用 Table 的大量基础设施，仅替换了数据展示区域：

| 功能 | CardList 来源 | Table 来源 |
|------|--------------|-----------|
| 搜索栏 | `../Table/search.vue` | `./search.vue` |
| 工具栏 | `../Table/toolbar.vue` | `./toolbar.vue` |
| 分页 | `../Table/pagination.vue` | `./pagination.vue` |
| 弹窗 | `../Table/dialog.vue` | `./dialog.vue` |
| 操作按钮 | `../Table/operation.vue` | `./operation.vue` |
| 单元格渲染逻辑 | `../Table/utils.ts` 的 `getTableCellDisplay` | `./utils.ts` |
| 字典加载 | `../Table/useTableDictionaries` | `./useTableDictionaries` |
| 按钮显示/富化 | `../Table/utils.ts` 的 `shouldShowButton`/`enrichButton` | `./utils.ts` |
| 常量 | `../Table/const.ts` 的 `filterType`/`defaultButtonMap` | `./const.ts` |
| **卡片区域** | `./card-area.vue`（独有） | `./table.vue` |
| **单卡片渲染** | `./card-item.vue`（独有） | `./table-content.vue` |

### 主组件 index.vue

[index.vue](file:///e:/hdi-ui/src/components/CardList/index.vue) 的核心逻辑与 Table 的 `index.vue` 几乎一致：
- 数据加载（`loadData` → `getTableData` 事件）
- 搜索提交/重置
- 分页变更
- 工具栏按钮点击（add/batchDelete/import/export/refresh/custom）
- 操作按钮点击（view/edit/delete/custom）
- 弹窗管理（open/close/submit）

区别：
- 使用 `config.cardList` 替代 `config.table`
- 使用 `CardArea` 替代 `TableArea`
- 选择管理委托给 `CardArea`（`clearSelection`/`getSelectionRows`/`toggleRowSelection`/`toggleAllSelection`）
- 额外支持 `selectionChange` 和 `cardClick` 事件
- 不支持 `customColumns` 和 `customSearch`

## 卡片渲染体系

### 渲染层次

[card-area.vue](file:///e:/hdi-ui/src/components/CardList/card-area.vue) 负责网格布局和选择管理，将每行数据传递给 [card-item.vue](file:///e:/hdi-ui/src/components/CardList/card-item.vue) 渲染单卡片。

```
CardArea
├── el-empty（空状态）
└── card-grid（CSS Grid）
    └── CardItem × N
        ├── el-checkbox（选择框，selectable 时）
        ├── el-card
        │   ├── 封面图（coverField 或 card-cover 插槽）
        │   ├── 标题（titleField 或 card-title 插槽）
        │   ├── 描述（descField 或 card-desc 插槽）
        │   ├── 字段列表（showFields 或 card-fields 插槽）
        │   │   └── 字段级插槽（tableCellType: 'SLOT'）
        │   └── 操作按钮（operate 或 card-operate 插槽）
        └── card 插槽（完全替换以上全部）
```

### 字段渲染

`displayFields` 计算属性（[card-item.vue](file:///e:/hdi-ui/src/components/CardList/card-item.vue)）决定卡片内容区展示哪些字段：

1. 如果配置了 `cardConfig.showFields`，仅展示指定 prop 的字段
2. 否则展示所有 `isTable !== false` 且非 `selection/index/expand/operate` 类型的字段
3. 排除已用作封面图、标题、描述的字段，避免重复展示

字段值的渲染复用 Table 的 `getTableCellDisplay`（[Table/utils.ts](file:///e:/hdi-ui/src/components/Table/utils.ts)），支持 `TEXT`/`ENUM`/`ENUMS`/`BOOLEAN`/`DATE`/`TAG`/`SLOT` 等所有 `tableCellType`。

### 选择管理

CardList 不依赖 `el-table` 的选择功能，选择状态由 [card-area.vue](file:///e:/hdi-ui/src/components/CardList/card-area.vue) 自行管理：

- `selectedSet`：`Set<string>` 存储已选中的 row key
- `selectedRows`：`any[]` 存储已选中的行数据
- 数据变化时自动清空选择（`watch(() => props.data)`）
- 暴露方法：`clearSelection`/`getSelectionRows`/`toggleRowSelection`/`toggleAllSelection`

### 响应式网格

[card-area.vue](file:///e:/hdi-ui/src/components/CardList/card-area.vue) 使用 CSS Grid + 媒体查询实现响应式布局：

- 基础列数通过 `grid-cols-{n}` class 设置 CSS 变量 `--cols`
- 响应式列数通过 `card-cols-{breakpoint}-{n}` class 在对应媒体查询中覆盖 `--cols`
- `grid-template-columns: repeat(var(--cols), 1fr)` 实现自适应

## 扩展卡片渲染

### 新增卡片区域

如需在卡片中新增一个展示区域（如「标签云」），修改 [card-item.vue](file:///e:/hdi-ui/src/components/CardList/card-item.vue)：

1. 在模板中新增区域，支持插槽覆盖：

```vue
<div v-if="cardConfig.tagField || $slots['card-tags']" class="card-tags">
  <slot v-if="$slots['card-tags']" name="card-tags" :row="row" :index="index" />
  <template v-else>
    <el-tag v-for="tag in row[cardConfig.tagField]" :key="tag">{{ tag }}</el-tag>
  </template>
</div>
```

2. 在 [types.ts](file:///e:/hdi-ui/src/components/CardList/types.ts) 的 `CardItemConfig` 中新增配置项：

```ts
export interface CardItemConfig {
  // ... 已有配置
  tagField?: string
}
```

### 修改字段渲染

卡片字段的渲染逻辑（`tableCellType` 分支）位于 [card-item.vue](file:///e:/hdi-ui/src/components/CardList/card-item.vue) 的模板中。新增 `tableCellType` 需同步修改 [card-item.vue](file:///e:/hdi-ui/src/components/CardList/card-item.vue) 和 [Table 的 table-cell.vue](file:///e:/hdi-ui/src/components/Table/table-cell.vue)。

## 新增业务组件时的注意事项

CardList 已注册到以下入口，新增组件时无需单独处理 CardList：

- [src/install-components.ts](file:///e:/hdi-ui/src/install-components.ts)：`businessComponents` 记录
- [src/resolvers/components.ts](file:///e:/hdi-ui/src/resolvers/components.ts)：`HDI_UI_COMPONENTS` 映射表
- [src/index.ts](file:///e:/hdi-ui/src/index.ts)：命名导出 + `export *`

## types.ts 改动需重新构建

[types.ts](file:///e:/hdi-ui/src/components/CardList/types.ts) 中的类型定义通过构建产物被业务项目引用，**修改后必须执行 `npm run build`** 才能让业务项目获取到新的类型。
