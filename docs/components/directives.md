# Directives 指令

Hdi UI 内置的全局指令，覆盖权限、复制、防抖、点击外部等高频业务场景。所有指令都通过 `app.use(HdiUi)` 注册，模板中可直接使用，无需 import。

## 指令总览

| 指令 | 作用 |
|------|------|
| [`v-permission`](/components/directive-permission) | 权限控制：根据权限标识控制元素显示/禁用 |
| [`v-copy`](/components/directive-copy) | 点击元素一键复制内容到剪贴板 |
| [`v-debounce`](/components/directive-debounce) | 防抖：合并连续触发，只在周期末（或开头）执行一次 |
| [`v-click-outside`](/components/directive-click-outside) | 点击元素外部时触发回调 |

::: tip 全局注册开关
`app.use(HdiUi, { registerDirectives: false })` 可禁用全局指令注册，改由业务自行按需 import 单个指令对象（见文末「按需使用」）。
:::

## 按需使用

若不希望全局注册，可在 `app.use(HdiUi, { registerDirectives: false })` 后，于单个组件内直接 import 指令对象使用：

```vue
<template>
  <el-button v-permission="'user:add'" v-copy="copyText" v-debounce:500="submit">操作</el-button>
</template>

<script setup lang="ts">
import { vPermission, vCopy, vDebounce } from 'hdi-ui'

const copyText = 'some text'
const submit = () => {}
</script>
```

::: tip
Vue 3 中 `<script setup>` 内 import 的指令对象（以 `v` 开头）会自动作为指令可用，无需 `directives` 注册。
:::

## HdiPermission 权限包装组件

权限包装组件，与 `v-permission` 指令基于同一套权限校验逻辑，但以组件方式包裹内容，更适合多元素包裹、需要兜底内容、希望以声明式控制渲染的场景。详见 [v-permission 权限控制](/components/directive-permission#hdipermission-权限包装组件)。

## 程序化调用 hasPermission

如需在脚本中直接判断权限（路由守卫、条件分支等），可调用框架导出的 `hasPermission` 函数。详见 [v-permission 权限控制](/components/directive-permission#程序化调用-haspermission)。

---

## 开发说明

指令的设计约定、扩展方式、新增指令示例等内容，面向框架维护者，详见 [Directives 指令开发](/dev/directives)。
