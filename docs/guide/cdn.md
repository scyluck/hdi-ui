# CDN 引入

对于无构建工具的 HTML 页面（如内部小工具、原型演示），可通过 CDN 引入 Hdi UI。

## UMD 产物

Hdi UI 提供两个 UMD 产物：

| 文件 | 说明 | 依赖 |
|------|------|------|
| `hdi-icons.umd.js` | 仅图标组件 | Vue |
| `hdi-ui.umd.js` | 完整组件库 | Vue + Element Plus |

## CDN 地址

通过 jsDelivr 引用 GitHub 仓库中的 CDN 产物：

```html
<!-- 仅图标 -->
<script src="https://cdn.jsdelivr.net/gh/scyluck/hdi-ui@master/cdn/hdi-icons.umd.js"></script>

<!-- 完整组件库 -->
<script src="https://cdn.jsdelivr.net/gh/scyluck/hdi-ui@master/cdn/hdi-ui.umd.js"></script>
```

## 完整示例

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Hdi UI CDN 示例</title>
  <link rel="stylesheet" href="https://unpkg.com/element-plus/dist/index.css" />
  <style>
    body { margin: 0; padding: 16px; }
  </style>
</head>
<body>
  <div id="app"></div>

  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script src="https://unpkg.com/element-plus"></script>
  <script src="https://cdn.jsdelivr.net/gh/scyluck/hdi-ui@master/cdn/hdi-ui.umd.js"></script>
  <script>
    const { createApp, ref } = Vue

    const App = {
      template: `
        <hdi-icon :size="24" color="#409eff" name="icon-home" />
        <hdi-table :config="config" @getTableData="getData" />
      `,
      setup() {
        const config = {
          items: [
            { prop: 'id', label: 'ID', type: 'index', isTable: true },
            { prop: 'name', label: '姓名', type: 'input', isTable: true },
          ],
          page: { size: 10 },
          isStartGet: true,
        }
        const getData = (pageInfo, formSearch, callback) => {
          const records = Array.from({ length: 3 }, (_, i) => ({
            id: i + 1,
            name: '用户' + (i + 1),
          }))
          callback({ records, totalNums: 3, totalPages: 1 })
        }
        return { config, getData }
      },
    }

    const app = createApp(App)
    app.use(ElementPlus)
    app.use(HdiUi)
    app.mount('#app')
  </script>
</body>
</html>
```

## 组件命名规则

CDN 方式下，组件注册了 PascalCase 和 kebab-case 两种别名，HTML 中均可使用：

| 组件 | PascalCase | kebab-case |
|------|------------|------------|
| HdiTable | `<HdiTable>` | `<hdi-table>` |
| HdiForm | `<HdiForm>` | `<hdi-form>` |
| IconHome | `<IconHome>` | `<icon-home>` |
| Icon80Add | `<Icon80Add>` | `<icon-80-add>` |

::: tip HTML 标签大小写
HTML 解析器会将标签名转为小写，因此在 HTML 页面中建议使用 kebab-case 形式（如 `<hdi-table>`），避免大小写匹配问题。
:::

## 缓存更新

jsDelivr 有 CDN 缓存，更新组件库后需清除缓存：

1. 浏览器访问 `https://purge.jsdelivr.net/gh/scyluck/hdi-ui@master/cdn/hdi-ui.umd.js`
2. 返回 JSON 中 `status` 为 `purged` 即表示缓存已刷新

如需强制使用最新版本，可在 URL 中使用 commit hash 替代 `@master`：

```html
<script src="https://cdn.jsdelivr.net/gh/scyluck/hdi-ui@<commit-hash>/cdn/hdi-ui.umd.js"></script>
```
