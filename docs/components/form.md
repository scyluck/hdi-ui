# Form 表单

业务级表单组件，基于 Element Plus `el-form` 封装，支持多种字段类型、字典数据、表单校验、字段联动、分组标题等。

## 基础用法

```vue

<template>
  <HdiForm
      ref="formRef"
      v-model="formData"
      :config="formConfig"
      @submit="handleSubmit"
      @reset="handleReset"
  />
</template>

<script setup lang="ts">
  import {ref} from 'vue'
  import {HdiForm} from 'hdi-ui'
  import type {FormConfig} from 'hdi-ui'

  const formRef = ref()
  const formData = ref({
    name: '',
    age: undefined,
    gender: 1,
  })

  const formConfig: FormConfig = {
    cols: 2,
    labelWidth: '80px',
    showSubmit: true,
    showReset: true,
    items: [
      {prop: 'name', label: '姓名', type: 'input', rules: [{required: true, message: '请输入姓名'}]},
      {prop: 'age', label: '年龄', type: 'input', attrs: {type: 'number'}},
      {
        prop: 'gender', label: '性别', type: 'select',
        options: [
          {label: '男', value: 1},
          {label: '女', value: 2},
        ],
      },
    ],
  }

  const handleSubmit = (data) => {
    console.log('提交:', data)
  }
  const handleReset = (data) => {
    console.log('重置:', data)
  }
</script>
```

## 组件 Props

