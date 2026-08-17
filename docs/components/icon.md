# Icon 图标

Hdi UI 内置 500+ SVG 图标，支持按需引入和 CDN 引入。

::: tip 查找图标
需要浏览所有图标并复制组件名？请访问 [图标总览](./icon-gallery) 页面。
:::

## 基础用法

```vue

<script setup lang="ts">
  import {Icon90Add, Icon60Back2} from 'hdi-ui/icons'
</script>

<template>
  <Icon90Add :size="24" color="#409eff"/>
  <Icon60Back2 :size="16"/>
</template>
```

## 通过 HdiIcon 组件使用

`HdiIcon` 是业务层封装，通过 `icon` 属性传入图标组件，并提供 `spin` 旋转动画：

```vue

<script setup lang="ts">
  import {HdiIcon} from 'hdi-ui'
  import {Icon90Add, Icon60Back2} from 'hdi-ui/icons'
</script>

<template>
  <!-- 传入图标组件 -->
  <HdiIcon :icon="Icon90Add" :size="24" color="#409eff"/>

  <!-- 旋转动画 -->
  <HdiIcon :icon="Icon60Back2" :size="20" spin/>
</template>
```

::: tip 适用场景
HdiIcon 适用于需要动态切换图标或统一 spin 动画的场景。如果只是静态使用单个图标，直接用图标组件（如 `<Icon90Add />`）更简洁。
:::

### 动态切换图标

```vue

<script setup lang="ts">
  import {ref} from 'vue'
  import {HdiIcon} from 'hdi-ui'
  import {Icon90Add, Icon60Back2} from 'hdi-ui/icons'

  const currentIcon = ref(Icon90Add)

  function toggle(loading: boolean) {
    currentIcon.value = loading ? Icon60Back2 : Icon90Add
  }
</script>

<template>
  <HdiIcon :icon="currentIcon" :size="24" :spin="currentIcon === Icon60Back2"/>
</template>
```

## 按需引入

配合 `unplugin-vue-components` + `HdiUiResolver`，模板中直接使用图标组件即可自动导入，无需手动 import。

```vue

<template>
  <Icon90Add :size="24"/>
  <Icon60Back2 :size="16"/>
  <HdiIcon :icon="Icon90Add" :size="24" color="#409eff"/>
</template>
<script setup lang="ts">
  import {Icon90Add} from 'hdi-ui/icons'
</script>
```

插件会自动解析组件名并按需引入，无需在 `<script>` 中 import。但是在HdiIcon中使用的图标必须要手动import。

## Props

### 图标组件（IconHome 等）

| 属性      | 说明       | 类型       | 默认值            |
|---------|----------|----------|----------------|
| `size`  | 图标尺寸（px） | `number` | `16`           |
| `color` | 图标颜色     | `string` | `currentColor` |

### HdiIcon 组件

| 属性      | 说明              | 类型          | 默认值            |
|---------|-----------------|-------------|----------------|
| `icon`  | 图标组件（Component） | `Component` | -              |
| `size`  | 图标尺寸（px）        | `number`    | `16`           |
| `color` | 图标颜色            | `string`    | `currentColor` |
| `spin`  | 是否旋转动画          | `boolean`   | `false`        |

## 新增图标

1. 将 `.svg` 文件放入 `src/icons/svg/` 目录
2. 文件名规则：`80-add.svg` → 组件名 `Icon80Add`；中文会自动去除（如 `90-edit-编辑.svg` → `Icon90Edit`）
3. 执行 `npm run generate:icons` 重新生成组件
4. 执行 `npm run build` 构建并同步 CDN

## CDN 引入

在无构建工具的 HTML 页面中，使用 kebab-case 标签名：

```html

<script src="https://cdn.jsdelivr.net/gh/scyluck/hdi-ui@master/cdn/hdi-icons.umd.js"></script>

<icon-home :size="24" color="#409eff"></icon-home>
<icon-80-add :size="24"></icon-80-add>
```

::: warning 命名规则
CDN 方式下，字母与数字交界处会插入连字符：

- `IconHome` → `<icon-home>`
- `Icon80Add` → `<icon-80-add>`
- `Icon90Edit4` → `<icon-90-edit-4>`
  :::
