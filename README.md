# hdi-ui

公司统一前端 UI 框架，基于 **Vue 3 + Element Plus + TypeScript**。

## 特性

- 统一的基础样式变量与工具类
- 常用自定义组件（按需引入）
- 常用指令（`v-click-outside`、`v-debounce`）
- 常用工具函数
- **SVG 图标自动生成**：放入 SVG 后自动去色并生成 Vue 图标组件

## 安装

```bash
npm install hdi-ui element-plus vue
```

## 完整引入

```ts
import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import HdiUi from 'hdi-ui'
import 'element-plus/dist/index.css'
import 'hdi-ui/styles/index.scss'

const app = createApp(App)
app.use(ElementPlus)
app.use(HdiUi)
app.mount('#app')
```

## 图标按需引入

图标由 `src/icons/svg/` 下的 SVG 文件自动生成，构建时会去除硬编码颜色，统一使用 `currentColor`，可通过 CSS `color` 控制颜色。

```vue

<script setup lang="ts">
  // 方式一：从 icons 入口按需引入
  import {IconHome, IconSearch} from 'hdi-ui/icons'

  // 方式二：单独引入某个图标（Tree-shaking 更友好）
  import IconHome from 'hdi-ui/icons/IconHome'
</script>

<template>
  <IconHome :size="20" color="#409eff"/>
  <IconSearch :size="24"/>
</template>
```

配合通用图标容器：

```vue

<script setup lang="ts">
  import {HdiIcon} from 'hdi-ui'
  import {IconSetting} from 'hdi-ui/icons'
</script>

<template>
  <HdiIcon :icon="IconSetting" :size="18" spin/>
</template>
```

## 新增图标

1. 将 SVG 文件放入 `src/icons/svg/`（如 `download.svg`）
2. 运行生成脚本：

```bash
npm run generate:icons
```

3. 自动生成 `IconDownload` 组件，可在业务项目中按需引入

### SVG 规范建议

- 保留 `viewBox`，不要写死 `width/height`
- 颜色由框架自动去除，无需手动处理
- 文件名使用 kebab-case，如 `arrow-left.svg` → `IconArrowLeft`

## 开发

```bash
npm install
npm run generate:icons
npm run dev
npm run build
```

## 目录结构

```
hdi-ui/
├── scripts/
│   └── generate-icons.ts    # SVG → Vue 图标组件生成脚本
├── src/
│   ├── components/Icon/     # 图标基础组件
│   ├── icons/
│   │   ├── svg/             # 原始 SVG（手动维护）
│   │   ├── components/      # 生成的图标组件（自动生成）
│   │   └── index.ts         # 图标导出入口
│   ├── directives/          # 自定义指令
│   ├── styles/              # 全局样式
│   └── utils/               # 工具函数
└── package.json
```

## UMD构建使用示例

```
<!DOCTYPE html>
<html>
<head>
  <!-- 1. Vue 3 CDN -->
  <script src="https://unpkg.com/vue@3"></script>
  <!-- 2. Element Plus CDN（全量 UMD 需要） -->
  <script src="https://unpkg.com/element-plus"></script>
  <link rel="stylesheet" href="https://unpkg.com/element-plus/dist/index.css">
  <!-- 3. HdiUi UMD -->
<script src="https://cdn.jsdelivr.net/gh/scyluck/hdi-ui@master/cdn/hdi-ui.umd.js"></script>
</head>
<body>
  <div id="app">
    <hdi-table :data="tableData" />
    <hdi-form :config="formConfig" />
    <icon-80-add :size="24" color="#409eff" />
  </div>
  <script>
    const { createApp, ref } = Vue
    const app = createApp({})
    app.use(ElementPlus)   // 先注册 Element Plus
    app.use(HdiUi)         // 再注册 HdiUi 全部组件和指令
    app.mount('#app')
  </script>
</body>
</html>
```
