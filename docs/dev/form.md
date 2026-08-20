# Form 表单开发

本文档面向 **hdi-ui 框架的开发维护者**，介绍如何新增表单类型、表单控件的 Props 约定，以及自动注册机制。

::: tip 配套使用文档
业务侧使用方式见 [Form 表单](/components/form)。
:::

## 目录结构

```
src/components/Form/
├── components/              # 表单控件目录（按 type 自动注册）
│   ├── input.vue
│   ├── select.vue
│   └── ...
├── Form.vue                 # 表单主组件
├── custom-form-item.vue     # 表单项渲染（处理 show / linkage / slot 等）
├── custom-form-component.vue # 根据 type 动态渲染控件
├── components.ts            # 自动导入 components/ 目录下所有 .vue
└── types.ts                 # 类型定义
```

## 自动注册原理

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

## 现有表单类型

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

## 新增表单类型示例（以 input-number 为例）

### 1. 创建组件文件

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
import { computed } from 'vue'

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

### 2. 无需修改 components.ts

`import.meta.glob` 会自动识别新文件，`type: 'input-number'` 即可使用。

### 3. 在业务中使用

```ts
{
  prop: 'count',
  label: '数量',
  type: 'input-number',  // 对应文件名 input-number.vue
}
```

## 表单组件 Props 约定

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

## 选项类控件复用 useFormOptions

`select` / `checkbox` / `radio` 等选项类控件统一通过 [useFormOptions](file:///e:/hdi-ui/src/components/Form/composables/use-form-options.ts) composable 处理：

- 既支持直接传 `options` 数组
- 也支持传 `dictCode`，由 composable 调用 `useDictionary` 自动拉取字典

新增选项类控件时，应复用此 composable 而非自行实现字典加载逻辑。

## 字段值 / 标签键名配置

选项类控件通过 `config.selectValue` / `config.selectLabel` 指定选项的值/标签字段名（见 [utils.ts](file:///e:/hdi-ui/src/components/Form/utils.ts) 中的 `getFormValueKey` / `getFormLabelKey`）。新增选项类控件时，务必通过这两个工具函数读取键名，避免硬编码 `value` / `label`。

## 扩展点

### 自定义校验

业务侧通过 `formConfig.rules` 配置 Element Plus 原生 rules，无需在框架内扩展。若需要框架内置某种联动校验，应在 `custom-form-item.vue` 的 `linkage` 流程中实现。

### 自定义插槽控件

`type: 'slot'` 的字段会以 `item.prop` 为插槽名暴露给业务模板。新增带插槽的内置类型时，参考 `select.vue` 中的 `<slot>` 渲染约定。
