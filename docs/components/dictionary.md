# Dictionary 字典

字典数据提供组件，用于统一管理字典数据的获取、缓存和分发。本身不渲染 UI，通过**作用域插槽**将数据暴露给子组件。

## 前置配置

使用字典功能前，必须先配置字典获取器（fetcher），告诉组件如何从后端拉取字典数据。

```ts
// main.ts
import { provideDictionary } from 'hdi-ui'

provideDictionary({
  // fetcher 接收字典名称，返回字典项数组
  fetcher: async (dictName) => {
    const res = await fetch(`/api/dictionary/${dictName}`)
    const data = await res.json()
    return data.map((item: any) => ({
      label: item.text,
      value: item.code,
    }))
  },
})
```

::: warning 必须配置
未配置 fetcher 时，组件会抛出错误：`[HdiDictionary] 未配置字典获取器，请先调用 provideDictionary()`。
:::

## 基础用法

通过 `dictName` 指定字典名称，组件会自动请求并缓存数据，通过作用域插槽暴露：

```vue
<script setup lang="ts">
import { HdiDictionary } from 'hdi-ui'
</script>

<template>
  <HdiDictionary dict-name="user_status">
    <template #default="{ items, loading }">
      <el-select v-if="!loading" placeholder="请选择状态">
        <el-option
          v-for="item in items"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </template>
  </HdiDictionary>
</template>
```

## 作用域插槽

组件通过默认插槽暴露以下数据：

| 插槽参数 | 说明 | 类型 |
|----------|------|------|
| `items` | 字典项列表 | `DictionaryItem[]` |
| `loading` | 是否加载中 | `boolean` |
| `error` | 错误信息 | `Error \| null` |
| `load` | 加载函数 | `(force?: boolean) => Promise<void>` |
| `refresh` | 刷新（清除缓存后重新加载） | `() => void` |
| `clearCache` | 清除缓存 | `() => void` |

### DictionaryItem 类型

```ts
interface DictionaryItem {
  label: string
  value: string | number
  [key: string]: unknown
}
```

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `dictName` | 字典名称 | `string` | - |
| `immediate` | 是否立即加载 | `boolean` | `true` |

## 缓存机制

- 同一 `dictName` 的字典数据**全局缓存**，多次使用只会请求一次
- 并发请求会复用同一个 Promise，避免重复请求
- 调用 `refresh()` 会清除该字典的缓存并重新加载
- 调用 `clearCache()` 会清除该字典的缓存，但不重新加载

## 在 Form 表单中使用

Form 表单字段配置 `options` 为**字符串**时，会自动识别为字典 code，通过 `useFormOptions` 内部调用 `useDictionary` 获取数据：

```ts
const formConfig = {
  items: [
    {
      prop: 'status',
      label: '状态',
      type: 'select',
      options: 'user_status',  // 传字符串 = 字典 code，自动请求
    },
    {
      prop: 'level',
      label: '等级',
      type: 'select',
      options: [               // 传数组 = 静态选项
        { label: '高', value: 1 },
        { label: '低', value: 2 },
      ],
    },
  ],
}
```

::: tip 自动识别
`options` 为字符串时走字典请求，为数组时直接使用。无需手动处理。
:::

## 在 Table 表格中使用

Table 列配置 `options` 为字符串时同样自动请求字典：

```ts
const tableConfig = {
  items: [
    {
      prop: 'status',
      label: '状态',
      type: 'select',
      isSearch: true,
      isTable: true,
      isAdd: true,
      isEdit: true,
      options: 'user_status',  // 字典 code
      tableCellType: 'ENUM',   // 表格中显示为枚举文本
    },
  ],
}
```

## useDictionary Composable

如需在组件内直接获取字典数据（不通过 HdiDictionary 组件），可使用 `useDictionary`：

```vue
<script setup lang="ts">
import { useDictionary } from 'hdi-ui'

const { items, loading, error, refresh } = useDictionary('user_status')

// items 是响应式的，可直接在模板中使用
</script>
```

| 返回值 | 说明 | 类型 |
|--------|------|------|
| `items` | 字典项列表（响应式） | `Ref<DictionaryItem[]>` |
| `loading` | 是否加载中 | `Ref<boolean>` |
| `error` | 错误信息 | `Ref<Error \| null>` |
| `load` | 加载函数 | `(force?: boolean) => Promise<void>` |
| `refresh` | 刷新 | `() => void` |
| `clearCache` | 清除缓存 | `() => void` |

## 实现细节

- HdiDictionary 以 `<slot>` 作为根节点（无包裹元素），确保 scoped slot 正常工作
- 字典缓存为模块级单例，所有组件实例共享同一份缓存
- `provideDictionary` 通过模块级变量存储配置，无需在组件树中 provide/inject
