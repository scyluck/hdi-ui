# 快速上手

本指南介绍如何在 Vite + Vue3 项目中使用 Hdi UI。

## 方式一：按需引入（推荐）

使用 `createHdiUiVitePlugins` 实现组件自动按需引入 + 指令自动注册，无需手动 import。

### 1. 配置 Vite 插件

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHdiUiVitePlugins } from 'hdi-ui/vite'

export default defineConfig({
  plugins: [
    vue(),
    // 返回插件数组：包含组件按需引入 + 指令自动注册
    ...createHdiUiVitePlugins(),
  ],
})
```

`createHdiUiVitePlugins` 会返回两个 Vite 插件：

| 插件 | 作用 |
|------|------|
| `unplugin-vue-components` | 组件 + 图标自动按需引入，生成 `src/components.d.ts` 类型声明 |
| `hdi-ui:directives` | 自动在入口文件 `main.ts` 中注入 `registerDirectives(app)`，使 `v-permission`、`v-copy`、`v-debounce`、`v-click-outside` 指令在按需引入模式下也可用 |

::: tip 指令自动注册原理
插件会检测入口文件中的 `createApp(...)` 调用，自动注入 `registerDirectives(app)`。若入口文件名不是 `main.ts` / `main.js`，可通过 `directivesEntryPattern` 自定义匹配：

```ts
createHdiUiVitePlugins({
  directivesEntryPattern: /app\.[tj]s$/,
})
```

若已手动注册指令或不需要指令，可关闭：

```ts
createHdiUiVitePlugins({ registerDirectives: false })
```
:::

如需关闭图标导入（仅保留框架组件自动导入）：

```ts
createHdiUiVitePlugins({ importIcons: false })
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

### 方式一变体：仅使用 Resolver

如果项目已有 `unplugin-vue-components` 配置，也可单独引入 `HdiUiResolver` 和指令插件：

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { HdiUiResolver, hdiUiDirectivesPlugin } from 'hdi-ui/vite'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        HdiUiResolver(),           // hdi-ui 组件 + 图标
        // ElementPlusResolver(),  // 如果还有其他组件库也可以同时配
      ],
    }),
    hdiUiDirectivesPlugin(),       // 自动注册指令
  ],
})
```

## 方式二：全局注册

在入口文件一次性注册所有组件和指令：

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

全局注册后，模板中可直接使用所有组件和指令，无需 import。

::: tip 注意
Hdi UI 的组件内部依赖 Element Plus，使用前请确保已注册 Element Plus。
:::

## 指令注册说明

不同引入方式下指令的注册方式：

| 引入方式 | 指令是否自动注册 | 说明 |
|----------|------------------|------|
| `createHdiUiVitePlugins()` | ✓ | 插件自动注入 `registerDirectives(app)` |
| `HdiUiResolver` + `hdiUiDirectivesPlugin()` | ✓ | 手动添加指令插件 |
| `HdiUiResolver` 单独使用 | ✗ | 需手动在 `main.ts` 中注册 |
| `app.use(HdiUi)` 全局注册 | ✓ | `install` 时自动调用 `registerDirectives(app)` |

若使用 `HdiUiResolver` 但未添加指令插件，需在 `main.ts` 中手动注册：

```ts
import { createApp } from 'vue'
import { registerDirectives } from 'hdi-ui'
import App from './App.vue'

const app = createApp(App)
registerDirectives(app)   // 手动注册指令
app.mount('#app')
```

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
- [Directives 指令](/components/directives) - 全局指令
