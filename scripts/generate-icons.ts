import { mkdirSync, readdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import { basename, dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { optimize, type PluginConfig } from 'svgo'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const SVG_DIR = join(ROOT, 'src/icons/svg')
const OUTPUT_DIR = join(ROOT, 'src/icons/components')

/** 将 kebab-case / snake_case 转为 PascalCase，并加上 Icon 前缀 */
function toComponentName(fileName: string): string {
  const base = basename(fileName, '.svg')
  const pascal = base
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('')
  return `Icon${pascal}`
}

/** SVGO 插件：去除硬编码颜色，统一为 currentColor */
const decolorizePlugins: PluginConfig[] = [
  {
    name: 'preset-default',
    params: {
      overrides: {
        removeViewBox: false,
        removeUnknownsAndDefaults: {
          keepDataAttrs: false,
        },
      },
    },
  },
  {
    name: 'removeAttrs',
    params: {
      attrs: ['fill', 'stroke', 'class', 'style', 'data-name', 'id'],
    },
  },
  {
    name: 'addAttributesToSVGElement',
    params: {
      attributes: [{ fill: 'currentColor' }],
    },
  },
]

function extractSvgInner(svg: string): { viewBox: string; inner: string } {
  const viewBoxMatch = svg.match(/viewBox="([^"]+)"/)
  const viewBox = viewBoxMatch?.[1] ?? '0 0 24 24'

  const inner = svg
    .replace(/<\?xml[^?]*\?>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '')
    .trim()

  return { viewBox, inner }
}

function generateVueComponent(name: string, viewBox: string, inner: string): string {
  return `<template>
  <IconBase :size="size" :color="color" view-box="${viewBox}" v-bind="$attrs">
${inner
  .split('\n')
  .map((line) => (line ? `    ${line}` : line))
  .join('\n')}
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: '${name}' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
`
}

function generateIndex(components: string[]): string {
  const exports = components
    .map((name) => `export { default as ${name} } from './components/${name}.vue'`)
    .join('\n')

  return `/**
 * 图标组件统一导出
 * 按需引入示例: import { IconHome } from 'hdi-ui/icons'
 * 或: import IconHome from 'hdi-ui/icons/IconHome'
 */
${exports}

export type { IconProps } from '../components/Icon/types'
`
}

function generateResolverTypes(components: string[]): string {
  const sorted = [...components].sort()
  const names = sorted.map((name) => `  '${name}',`).join('\n')
  return `/** 自动生成，请勿手动修改。运行 npm run generate:icons 更新 */
export const HDI_ICON_NAMES = [
${names}
] as const

export type HdiIconName = (typeof HDI_ICON_NAMES)[number]

export const HDI_ICON_NAME_SET = new Set<string>(HDI_ICON_NAMES)
`
}

/**
 * 生成 UMD 打包入口 bundle.ts
 * 该入口聚合所有图标组件 + IconBase + HdiIcon，并提供 install 方法注册全局组件。
 * 通过 vite.icons.umd.config.ts 打包成单文件 UMD，供无构建工具的 HTML 页面使用。
 *
 * 注意：不使用默认导出，只使用命名导出。这样 UMD 全局变量 HdiIcons 本身就是
 * 带 install 方法的对象，HTML 页面可直接 app.use(HdiIcons) 注册全部图标组件。
 *
 * 使用示例（HTML 页面）:
 *   <script src="https://unpkg.com/vue@3"></script>
 *   <script src="/path/to/hdi-icons.umd.js"></script>
 *   <script>
 *     const app = Vue.createApp({})
 *     app.use(HdiIcons)        // 注册全部图标为全局组件
 *     app.mount('#app')
 *   </script>
 *   <!-- 模板中直接使用: <Icon80Add :size="24" color="#409eff" /> -->
 */
function generateUmdBundle(components: string[]): string {
  const imports = components
    .map((name) => `import ${name} from './components/${name}.vue'`)
    .join('\n')
  const names = components.join(', ')
  const entries = components
    .map((name) => `  ${name},`)
    .join('\n')

  return `/**
 * UMD 打包入口 - 供 HTML 页面通过 CDN 引入 Vue 后使用
 * 由 generate-icons.ts 自动生成，请勿手动修改
 *
 * UMD 全局变量 HdiIcons 结构: { install, IconBase, HdiIcon, Icon80Add, ... }
 * app.use(HdiIcons) 会调用 install 注册全部图标组件
 */
import type { App } from 'vue'
import IconBase from '../components/Icon/IconBase.vue'
import HdiIcon from '../components/Icon/Icon.vue'
${imports}

const components = {
  IconBase,
  HdiIcon,
${entries}
}

function install(app: App) {
  const toKebab = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
  for (const [name, comp] of Object.entries(components)) {
    app.component(name, comp as never)
    // HTML CDN 场景下浏览器用 kebab-case 标签名，需注册 kebab-case 别名
    app.component(toKebab(name), comp as never)
  }
}

export { install, IconBase, HdiIcon, ${names} }
export type { IconProps } from '../components/Icon/types'
`
}

/**
 * 生成全量 UMD 打包入口 index.umd.ts
 * 该入口聚合所有业务组件（HdiIcon/HdiDictionary/HdiForm/HdiTable）+ 图标组件 + 指令，
 * 并提供 install 方法注册全局组件和指令。
 * 通过 vite.full.umd.config.ts 打包成单文件 UMD，供无构建工具的 HTML 页面使用。
 * Vue / Element Plus / @element-plus/icons-vue 作为 external，运行时通过 CDN 全局变量获取。
 *
 * 注意：不使用默认导出，只使用命名导出。这样 UMD 全局变量 HdiUi 本身就是
 * 带 install 方法的对象，HTML 页面可直接 app.use(HdiUi) 注册全部组件和指令。
 *
 * 使用示例（HTML 页面）:
 *   <script src="https://unpkg.com/vue@3"></script>
 *   <script src="https://unpkg.com/element-plus"></script>
 *   <script src="/path/to/hdi-ui.umd.js"></script>
 *   <script>
 *     const app = Vue.createApp({})
 *     app.use(ElementPlus)   // 先注册 Element Plus
 *     app.use(HdiUi)         // 再注册 HdiUi 全部组件
 *     app.mount('#app')
 *   </script>
 *   <!-- 模板中直接使用: <HdiTable /> <HdiForm /> <Icon80Add /> 等 -->
 */
function generateFullUmdEntry(icons: string[]): string {
  const iconImports = icons
    .map((name) => `import ${name} from './icons/components/${name}.vue'`)
    .join('\n')
  const iconLines = icons.map((name) => `  ${name},`).join('\n')

  return `/**
 * 全量 UMD 打包入口 - 供 HTML 页面通过 CDN 引入 Vue + Element Plus 后使用
 * 由 generate-icons.ts 自动生成，请勿手动修改
 *
 * UMD 全局变量 HdiUi 结构: { install, HdiIcon, HdiDictionary, HdiForm, HdiTable, Icon80Add, ... }
 * app.use(HdiUi) 会调用 install 注册全部组件和指令
 */
import type { App } from 'vue'
import { HdiIcon, IconBase } from './components/Icon'
import { HdiDictionary, provideDictionary, useDictionary } from './components/Dictionary'
import { HdiForm } from './components/Form'
import { HdiTable } from './components/Table'
import { registerDirectives, setPermissionUtils, clearPermissionUtils } from './directives'
${iconImports}

const components = {
  HdiIcon,
  IconBase,
  HdiDictionary,
  HdiForm,
  HdiTable,
${iconLines}
}

export interface HdiUiInstallOptions {
  /** 是否注册全局指令，默认 true */
  registerDirectives?: boolean
}

function install(app: App, options: HdiUiInstallOptions = {}) {
  const toKebab = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
  for (const [name, comp] of Object.entries(components)) {
    app.component(name, comp as never)
    // HTML CDN 场景下浏览器用 kebab-case 标签名，需注册 kebab-case 别名
    app.component(toKebab(name), comp as never)
  }
  if (options.registerDirectives !== false) {
    registerDirectives(app)
  }
}

export {
  install,
  HdiIcon,
  IconBase,
  HdiDictionary,
  HdiForm,
  HdiTable,
  provideDictionary,
  useDictionary,
  setPermissionUtils,
  clearPermissionUtils,
${iconLines}
}
`
}

function main() {
  mkdirSync(SVG_DIR, { recursive: true })
  mkdirSync(OUTPUT_DIR, { recursive: true })

  const svgFiles = readdirSync(SVG_DIR).filter((f) => f.endsWith('.svg'))
  if (svgFiles.length === 0) {
    console.warn('[generate-icons] 未找到 SVG 文件，请将 SVG 放入 src/icons/svg/')
    writeFileSync(join(ROOT, 'src/icons/index.ts'), generateIndex([]))
    writeFileSync(join(ROOT, 'src/icons/bundle.ts'), generateUmdBundle([]))
    writeFileSync(join(ROOT, 'src/index.umd.ts'), generateFullUmdEntry([]))
    writeFileSync(join(ROOT, 'src/resolvers/icons.generated.ts'), generateResolverTypes([]))
    return
  }

  // 清空旧组件，避免残留
  for (const file of readdirSync(OUTPUT_DIR)) {
    if (file.endsWith('.vue')) {
      rmSync(join(OUTPUT_DIR, file))
    }
  }

  const componentNames: string[] = []

  for (const file of svgFiles) {
    const raw = readFileSync(join(SVG_DIR, file), 'utf-8')
    const result = optimize(raw, {
      multipass: true,
      plugins: decolorizePlugins,
    })

    const { viewBox, inner } = extractSvgInner(result.data)
    const componentName = toComponentName(file)
    componentNames.push(componentName)

    const vueContent = generateVueComponent(componentName, viewBox, inner)
    writeFileSync(join(OUTPUT_DIR, `${componentName}.vue`), vueContent, 'utf-8')
    console.log(`[generate-icons] ✓ ${file} → ${componentName}.vue`)
  }

  writeFileSync(join(ROOT, 'src/icons/index.ts'), generateIndex(componentNames), 'utf-8')
  writeFileSync(join(ROOT, 'src/icons/bundle.ts'), generateUmdBundle(componentNames), 'utf-8')
  writeFileSync(join(ROOT, 'src/index.umd.ts'), generateFullUmdEntry(componentNames), 'utf-8')
  writeFileSync(join(ROOT, 'src/resolvers/icons.generated.ts'), generateResolverTypes(componentNames), 'utf-8')
  console.log(`[generate-icons] 完成，共生成 ${componentNames.length} 个图标组件`)
}

main()
