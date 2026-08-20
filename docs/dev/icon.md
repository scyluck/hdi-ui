# Icon 图标开发

本文档面向 **hdi-ui 框架的开发维护者**，介绍如何扩展图标资源、修改图标生成脚本，以及 SVG 处理流程。

::: tip 配套使用文档
业务侧使用方式见 [Icon 图标](/components/icon) 与 [图标总览](/components/icon-gallery)。
:::

## 目录结构

```
src/
├── icons/
│   ├── svg/               # SVG 源文件目录（手动维护）
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

## SVG 文件要求

- 包含 `viewBox` 属性（如 `viewBox="0 0 24 24"`）
- 不需要手动处理颜色，脚本会自动移除 `fill`/`stroke` 并统一为 `currentColor`
- 内部路径使用相对坐标，避免硬编码尺寸

## SVG 处理流程

[generate-icons.ts](file:///e:/hdi-ui/scripts/generate-icons.ts) 中的 SVGO 插件会：

1. 移除 `fill`、`stroke`、`class`、`style`、`data-name`、`id` 属性
2. 添加 `fill="currentColor"` 实现颜色继承
3. 保留 `viewBox` 属性
4. 移除 XML 声明和注释

## 组件层级

```
IconXxx.vue（生成） ──使用──> IconBase（容器） ──被包装──> HdiIcon（业务包装）
```

- **IconBase**：低层 SVG 容器，负责 `<svg>` 包裹与尺寸/颜色继承
- **IconXxx**（生成）：调用 IconBase 并传入特定 path，文件由脚本生成，**勿手动修改**
- **HdiIcon**：业务层包装，提供 spin 动画与统一样式

## 新增图标后须更新 Resolver

业务项目通过 `unplugin-vue-components` 按需引入图标，resolver 配置使用 [icons.generated.ts](file:///e:/hdi-ui/src/resolvers/icons.generated.ts) 提供的类型。新增 SVG 后必须执行 `npm run generate:icons` 才能让业务侧识别新图标，否则 resolver 类型过期。

::: warning 发布前必做
`prepublishOnly` 钩子会自动执行 `npm run build:release`，其中包含 `generate:icons`，但仍建议手动跑一次确认生成结果与预期一致。
:::

## 扩展：自定义 SVG 预处理

若需要支持多色图标或特殊路径优化，可在 [generate-icons.ts](file:///e:/hdi-ui/scripts/generate-icons.ts) 的 SVGO 插件配置中扩展。例如保留某些属性：

```ts
const svgoPlugins = [
  // 默认会移除 fill，若需要保留原图标的多色 fill，注释掉 removeAttrs 中的 'fill'
  // { name: 'removeAttrs', params: { attrs: 'fill' } },
]
```

修改后必须重新执行 `npm run generate:icons` 让所有图标按新规则重新生成。
