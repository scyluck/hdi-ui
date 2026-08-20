# 开发指南总览

本文档面向 **hdi-ui 框架的开发维护者**。各组件的扩展细节已按「组件」拆分到对应子文档，本页只保留通用部分：目录结构、构建发布流程、代码规范。

## 按组件拆分的开发文档

| 组件 | 文档 | 主要内容 |
|------|------|----------|
| Icon | [Icon 图标开发](/dev/icon) | 新增/删除图标、SVG 处理流程、resolver 更新 |
| Form | [Form 表单开发](/dev/form) | 新增表单类型、自动注册原理、Props 约定 |
| FormDialog | [FormDialog 弹窗表单开发](/dev/form-dialog) | 双模式实现、open() 方法、与 Table 集成 |
| Table | [Table 表格开发](/dev/table) | 新增单元格类型、新增工具栏按钮、内置弹窗集成 |
| Directives | [Directives 指令开发](/dev/directives) | 指令设计约定、新增指令示例、权限解耦 |

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
│   ├── FormDialog/        # 弹窗表单组件
│   │   ├── FormDialog.vue # 弹窗/抽屉 + 表单封装
│   │   └── index.ts       # 导出入口
│   ├── Permission/        # 权限包装组件
│   │   ├── Permission.vue # 复用 hasPermission 的条件渲染组件
│   │   └── index.ts       # 导出 HdiPermission
│   ├── Table/             # 表格组件
│   │   ├── table-cell.vue # 单元格渲染（tableCellType）
│   │   ├── dialog.vue     # Table 内置弹窗（包装 HdiFormDialog）
│   │   ├── utils.ts       # 工具函数（formatTime 等）
│   │   └── const.ts       # 常量定义
│   └── ...
├── directives/
│   ├── index.ts            # 聚合导出 + registerDirectives 全局注册
│   ├── click-outside.ts    # v-click-outside
│   ├── copy.ts             # v-copy
│   ├── debounce.ts         # v-debounce
│   └── permission.ts       # v-permission + 权限工具
├── icons/
│   ├── svg/               # SVG 源文件目录
│   ├── components/        # 生成的图标 .vue 组件（勿手动修改）
│   ├── index.ts           # 图标统一导出（自动生成）
│   └── bundle.ts          # UMD 入口（自动生成）
└── scripts/
    └── generate-icons.ts  # 图标 + UMD 入口生成脚本
```

## 构建与发布

### 构建命令

```bash
# 日常构建（增量生成图标 + 增量类型检查 + ESM/CJS）
npm run build

# 完整发布构建（带 sourcemap 的 ESM/CJS + UMD + CDN 同步）
npm run build:release

# 单独执行某一步
npm run generate:icons    # 仅生成图标组件 + UMD 入口
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
