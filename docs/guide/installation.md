# 安装

## 环境要求

- Node.js >= 18
- Vue ^3.4.0
- Element Plus ^2.8.0

## 安装组件库

```bash
npm install hdi-ui
# 或
pnpm add hdi-ui
# 或
yarn add hdi-ui
```

## 安装 peer 依赖

如果业务项目尚未安装 Vue 和 Element Plus，需先安装：

```bash
npm install vue element-plus @element-plus/icons-vue
```

## 验证安装

```ts
import { HdiTable } from 'hdi-ui'
console.log(HdiTable) // 应输出组件对象
```

如果控制台输出组件对象，说明安装成功。

## 下一步

- [快速上手](./quick-start) - 在项目中引入组件
- [CDN 引入](./cdn) - 在无构建工具的 HTML 页面使用