`<HdiForm>` 组件本身的 props：

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `modelValue` | 表单数据（`v-model`） | `Record<string, any>` | `{}` |
| `config` | 表单整体配置，见下方 [FormConfig](#formconfig-配置) | `FormConfig` | `{}` |

## 组件插槽

HdiForm 的插槽分为三类：

### 布局插槽

| 插槽名 | 作用域参数 | 说明 |
|--------|-----------|------|
| `header` | - | 表单项容器**上方**的内容（在 `el-form` 内、`items` 之前） |
| `bottom` | - | 表单项容器**下方**、按钮组之前的内容 |

### 按钮组插槽

按钮组仅在 `showSubmit` / `showReset` 任一为 `true`，或使用了下列插槽时才渲染。

| 插槽名 | 作用域参数 | 说明 |
|--------|-----------|------|
| `btn-prefix` | `{ submit, reset }` | 按钮组最前面插入按钮 |
| `btn-suffix` | `{ submit, reset }` | 按钮组最后面插入按钮 |

`submit` / `reset` 为函数，可在自定义按钮中触发提交或重置：

```vue
<template #btn-prefix="{ submit }">
  <el-button type="success" @click="handleSaveAndContinue(submit)">保存并继续</el-button>
</template>
```

### 字段控件插槽

每个字段控件内部的插槽通过两种方式接入：

1. **`type: 'slot'`**：整项由外部插槽渲染，插槽名为 `item.prop`，作用域提供 `{ data }`（即 formData）
2. **控件内部插槽**：在 `item.slots` 或 `config.slots[prop]` 中配置 `{ 插槽名: 外部插槽名 }`，把 Element Plus 控件的原生插槽透传出来（如 select 的 `option`、cascader 的 `default` 等）

::: tip 事件增强
对带 `options` 的控件（select / radio / checkbox 等）和 `cascader`，其 `change` 事件会被增强：
- `cascader` 的 `change` 回调会额外注入 `checkedNodes`（选中节点数组）
- 其他带 `options` 控件的 `change` 回调会额外注入 `option`（选中选项对象）
- 所有事件回调最后都会额外注入当前 `item` 配置
:::

## Props

### FormConfig 配置

| 属性                   | 说明                    | 类型                                                                                                                                       | 默认值        |
|----------------------|-----------------------|------------------------------------------------------------------------------------------------------------------------------------------|------------|
| `items`              | 表单项配置数组               | `FormItem[]`                                                                                                                             | `[]`       |
| `cols`               | 每行显示的表单项数量            | `number`                                                                                                                                 | `2`        |
| `xGap`               | 表单项间距（px）             | `number`                                                                                                                                 | `12`       |
| `inline`             | 是否行内表单                | `boolean`                                                                                                                                | `false`    |
| `isTable`            | 是否以表格样式展示             | `boolean`                                                                                                                                | `false`    |
| `disabled`           | 是否禁用整个表单              | `boolean`                                                                                                                                | `false`    |
| `labelWidth`         | 标签宽度                  | `string \| number`                                                                                                                       | `'auto'`   |
| `labelPosition`      | 标签位置                  | `'left' \| 'right' \| 'top'`                                                                                                             | `'right'`  |
| `labelSuffix`        | 标签后缀                  | `string`                                                                                                                                 | `''`       |
| `showSubmit`         | 是否显示提交按钮              | `boolean`                                                                                                                                | `true`     |
| `showReset`          | 是否显示重置按钮              | `boolean`                                                                                                                                | `true`     |
| `isReverseButton`    | 是否调换按钮位置              | `boolean`                                                                                                                                | `false`    |
| `submitButtonText`   | 提交按钮文字                | `string`                                                                                                                                 | `'保存'`     |
| `resetButtonText`    | 重置按钮文字                | `string`                                                                                                                                 | `'重置'`     |
| `btnsJustifyContent` | 按钮对齐方式                | `'flex-start' \| 'flex-end' \| 'center' \| 'space-between' \| 'space-around' \| 'space-evenly' \| 'start' \| 'end' \| 'left' \| 'right'` | `'center'` |
| `rules`              | 表单验证规则（按 prop 分组）     | `Record<string, any[]>`                                                                                                                  | `{}`       |
| `validate`           | 验证回调函数                | `ValidateFunction`                                                                                                                       | -          |
| `customClass`        | 自定义类名                 | `string`                                                                                                                                 | `''`       |
| `attrs`              | 按字段配置 Element Plus 属性 | `Record<string, Record<string, any>>`                                                                                                    | -          |
| `events`             | 按字段配置事件               | `Record<string, Record<string, Function>>`                                                                                               | -          |
| `slots`              | 按字段配置插槽               | `Record<string, Record<string, string>>`                                                                                                 | -          |

### FormItem 表单项配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `prop` | 字段名（对应 `el-form-item` 的 `prop`，也是 `formData` 的 key） | `string` | - |
| `type` | 字段类型，见下方 [字段类型](#字段类型) | `string` | - |
| `label` | 字段标签（header 类型时为分组标题） | `string` | - |
| `desc` | 标签 tooltip 提示（标题后显示 "i" 图标，hover 展示） | `string` | - |
| `placeholder` | 占位符；未配置时按类型自动生成「请输入/请选择 + label」 | `string` | 自动生成 |
| `disabled` | 是否禁用该项 | `boolean` | `false` |
| `width` | 表单项宽度（带单位，如 `'200px'`/`'100%'`），优先级高于 cols 计算 | `string` | - |
| `labelWidth` | 单项标签宽度，覆盖 `config.labelWidth` | `string` | - |
| `rules` | 单项校验规则（与 `config.rules[prop]` 合并后生效） | `any[]` | - |
| `options` | 选项数据，支持数组 / 字典 code 字符串 / 分组对象（select-group）/ **函数动态选项**，见 [字典选项](#字典选项) 与 [动态选项（联动加载）](#动态选项联动加载) | `any[] \| string \| Record<string, any> \| ((formData) => any[] \| Promise<any[]>)` | - |
| `dependsOn` | 动态选项依赖的字段名数组；`options` 为函数时声明，任一依赖变化重新加载，见 [动态选项](#动态选项联动加载) | `string[]` | - |
| `cascadeClear` | 该字段变化后自动清空的下级字段名数组（典型：选省清空市/区），见 [动态选项](#动态选项联动加载) | `string[]` | - |
| `component` | 自定义组件，传入时优先于 `type` 对应的内置组件 | `Component` | - |
| `attrs` | 透传到 Element Plus 控件的属性（如 `type`/`rows`/`maxlength`），见 [传递 Element Plus 属性](#传递-element-plus-属性) | `Record<string, any>` | `{ clearable: true, filterable: true }` |
| `events` | 透传到 Element Plus 控件的事件（键名去掉 `on` 前缀，如 `change`/`focus`） | `Record<string, Function>` | - |
| `slots` | 控件内部插槽映射，`{ 控件插槽名: 外部插槽名 }` | `Record<string, string>` | - |
| `customClass` | 表单项自定义类名 | `string` | - |
| `headerClassName` | header 类型标题的自定义类名（覆盖默认 title1/title2） | `string` | - |
| `unit` | 单位（如 "kg"/"元"），input 显示在 suffix，text/text 显示在值后 | `string` | - |
| `children` | 子表单项（分组），存在 `children` 时该项作为分组容器 | `FormItem[]` | - |
| `selectValue` | 选项值字段名（选项类控件通用），见 [选项类字段](#选项类字段通用配置) | `string` | `'value'` |
| `selectLabel` | 选项标签字段名 | `string` | `'label'` |
| `isLabelHasValue` | 选项标签是否显示为「值.标签」形式（如 `1.启用`） | `boolean` | `false` |
| `filterValues` | checkbox 中需要过滤展示的选项值数组（仅展示这些值对应的项） | `any[]` | - |
| `mode` | checkbox 显示模式 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| `show` | 是否显示，支持函数动态控制，见 [联动配置](#联动配置) | `boolean \| ((formData) => boolean)` | `true` |
| `linkage` | 声明式联动条件 | `LinkageCondition \| LinkageCondition[]` | - |

### 联动配置

| 属性        | 说明         | 类型                                       | 默认值 |
|-----------|------------|------------------------------------------|-----|
| `show`    | 是否显示（支持函数） | `boolean \| ((formData) => boolean)`     | -   |
| `linkage` | 联动条件       | `LinkageCondition \| LinkageCondition[]` | -   |

`LinkageCondition` 结构：

```ts
{
  prop: string       // 关联的字段名
  value: any         // 期望的值
  operator ? : '==' | '!=' | '>' | '<' | '>=' | '<=' | 'includes' | 'notIncludes'
}
```

### 选项类字段通用配置（select / radio / radio-button / checkbox / checkbox-button）

| 属性            | 说明                     | 类型       | 默认值       |
|---------------|------------------------|----------|-----------|
| `selectValue` | 选项值字段名，用于读取每个选项的 value | `string` | `'value'` |
| `selectLabel` | 选项标签字段名，用于读取每个选项的显示文本  | `string` | `'label'` |

### Checkbox 专用配置

| 属性             | 说明       | 类型                           | 默认值 |
|----------------|----------|------------------------------|-----|
| `filterValues` | 需要过滤的选项值 | `any[]`                      | -   |
| `mode`         | 显示模式     | `'horizontal' \| 'vertical'` | -   |

## 字段类型

| type              | 说明     | 示例                                                                     |
|-------------------|--------|------------------------------------------------------------------------|
| `input`           | 输入框    | `{ type: 'input', prop: 'name', label: '姓名' }`                         |
| `select`          | 下拉选择   | `{ type: 'select', prop: 'city', label: '城市', options: [...] }`        |
| `select-group`    | 分组下拉   | `{ type: 'select-group', options: [{ label: '组1', options: [...] }] }` |
| `radio`           | 单选     | `{ type: 'radio', prop: 'gender', options: [...] }`                    |
| `radio-button`    | 按钮单选   | `{ type: 'radio-button', prop: 'type', options: [...] }`               |
| `checkbox`        | 多选     | `{ type: 'checkbox', prop: 'hobby', options: [...] }`                  |
| `checkbox-button` | 按钮多选   | `{ type: 'checkbox-button', prop: 'tags', options: [...] }`            |
| `switch`          | 开关     | `{ type: 'switch', prop: 'enabled' }`                                  |
| `date`            | 日期选择   | `{ type: 'date', prop: 'birthday' }`                                   |
| `time`            | 时间选择   | `{ type: 'time', prop: 'time' }`                                       |
| `cascader`        | 级联选择   | `{ type: 'cascader', prop: 'area', options: [...] }`                   |
| `slider`          | 滑块     | `{ type: 'slider', prop: 'progress' }`                                 |
| `color`           | 颜色选择   | `{ type: 'color', prop: 'color' }`                                     |
| `upload`          | 文件上传   | `{ type: 'upload', prop: 'file' }`                                     |
| `text`            | 纯文本展示  | `{ type: 'text', prop: 'name' }`                                       |
| `text-option`     | 文本选项展示 | `{ type: 'text-option', prop: 'status', options: [...] }`              |
| `text-date`       | 文本日期展示 | `{ type: 'text-date', prop: 'createTime' }`                            |
| `slot`            | 自定义插槽  | `{ type: 'slot', prop: 'custom' }`                                     |
| `header`          | 标题分组   | `{ type: 'header', label: '基本信息' }`                                    |
| `line`            | 分割线    | `{ type: 'line' }`                                                     |
| `hidden`          | 隐藏字段   | `{ type: 'hidden', prop: 'id' }`                                       |

### 各类型详细说明

::: tip 通用机制
所有控件均通过 `v-model` 双向绑定到 `formData[prop]`，并自动透传 `clearable: true` + `filterable: true`（可通过 `item.attrs` 覆盖）。占位符未配置时按 `type` 自动生成「请输入/请选择 + label」，`disabled` 或 `upload` 类型时占位符为空。
:::

#### input 输入框

基于 `el-input`。值会自动 `trim`。

| 配置 | 说明 | 示例 |
|------|------|------|
| `attrs.type` | 输入框类型 | `'textarea'` / `'number'` / `'password'` |
| `attrs.rows` | textarea 行数 | `4` |
| `attrs.maxlength` + `showWordLimit` | 最大长度与字数统计 | `{ maxlength: 200, showWordLimit: true }` |
| `unit` | 后缀单位（渲染到 `#suffix`） | `'元'` |
| `slots` | 透传 el-input 插槽 | `{ prefix: 'myPrefix' }` |

```ts
{ prop: 'remark', label: '备注', type: 'input', attrs: { type: 'textarea', rows: 4, maxlength: 200, showWordLimit: true } }
{ prop: 'amount', label: '金额', type: 'input', unit: '元' }
```

#### select / select-group 下拉选择

基于 `el-select`。`select` 通过 `useFormOptions` 同时支持数组选项与字典 code（自动请求）；`select-group` 的 `options` 为「分组对象」，key 为组名、value 为选项数组。

| 配置 | 说明 |
|------|------|
| `options` | 数组选项 / 字典 code 字符串（select-group 为分组对象） |
| `selectValue` / `selectLabel` | 自定义选项的值/标签字段名 |
| `isLabelHasValue` | 标签显示为「值.标签」 |
| `slots.option` | 自定义选项模板，作用域 `{ option, index, config }` |
| 暴露方法 | `getSelectedOption(val)` 返回选中值对应的选项对象（change 事件会自动注入） |

```ts
// select-group 分组
{ prop: 'city', label: '城市', type: 'select-group', options: { '华东': [{label:'上海',value:1}], '华北': [{label:'北京',value:2}] } }
```

#### radio / radio-button / checkbox / checkbox-button

带 `options` 时渲染为「组」，无 `options` 时 `checkbox` 渲染为布尔开关、`radio` 渲染为单个单选。选项类控件均支持 `selectValue`/`selectLabel`/`isLabelHasValue`。

| 配置 | 适用 | 说明 |
|------|------|------|
| `options` | 全部 | 数组或字典 code |
| `filterValues` | checkbox | 仅展示这些值对应的项 |
| `mode` | checkbox | `'horizontal'`(默认) / `'vertical'` |
| `slots.default` | radio/checkbox | 整组选项的自定义渲染，作用域 `{ options }` |

#### switch 开关 / slider 滑块 / color 颜色

分别基于 `el-switch` / `el-slider` / `el-color-picker`，属性通过 `attrs` 透传。

```ts
{ prop: 'enabled', label: '启用', type: 'switch', attrs: { 'active-text': '开', 'inactive-text': '关' } }
{ prop: 'progress', label: '进度', type: 'slider', attrs: { min: 0, max: 100, step: 10, showInput: true } }
{ prop: 'color', label: '颜色', type: 'color', attrs: { 'show-alpha': true } }
```

#### date / time 日期与时间

分别基于 `el-date-picker` / `el-time-picker`，宽度自动撑满。

| 配置 | 说明 | 示例 |
|------|------|------|
| `attrs.type` | 日期类型 | `'date'`/`'datetime'`/`'daterange'`/`'datetimerange'`/`'monthrange'`/`'year'`/`'month'` |
| `attrs.value-format` | 返回值格式 | `'YYYY-MM-DD HH:mm:ss'` |
| `attrs.start-placeholder` / `end-placeholder` | 范围选择占位符 | - |

```ts
{ prop: 'range', label: '时间范围', type: 'date', attrs: { type: 'datetimerange', 'value-format': 'YYYY-MM-DD HH:mm:ss', 'start-placeholder': '开始', 'end-placeholder': '结束' } }
```

#### cascader 级联选择

基于 `el-cascader`，选项通过 `options`（数组/字典 code）。`change` 事件增强后会额外注入 `checkedNodes`（选中节点）。

```ts
{ prop: 'area', label: '地区', type: 'cascader', options: cascaderOptions, attrs: { props: { multiple: true, checkStrictly: true } } }
```

#### upload 文件上传

基于 `el-upload`，默认 `auto-upload: false`，选中文件通过 `v-model` 绑定到 `formData[prop]`，由调用方在 submit 时统一处理。详见 [文件上传](#文件上传upload) 章节。

#### text / text-option / text-date 文本展示

只读展示类，常用于详情页。

| type | 说明 | 配置 |
|------|------|------|
| `text` | 直接显示值 + `unit` | `unit` 可选 |
| `text-option` | 按 `options`/字典 code 将值映射为标签（支持数组多值，逗号分隔） | `selectValue`/`selectLabel`/`isLabelHasValue` |
| `text-date` | 按 `format` 格式化日期 | `format`（如 `'YYYY-MM-DD'`） |

```ts
{ prop: 'name', label: '姓名', type: 'text' }
{ prop: 'status', label: '状态', type: 'text-option', options: 'user_status' }
{ prop: 'createTime', label: '创建时间', type: 'text-date', format: 'YYYY-MM-DD HH:mm:ss' }
```

#### slot 自定义插槽

整项由外部插槽渲染，插槽名为 `item.prop`，作用域提供 `{ data }`（即 formData，可直接 `v-model` 绑定）。

#### header / line 分组与分割线

- `header`：分组标题，有 `children` 时作为分组容器（标题 + 子项）；无 `children` 时仅作标题。首层标题样式为 `title1`（带左侧色条），嵌套标题为 `title2`，可用 `headerClassName` 覆盖。
- `line`：分割线。

#### hidden 隐藏字段

不渲染 UI，仅保留 `prop` 对应的值在 `formData` 中（常用于携带 id）。

## 字典选项

`options` 支持三种形式：

```json
// 1. 数组（静态选项）
{
  prop: 'status',
  label: '状态',
  type: 'select',
  options: [
    {
      label: '启用',
      value: 1
    },
    {
      label: '禁用',
      value: 0
    }
  ]
}

// 2. 字符串（字典 code，自动请求）
{
  prop: 'status',
  label: '状态',
  type: 'select',
  options: 'user_status'
  // 自动调用 provideDictionary 配置的 fetcher
}

// 3. 自定义字段名
{
  prop: 'dept',
  label: '部门',
  type: 'select',
  options: [
    {
      name: '技术部',
      id: 1
    },
    {
      name: '产品部',
      id: 2
    }
  ],
  // 指定 label 字段
  selectLabel: 'name',
  // 指定 value 字段
  selectValue: 'id'
}
```

::: tip 字典前置配置
使用字典 code 前，需在入口文件配置 `provideDictionary({ fetcher })`，详见 [Dictionary 字典](./dictionary.md)。
:::

## 动态选项（联动加载）

当选项数据需要**依赖其他字段的值动态加载**时（典型场景：省市区、纲目科），把 `options` 写成函数，并配合 `dependsOn` 与 `cascadeClear`。

### 核心配置

| 属性 | 说明 | 类型 |
|------|------|------|
| `options` | 函数，接收当前 `formData`，返回选项数组或 `Promise` | `(formData) => any[] \| Promise<any[]>` |
| `dependsOn` | 依赖的字段名数组，任一变化触发重新加载（`immediate` 首次加载，便于回填） | `string[]` |
| `cascadeClear` | 该字段变化后自动清空的下级字段名数组（选了省清空市/区，避免残留不匹配值） | `string[]` |

### 工作机制

1. `options` 为函数时，`useFormOptions` 进入**异步模式**：用 `ref` 持有选项，`watch` 依赖字段触发加载
2. `dependsOn` 任一变化 → 重新调用 `options(formData)` → 更新选项（select 自动显示 `loading`）
3. `cascadeClear` 在该字段 `change` 后，于 `nextTick` 清空下级（等待当前值同步，避免覆盖）
4. 回填场景：一次性 `formData = {...}`，依赖字段有值会 `immediate` 触发逐级加载，**无需额外回填代码**

### 示例：省市区联动

```vue
<template>
  <HdiForm v-model="formData" :config="formConfig" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormConfig } from 'hdi-ui'

const formData = ref({ province: '', city: '', district: '' })

// 模拟接口
const fetchProvinces = () => Promise.resolve([{ label: '广东省', value: '44' }, { label: '浙江省', value: '33' }])
const fetchCities = (p: string) => Promise.resolve(p ? [{ label: '广州市', value: '4401' }] : [])
const fetchDistricts = (c: string) => Promise.resolve(c ? [{ label: '天河区', value: '440106' }] : [])

const formConfig: FormConfig = {
  cols: 3,
  items: [
    {
      prop: 'province', label: '省', type: 'select',
      options: () => fetchProvinces(),
      cascadeClear: ['city', 'district'],   // 选省 → 清空市/区
    },
    {
      prop: 'city', label: '市', type: 'select',
      dependsOn: ['province'],              // 依赖省
      cascadeClear: ['district'],           // 选市 → 清空区
      options: (data) => fetchCities(data.province),
      show: (data) => !!data.province,      // 选了省才显示
    },
    {
      prop: 'district', label: '区', type: 'select',
      dependsOn: ['city'],                  // 依赖市
      options: (data) => fetchDistricts(data.city),
      show: (data) => !!data.city,
    },
  ],
}
</script>
```

### 示例：纲目科（radio 联动）

字段名不固定、用单选按钮分级，同样适用：

```ts
const formConfig: FormConfig = {
  items: [
    { prop: 'gang', label: '纲', type: 'radio', options: () => fetchGang() },
    {
      prop: 'mu', label: '目', type: 'radio',
      dependsOn: ['gang'], cascadeClear: ['ke'],
      options: (data) => fetchMu(data.gang),
    },
    {
      prop: 'ke', label: '科', type: 'radio',
      dependsOn: ['mu'],
      options: (data) => fetchKe(data.mu),
    },
  ],
}
```

### 注意事项

- `dependsOn` 必须显式声明：函数体无法静态推断依赖，watch 需要明确来源
- 选项加载是**异步**的，select 会显示 `loading`；radio/checkbox 无 loading 态，建议接口较快时使用
- `cascadeClear` 用 `undefined` 清空（表示未选）；仅在字段有值时才触发更新，避免无谓 emit
- 与 `show` 联用：下级字段可在上级无值时隐藏，有值时显示并加载选项
- 若需在清空时执行额外逻辑（如重置关联搜索条件），监听该字段 `events.change` 即可，`cascadeClear` 与自定义 `change` 互不冲突（先执行用户 handler，再 nextTick 清空）

## 字段联动

### show 函数

通过 `show` 函数根据表单数据动态控制显示：

```ts
const formConfig = {
  items: [
    {
      prop: 'type', label: '类型', type: 'select', options: [
        {label: '个人', value: 'person'},
        {label: '企业', value: 'company'},
      ]
    },
    {
      prop: 'companyName', label: '公司名称', type: 'input',
      show: (data) => data.type === 'company',
    },
    {
      prop: 'personName', label: '姓名', type: 'input',
      show: (data) => data.type === 'person',
    },
  ],
}
```

### linkage 条件

通过 `linkage` 声明式配置联动：

```ts
const formConfig = {
  items: [
    {prop: 'country', label: '国家', type: 'select', options: [...]},
    {
      prop: 'province', label: '省份', type: 'select', options: [...],
      linkage: {prop: 'country', value: 'CN'},  // 仅当 country === 'CN' 时显示
    },
    {
      prop: 'city', label: '城市', type: 'select', options: [...],
      linkage: [
        {prop: 'country', value: 'CN'},
        {prop: 'province', value: 'GD', operator: '=='},
      ],  // 多条件同时满足时显示
    },
  ],
}
```

支持的 operator：`==`（默认）、`!=`、`>`、`<`、`>=`、`<=`、`includes`、`notIncludes`。

## 文件上传（upload）

`type: 'upload'` 基于 Element Plus `el-upload` 封装，**默认不上传到服务器**（`auto-upload=false`），选中后文件列表通过
`v-model` 双向绑定到 `formData[prop]`，由调用方在表单 `submit` 时统一处理。

### 基础用法

```ts
const formConfig: FormConfig = {
  cols: 1,
  labelWidth: '100px',
  items: [
    {
      prop: 'attachment', label: '附件', type: 'upload',
      attrs: {
        limit: 1,                       // 最多 1 个文件
        fileType: 'PDF,DOC,DOCX',        // 允许的文件类型（后缀，逗号分隔）
      },
      // fileSize: 50,                  // 也可在 FormConfig.attrs.attachment.fileSize 覆盖，单位 MB，默认 50
    },
  ],
}

// 表单提交时取出原生文件对象上传
const handleSubmit = (data) => {
  const file = data.attachment?.[0]?.raw
  if (file) {
    const fd = new FormData()
    fd.append('file', file)
    // uploadFile(fd).then(...)
  }
}
```

### 图片上传（拖拽 + 缩略图列表 + 预览）

```ts
const formConfig: FormConfig = {
  cols: 1,
  labelWidth: '100px',
  items: [
    {
      prop: 'images', label: '商品图片', type: 'upload',
      attrs: {
        drag: true,                     // 启用拖拽上传区
        listType: 'picture-card',     // 图片卡片列表（自带预览/删除）
        limit: 5,                         // 最多 5 张
        fileType: 'PNG,JPG,JPEG',        // 仅图片
      },
      // fileSize: 5,                   // 单张不超过 5MB
    },
  ],
}
```

### 详情页只读展示已上传文件

整表 `disabled: true` 时，上传/删除/下载按钮会自动隐藏，仅作展示。

```ts
const formConfig: FormConfig = {
  disabled: true,
  isTable: true,
  labelWidth: '120px',
  items: [
    {prop: 'name', label: '姓名', type: 'text'},
    {prop: 'files', label: '附件', type: 'upload'},
  ],
}

// 回填远程文件，需提供 name 和 url
const formData = ref({
  name: '张三',
  files: [
    {name: '合同.pdf', url: 'https://example.com/contract.pdf'},
  ],
})
```

### 自定义上传按钮（trigger 插槽）

```vue

<template>
  <HdiForm v-model="formData" :config="formConfig">
    <template #attachmentTrigger="{ config }">
      <el-button type="primary" plain>
        点击上传{{ config.attrs?.fileType }}文件
      </el-button>
    </template>
  </HdiForm>
</template>

<script setup lang="ts">
  const formConfig: FormConfig = {
    items: [
      {
        prop: 'attachment', label: '附件', type: 'upload',
        slots: {trigger: 'attachmentTrigger'},   // 覆盖默认触发器
        attrs: {fileType: 'PDF', limit: 3},
      },
    ],
  }
</script>
```

### Upload 专属配置

#### Props（透传给组件）

| 属性         | 说明           | 类型       | 默认值  |
|------------|--------------|----------|------|
| `fileSize` | 单个文件大小上限（MB） | `number` | `50` |

#### `attrs` 常用配置（透传给 el-upload）

| 属性         | 说明                   | 类型                         | 默认值                                                  |
|------------|----------------------|----------------------------|------------------------------------------------------|
| `limit`    | 最大允许上传个数             | `number`                   | `99`                                                 |
| `fileType` | 允许的文件后缀，逗号分隔（不区分大小写） | `string`                   | `PNG,JPEG,JPG,PDF,DOC,DOCX,XLS,XLSX,MP4,AVI,ZIP,XML` |
| `drag`     | 是否启用拖拽上传             | `boolean`                  | `false`                                              |
| `listType` | 列表展示类型               | `'text' \| 'picture-card'` | `'text'`                                             |

::: tip 内置能力

- 文件类型/大小校验：选错类型或超限时自动 Toast 提示并从列表移除
- 重复文件检测：同名且同大小的文件会被拒绝并提示
- 文件预览：图片/视频/音频在弹窗中预览
- 文件下载：列表项提供下载图标
- `disabled` 模式下，上传/删除按钮自动隐藏，可作详情展示
  :::

::: warning 注意事项

1. `type: 'upload'` 不会自动调用上传接口，需在 `submit` 回调中取出 `file.raw` 自行上传
2. 回填远程文件时，文件对象需提供 `name` 与 `url` 字段
3. 拖拽模式（`drag: true`）下，文件类型提示会显示在拖拽区内；按钮模式暂不显示类型提示
   :::

## 表单校验

```ts
const formConfig = {
  items: [
    {
      prop: 'username', label: '用户名', type: 'input',
      rules: [
        {required: true, message: '请输入用户名', trigger: 'blur'},
        {min: 3, max: 20, message: '长度 3-20 个字符', trigger: 'blur'},
      ],
    },
    {
      prop: 'email', label: '邮箱', type: 'input',
      rules: [
        {required: true, message: '请输入邮箱', trigger: 'blur'},
        {type: 'email', message: '邮箱格式不正确', trigger: 'blur'},
      ],
    },
  ],
  // 全局校验规则（按 prop 分组，与 item.rules 合并）
  rules: {
    username: [{pattern: /^[a-zA-Z0-9_]+$/, message: '只能包含字母数字下划线'}],
  },
}
```

## 分组标题

通过 `header` 和 `children` 实现分组：

```ts
const formConfig = {
  items: [
    {type: 'header', label: '基本信息'},
    {prop: 'name', label: '姓名', type: 'input'},
    {prop: 'age', label: '年龄', type: 'input'},
    {type: 'line'},
    {type: 'header', label: '联系方式'},
    {prop: 'phone', label: '手机号', type: 'input'},
    {prop: 'email', label: '邮箱', type: 'input'},
  ],
}
```

```ts
const formConfig = {
  items: [
    {
      type: 'header', label: '基本信息', children: [
        {prop: 'name', label: '姓名', type: 'input'},
        {prop: 'age', label: '年龄', type: 'input'},
      ]
    },
    {type: 'line'},
    {
      type: 'header', label: '联系方式', children: [
        {prop: 'phone', label: '手机号', type: 'input'},
        {prop: 'email', label: '邮箱', type: 'input'},
      ]
    },
  ],
}
```

## 自定义插槽

通过 `type: 'slot'` 使用自定义插槽：

```vue

<template>
  <HdiForm v-model="formData" :config="formConfig">
    <template #customField="{ data }">
      <el-input v-model="data.customField" type="textarea" :rows="3"/>
    </template>
  </HdiForm>
</template>

<script setup lang="ts">
  const formConfig = {
    items: [
      {prop: 'customField', label: '自定义', type: 'slot'},
    ],
  }
</script>
```

## 按钮组插槽

HdiForm 提供两个按钮组插槽，用于在提交/重置按钮前后插入额外按钮：

- `#btn-prefix`：在按钮组最前面插入按钮
- `#btn-suffix`：在按钮组最后面插入按钮

两个插槽都提供 `submit` 和 `reset` 作用域参数，可用于触发提交或重置。

```vue

<template>
  <HdiForm v-model="formData" :config="formConfig" @submit="handleSubmit">
    <template #btn-prefix="{ submit, reset }">
      <el-button type="success" @click="handleSaveAndContinue(submit)">
        保存并继续
      </el-button>
    </template>
    <template #btn-suffix="{ submit }">
      <el-button type="danger" @click="handleDelete">删除</el-button>
    </template>
  </HdiForm>
</template>
```

::: tip 按钮组渲染条件
当 `showSubmit` / `showReset` 任一为 `true`，或使用了 `#btn-prefix` / `#btn-suffix` 插槽时，按钮组才会渲染。
:::

::: tip 对齐方式
通过 `formConfig.btnsJustifyContent` 控制按钮组对齐方式，可选值：
`flex-start` / `flex-end` / `center`（默认）/ `space-between` / `space-around` / `space-evenly` / `start` / `end`
:::

## 传递 Element Plus 属性

通过 `attrs` 透传属性到 Element Plus 控件：

```ts
const formConfig = {
  items: [
    {
      prop: 'remark', label: '备注', type: 'input',
      attrs: {
        type: 'textarea',
        rows: 4,
        maxlength: 200,
        showWordLimit: true,
      },
    },
    {
      prop: 'time', label: '时间', type: 'date',
      attrs: {
        type: 'datetimerange',
        'value-format': 'YYYY-MM-DD HH:mm:ss',
        'start-placeholder': '开始时间',
        'end-placeholder': '结束时间',
      },
    },
  ],
}
```

也可在 FormConfig 层级按 prop 配置：

```ts
const formConfig = {
  items: [...],
  attrs: {
    remark: {type: 'textarea', rows: 4},
  },
}
```

## 事件

| 事件名                 | 参数           | 说明        |
|---------------------|--------------|-----------|
| `update:modelValue` | `(value)`    | 表单数据变化    |
| `submit`            | `(formData)` | 点击提交且校验通过 |
| `reset`             | `(formData)` | 点击重置      |

## 暴露方法

通过 `ref` 可调用：

```ts
const formRef = ref()

// 手动触发提交（会先校验）
formRef.value.submit()

// 手动重置
formRef.value.reset()

// 获取 el-form 实例（可调用 validate、clearValidate 等）
formRef.value.formRef
```

## 表格样式表单

设置 `isTable: true` 可渲染为表格样式的表单（常用于详情展示）：

```ts
const formConfig = {
  isTable: true,
  labelWidth: '120px',
  items: [
    {prop: 'name', label: '姓名', type: 'text'},
    {prop: 'age', label: '年龄', type: 'text'},
  ],
}
```

## 弹窗表单（FormDialog）

`HdiFormDialog` 是对 `HdiForm` 的封装，提供「弹窗/抽屉 + 表单 + 提交/取消」的开箱即用组合，支持 `open({ type, record })`
直接唤起。

::: tip 详细文档
请参阅 [FormDialog 弹窗表单](./form-dialog) 查看完整的使用说明、Props、事件和示例。
:::
