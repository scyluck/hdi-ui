# 图标总览

点击图标即可复制组件名称，直接在业务代码中粘贴使用。

## 按需引入

```ts
import { Icon90Add } from 'hdi-ui/icons'
```

## 全局自动导入

在 `vite.config.ts` 中配置 `createHdiUiVitePlugins()` 后，直接在模板中使用 `<Icon90Add />` 即可，无需手动 import。

## CDN 引入

在 HTML 页面中：

```html
<script src="https://cdn.jsdelivr.net/gh/scyluck/hdi-ui@master/cdn/hdi-icons.umd.js"></script>
```

然后：

```js
app.use(HdiIcons)
```

注册后可通过 `<icon-90-add />` 使用。

---

<div id="icon-gallery-mount"></div>
