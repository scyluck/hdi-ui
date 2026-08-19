# 开发指南

本文档面向 **hdi-ui 框架的开发维护者**，介绍如何扩展框架组件，包括新增图标、新增表单类型、新增表格单元格类型等。

## 目录结构

```
src/
├── components/
│   ├── Icon/              # 图标基础组件（IconBase、HdiIcon）
│   ├── Form/              # 表单组件
│   │   ├── components/    # 表单控件目录（按 type 自动注册）
│   │   ├── Form.vue       # 表单主组件
│   │   ├── custom-form-item.vue      # 表单项渲染（处理 show/linkage/slot 等）
│   │   ├── custom-form-component.vue # 根据 type 动态渲染控件
│   │   ├── components.ts  # 自动导入 components/ 目录下所有 .vue
│   │   └── types.ts       # 类型定义
│   ├── Table/             # 表格组件
│   │   ├── table-cell.vue # 单元格渲染（tableCellType）
│   │   ├── utils.ts       # 工具函数（formatTime 等）
│   │   └── const.ts       # 常量定义
│   └── ...
├── icons/
│   ├── svg/               # SVG 源文件目录
│   ├── components/        # 生成的图标 .vue 组件（勿手动修改）
│   ├── index.ts           # 图标统一导出（自动生成）
│   └── bundle.ts          # UMD 入口（自动生成）
└── scripts/
    └── generate-icons.ts  # 图标生成脚本
```

## 新增图标

### 步骤

