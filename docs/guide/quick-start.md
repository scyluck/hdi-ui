# 快速上手

本指南介绍如何在 Vite + Vue3 项目中使用 Hdi UI。

## 方式一：按需引入（推荐）

使用 `unplugin-vue-components` 实现组件自动按需引入，无需手动 import。

### 1. 配置 Vite 插件

```ts
// vite.config.ts
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {createHdiUiVitePlugins} from 'hdi-ui/vite'
import Components from 'unplugin-vue-components/vite'
import {HdiUiResolver} from 'hdi-ui/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    // 方式一
    // createHdiUiVitePlugins(), 
    // 方式二
    Components({
      resolvers: [
        HdiUiResolver(),           // hdi-ui 组件 + 图标
        // ElementPlusResolver(),  // 如果还有其他组件库也可以同时配
      ],
    })
  ],
})
```

`createHdiUiVitePlugins` 默认开启图标自动导入，会自动生成 `src/components.d.ts` 类型声明文件，之后在模板中直接使用组件即可。

如需关闭图标导入（仅保留框架组件自动导入）：

```ts
createHdiUiVitePlugins({importIcons: false})
```

```vue

<template>
  <HdiTable :config="config" @getTableData="getData"/>
</template>
```

### 2. 手动引入（如需）

也可以手动 import 组件：

```vue

<script setup lang="ts">
  import {HdiTable} from 'hdi-ui'
  import type {TableSetConfig} from 'hdi-ui'
</script>
```

## 方式二：全局注册

在入口文件一次性注册所有组件：

```ts
// main.ts
import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import HdiUi from 'hdi-ui'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)
app.use(HdiUi)
app.mount('#app')
```

全局注册后，模板中可直接使用所有组件，无需 import。

::: tip 注意
Hdi UI 的组件内部依赖 Element Plus，使用前请确保已注册 Element Plus。
:::

## 样式说明

Hdi UI 的组件样式基于 Element Plus，业务项目只需引入 Element Plus 的样式即可：

```ts
import 'element-plus/dist/index.css'
```

Hdi UI 组件自身的样式会通过构建工具（`vite-plugin-lib-inject-css`）自动注入，**无需额外引入** 。

## TypeScript 支持

Hdi UI 提供完整的类型定义，`package.json` 已配置 `types` 字段，TS 项目可直接使用：

```ts
import type {TableSetConfig, TableData, PageInfo} from 'hdi-ui'
```

## 下一步

- [Table 表格](/components/table) - 业务级表格组件
- [Icon 图标](/components/icon) - 图标组件
