import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

/**
 * 图标库 UMD 单独构建配置
 *
 * 将 src/icons/bundle.ts 打包成单文件 UMD，供无构建工具的 HTML 页面使用。
 * Vue 作为 external，运行时通过全局 Vue（CDN 引入）获取。
 * CSS（含 HdiIcon spin 动画）由 libInjectCss 内联到 JS 中，运行时自动注入 <style>，无需单独引入。
 *
 * 产物: dist/icons/hdi-icons.umd.js
 *
 * HTML 页面使用示例:
 *   <script src="https://unpkg.com/vue@3"></script>
 *   <script src="/path/to/hdi-icons.umd.js"></script>
 *   <script>
 *     const app = Vue.createApp({})
 *     app.use(HdiIcons)        // 注册全部图标为全局组件
 *     app.mount('#app')
 *   </script>
 *   <!-- 模板中直接使用: <Icon80Add :size="24" color="#409eff" /> -->
 */
export default defineConfig({
  plugins: [vue(), libInjectCss()],
  build: {
    outDir: 'dist/icons',
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/icons/bundle.ts'),
      name: 'HdiIcons',
      fileName: () => 'hdi-icons.umd.js',
      formats: ['umd'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },
        assetFileNames: 'hdi-icons[extname]',
      },
    },
    cssCodeSplit: true,
    sourcemap: true,
  },
})