1. **添加 SVG 文件**：将 `.svg` 文件放入 [src/icons/svg/](file:///e:/hdi-ui/src/icons/svg/) 目录

2. **命名规则**：
   - 格式：`[编号]-[英文功能名]-[中文说明].svg`
   - 中文部分会自动去除，仅保留英文作为组件名
   - 示例：
     - `80-add-添加.svg` → 组件名 `Icon80Add`
     - `90-edit-编辑.svg` → 组件名 `Icon90Edit`
     - `home.svg` → 组件名 `IconHome`

3. **生成组件**：
   ```bash
   npm run generate:icons
   ```
   脚本会自动生成：
   - `src/icons/components/IconXxx.vue` — 图标组件
   - `src/icons/index.ts` — 统一导出
   - `src/icons/bundle.ts` — UMD 入口
   - `src/resolvers/icons.generated.ts` — resolver 类型文件

4. **构建发布**：
   ```bash
   npm run build:release
   ```
   会依次执行：增量生成图标 → 增量类型检查 → 构建带 sourcemap 的 ESM/CJS → 构建 UMD → 同步 CDN。
   日常开发执行 `npm run build`，只生成不带 sourcemap 的 ESM/CJS 和类型声明。

### 删除图标

1. 从 [src/icons/svg/](file:///e:/hdi-ui/src/icons/svg/) 删除对应 `.svg` 文件
2. 执行 `npm run generate:icons`（脚本会清理已删除图标对应的生成文件）
3. 执行 `npm run build`

### SVG 文件要求

- 包含 `viewBox` 属性（如 `viewBox="0 0 24 24"`）
- 不需要手动处理颜色，脚本会自动移除 `fill`/`stroke` 并统一为 `currentColor`
- 内部路径使用相对坐标，避免硬编码尺寸

### SVG 处理流程

[generate-icons.ts](file:///e:/hdi-ui/scripts/generate-icons.ts) 中的 SVGO 插件会：

1. 移除 `fill`、`stroke`、`class`、`style`、`data-name`、`id` 属性
2. 添加 `fill="currentColor"` 实现颜色继承
3. 保留 `viewBox` 属性
4. 移除 XML 声明和注释

---

## 新增表单类型

Form 表单通过 `type` 字段渲染不同控件，类型系统基于**文件名自动注册**。

### 自动注册原理

[components.ts](file:///e:/hdi-ui/src/components/Form/components.ts#L11) 使用 `import.meta.glob` 自动导入 `components/` 目录下所有 `.vue` 文件：

```ts
const list = import.meta.glob('./components/*.vue', { import: 'default' })
// 文件名（去掉 .vue）即为 type 值
// input.vue → type: 'input'
// select.vue → type: 'select'
```

[custom-form-component.vue](file:///e:/hdi-ui/src/components/Form/custom-form-component.vue#L3) 根据 `item.type` 动态渲染：

```vue
<component :is="item.component || asyncComponents[item.type]" />
```

### 现有表单类型

| type | 文件 | 说明 |
|------|------|------|
| `input` | [input.vue](file:///e:/hdi-ui/src/components/Form/components/input.vue) | 输入框 |
| `select` | [select.vue](file:///e:/hdi-ui/src/components/Form/components/select.vue) | 下拉选择 |
| `select-group` | [select-group.vue](file:///e:/hdi-ui/src/components/Form/components/select-group.vue) | 分组下拉 |
| `radio` | [radio.vue](file:///e:/hdi-ui/src/components/Form/components/radio.vue) | 单选 |
| `radio-button` | [radio-button.vue](file:///e:/hdi-ui/src/components/Form/components/radio-button.vue) | 按钮单选 |
| `checkbox` | [checkbox.vue](file:///e:/hdi-ui/src/components/Form/components/checkbox.vue) | 多选 |
| `checkbox-button` | [checkbox-button.vue](file:///e:/hdi-ui/src/components/Form/components/checkbox-button.vue) | 按钮多选 |
| `switch` | [switch.vue](file:///e:/hdi-ui/src/components/Form/components/switch.vue) | 开关 |
| `date` | [date.vue](file:///e:/hdi-ui/src/components/Form/components/date.vue) | 日期选择 |
| `time` | [time.vue](file:///e:/hdi-ui/src/components/Form/components/time.vue) | 时间选择 |
| `cascader` | [cascader.vue](file:///e:/hdi-ui/src/components/Form/components/cascader.vue) | 级联选择 |
| `slider` | [slider.vue](file:///e:/hdi-ui/src/components/Form/components/slider.vue) | 滑块 |
| `color` | [color.vue](file:///e:/hdi-ui/src/components/Form/components/color.vue) | 颜色选择 |
| `upload` | [upload.vue](file:///e:/hdi-ui/src/components/Form/components/upload.vue) | 文件上传 |
| `text` | [text.vue](file:///e:/hdi-ui/src/components/Form/components/text.vue) | 纯文本展示 |
| `text-option` | [text-option.vue](file:///e:/hdi-ui/src/components/Form/components/text-option.vue) | 文本选项展示 |
| `text-date` | [text-date.vue](file:///e:/hdi-ui/src/components/Form/components/text-date.vue) | 文本日期展示 |
| `slot` | - | 自定义插槽（通过 `item.prop` 作为插槽名） |
| `header` | [form-header.vue](file:///e:/hdi-ui/src/components/Form/form-header.vue) | 标题分组 |
| `line` | - | 分割线 |
| `hidden` | - | 隐藏字段 |

### 新增表单类型示例（以 input-number 为例）

1. **创建组件文件**

在 [src/components/Form/components/](file:///e:/hdi-ui/src/components/Form/components/) 下新建 `input-number.vue`：

```vue
<template>
  <el-input-number
    v-model="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { ElInputNumber } from 'element-plus'

defineOptions({ name: 'form-input-number', inheritAttrs: false })

interface Props {
  modelValue: number | undefined
  placeholder?: string
  disabled?: boolean
  config?: any
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请输入',
  disabled: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | undefined): void
}>()

const modelValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
</script>
```

2. **无需修改 components.ts**

`import.meta.glob` 会自动识别新文件，`type: 'input-number'` 即可使用。

3. **在业务中使用**

```ts
{
  prop: 'count',
  label: '数量',
  type: 'input-number',  // 对应文件名 input-number.vue
}
```

### 表单组件 Props 约定

[custom-form-component.vue](file:///e:/hdi-ui/src/components/Form/custom-form-component.vue#L1-L18) 会向控件传入以下 props：

| Prop | 说明 | 来源 |
|------|------|------|
| `modelValue` / `v-model` | 绑定值 | `formData[item.prop]` |
| `data` | 完整表单数据 | `formData` |
| `placeholder` | 占位文本 | 自动生成或 item.placeholder |
| `disabled` | 是否禁用 | config.disabled 或 item.disabled |
| `config` | 字段配置 | item 本身 |
| `attrs` | 额外属性 | item.attrs + config.attrs[prop] |
| `slots` | 插槽配置 | item.slots + config.slots[prop] |

::: tip 组件必须实现 v-model
每个表单控件必须支持 `modelValue` + `update:modelValue`，即 `v-model` 双向绑定。
:::

---

## 新增表格单元格类型

Table 通过 `tableCellType` 控制单元格渲染方式。

### 现有类型

| tableCellType | 说明 | 渲染方式 |
|---------------|------|----------|
| `TAG` | 标签 | `<el-tag>` 包裹 |
| `SLOT` | 自定义插槽 | 通过 `tableCellFormatter` 指定插槽名 |
| `DATE` | 日期格式化 | 在 `getTableCellDisplay` 中处理 |
| `ENUM` | 枚举映射 | 在 `getTableCellDisplay` 中处理 |
| 不设置 | 默认 | `<span>` 纯文本 |

### 渲染逻辑位置

[table-cell.vue](file:///e:/hdi-ui/src/components/Table/table-cell.vue#L1-L17) 负责单元格渲染：

```vue
<el-tag v-if="column.tableCellType === 'TAG'" v-bind="getCellProps(column, row)">
  {{ getTableCellDisplay(column, row) }}
</el-tag>
<slot v-else-if="column.tableCellType === 'SLOT'" :name="column.tableCellFormatter" />
<span v-else v-bind="getCellProps(column, row)">
  {{ getTableCellDisplay(column, row) }}
</span>
```

`getTableCellDisplay`（[utils.ts](file:///e:/hdi-ui/src/components/Table/utils.ts)）负责值的格式化（DATE、ENUM 等）。

### 新增单元格类型示例（以 IMAGE 为例）

1. **修改 [table-cell.vue](file:///e:/hdi-ui/src/components/Table/table-cell.vue)**

新增一个 `v-else-if` 分支：

```vue
<el-image
  v-else-if="column.tableCellType === 'IMAGE'"
  :src="row[column.prop]"
  :style="{ width: '40px', height: '40px' }"
  fit="cover"
/>
```

2. **在业务中使用**

```ts
{
  prop: 'avatar',
  label: '头像',
  type: 'input',
  isTable: true,
  tableCellType: 'IMAGE',
}
```

---

## 新增工具栏按钮

Table 工具栏通过 `toolbar` 配置，`btnType` 决定按钮类型。

### 现有按钮类型

| btnType | 说明 |
|---------|------|
| `add` | 新增（自动打开新增弹窗） |
| `batchDelete` | 批量删除（需选中行） |
| `import` | 导入 |
| `export` | 导出 |
| `refresh` | 刷新 |
| `custom` | 自定义（配合 `btnName`） |

### 按钮配置位置

- 默认按钮名称和图标：[const.ts](file:///e:/hdi-ui/src/components/Table/const.ts) 的 `defaultButtonMap`
- 按钮渲染逻辑：[table-content.vue](file:///e:/hdi-ui/src/components/Table/table-content.vue) 的 `enrichButton` 函数
- 工具栏模板：[table-toolbar.vue](file:///e:/hdi-ui/src/components/Table/table-toolbar.vue)

### 新增按钮类型示例（以 download 为例）

1. **修改 [const.ts](file:///e:/hdi-ui/src/components/Table/const.ts)** 的 `defaultButtonMap`：

```ts
export const defaultButtonMap: Record<string, ButtonConfig> = {
  // ... 已有按钮
  download: { btnName: '下载', icon: Download },  // 如需图标
}
```

2. **在业务中使用**

```ts
toolbar: [
  { btnType: 'download', direction: 'left' },
]
```

3. **处理点击事件**

在业务中监听 `toolbarButtonClick` 事件：

```ts
const handleToolbarClick = (btn, callback) => {
  if (btn.btnType === 'download') {
    // 下载逻辑
    callback({ msg: '下载成功' })
  }
}
```

---

## 构建与发布

### 构建命令

```bash
# 日常构建（增量生成图标 + 增量类型检查 + ESM/CJS）
npm run build

# 完整发布构建（带 sourcemap 的 ESM/CJS + UMD + CDN 同步）
npm run build:release

# 单独执行某一步
npm run generate:icons    # 仅生成图标组件
npm run build:umd         # 仅构建 UMD
npm run sync:cdn          # 仅同步 CDN 产物
```

### 发布到 npm

```bash
npm version patch|minor|major
npm publish
```

`prepublishOnly` 脚本会自动执行 `npm run build:release`。

### CDN 更新

构建后 `cdn/` 目录会更新，提交推送到 GitHub 后需清除 jsDelivr 缓存：

```
https://purge.jsdelivr.net/gh/scyluck/hdi-ui@master/cdn/hdi-ui.umd.js
https://purge.jsdelivr.net/gh/scyluck/hdi-ui@master/cdn/hdi-icons.umd.js
```

---

## 代码规范

### 文件命名

- 组件文件：PascalCase（如 `IconBase.vue`、`HdiTable.vue`）
- 表单控件：kebab-case（如 `input-number.vue`，文件名即 type 值）
- 工具函数：camelCase（如 `formatTime`、`getTableCellDisplay`）

### 导入规范

- 框架内部使用**相对路径**，不用 `@/` 别名
- Element Plus 组件需显式 import（如 `import { ElTable } from 'element-plus'`）

### 样式规范

- 组件样式通过 `vite-plugin-lib-inject-css` 自动注入，业务项目无需手动引入
- 业务项目只需引入 Element Plus 样式：`import 'element-plus/dist/index.css'`
