import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

/**
 * 全量组件库 UMD 单独构建配置
 *
 * 将 src/index.umd.ts 打包成单文件 UMD，供无构建工具的 HTML 页面使用。
 * 包含全部业务组件（HdiIcon/HdiDictionary/HdiForm/HdiTable）+ 图标组件 + 指令。
 * Vue / Element Plus / @element-plus/icons-vue 作为 external，运行时通过 CDN 全局变量获取。
 * CSS 由 libInjectCss 内联到 JS 中，运行时自动注入 <style>，无需单独引入。
 *
 * 产物: dist/hdi-ui.umd.js
 *
 * HTML 页面使用示例:
 *   <script src="https://unpkg.com/vue@3"></script>
 *   <script src="https://unpkg.com/element-plus"></script>
 *   <script src="/path/to/hdi-ui.umd.js"></script>
 *   <script>
 *     const app = Vue.createApp({})
 *     app.use(ElementPlus)   // 先注册 Element Plus
 *     app.use(HdiUi)         // 再注册 HdiUi 全部组件和指令
 *     app.mount('#app')
 *   </script>
 *   <!-- 模板中直接使用: <HdiTable /> <HdiForm /> <Icon80Add /> 等 -->
 */
export default defineConfig({
  plugins: [vue(), libInjectCss()],
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/index.umd.ts'),
      name: 'HdiUi',
      fileName: () => 'hdi-ui.umd.js',
      formats: ['umd'],
    },
    rollupOptions: {
      external: ['vue', 'element-plus', '@element-plus/icons-vue'],
      output: {
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus',
          '@element-plus/icons-vue': 'ElementPlusIconsVue',
        },
        assetFileNames: 'hdi-ui[extname]',
      },
    },
    cssCodeSplit: true,
    sourcemap: true,
  },
})
