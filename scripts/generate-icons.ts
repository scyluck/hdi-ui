import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import { basename, dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { optimize, type PluginConfig } from 'svgo'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const GENERATOR_VERSION = 1

interface ManifestEntry {
  sourceHash: string
  componentName: string
  outputHash: string
}

interface IconManifest {
  version: number
  icons: Record<string, ManifestEntry>
}

export interface GenerateIconsResult {
  total: number
  generated: number
  unchanged: number
  removed: number
  writtenFiles: number
}

function hash(content: string): string {
  return createHash('sha256').update(content).digest('hex')
}

function readManifest(file: string): IconManifest | undefined {
  if (!existsSync(file)) return undefined

  try {
    const manifest = JSON.parse(readFileSync(file, 'utf-8')) as IconManifest
    if (manifest.version !== GENERATOR_VERSION || !manifest.icons) return undefined
    return manifest
  } catch {
    return undefined
  }
}

function writeFileIfChanged(file: string, content: string): boolean {
  if (existsSync(file) && readFileSync(file, 'utf-8') === content) return false
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, content, 'utf-8')
  return true
}

/** 将文件名转为 PascalCase，并加上 Icon 前缀
 *  - 去除中文字符及之后的所有内容（如 "90-add-添加" → "90-add"）
 *  - 按 - _ 空格 分割并转 PascalCase
 */
export function toComponentName(fileName: string): string {
  const base = basename(fileName, '.svg')
  // 去除中文字符及之后的所有字符
  const englishPart = base.replace(/[\u4e00-\u9fa5].*$/, '')
  const pascal = englishPart
    .split(/[-_\s]/)
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
import { toKebabName } from '../utils/kebab'
${imports}

const components = {
  IconBase,
  HdiIcon,
${entries}
}

function install(app: App) {
  for (const [name, comp] of Object.entries(components)) {
    app.component(name, comp as never)
    // HTML CDN 场景下浏览器用 kebab-case 标签名，需注册 kebab-case 别名
    app.component(toKebabName(name), comp as never)
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
import { toKebabName } from './utils/kebab'
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
  for (const [name, comp] of Object.entries(components)) {
    app.component(name, comp as never)
    // HTML CDN 场景下浏览器用 kebab-case 标签名，需注册 kebab-case 别名
    app.component(toKebabName(name), comp as never)
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

export function generateIcons(root = ROOT): GenerateIconsResult {
  const svgDir = join(root, 'src/icons/svg')
  const outputDir = join(root, 'src/icons/components')
  const manifestFile = join(root, 'src/icons/.generated-manifest.json')
  mkdirSync(svgDir, { recursive: true })
  mkdirSync(outputDir, { recursive: true })

  const svgFiles = readdirSync(svgDir)
    .filter((file) => file.endsWith('.svg'))
    .sort((a, b) => a.localeCompare(b, 'en'))
  const componentNames = svgFiles.map(toComponentName)
  const owners = new Map<string, string>()

  for (let index = 0; index < svgFiles.length; index += 1) {
    const file = svgFiles[index]
    const componentName = componentNames[index]
    const previous = owners.get(componentName)
    if (previous) {
      throw new Error(
        `[generate-icons] 组件名冲突: ${previous} 和 ${file} 都会生成 ${componentName}`,
      )
    }
    owners.set(componentName, file)
  }

  if (svgFiles.length === 0) {
    console.warn('[generate-icons] 未找到 SVG 文件，请将 SVG 放入 src/icons/svg/')
  }

  const previousManifest = readManifest(manifestFile)
  const nextManifest: IconManifest = { version: GENERATOR_VERSION, icons: {} }
  let generated = 0
  let unchanged = 0
  let removed = 0
  let writtenFiles = 0

  for (let index = 0; index < svgFiles.length; index += 1) {
    const file = svgFiles[index]
    const componentName = componentNames[index]
    const raw = readFileSync(join(svgDir, file), 'utf-8')
    const sourceHash = hash(raw)
    const componentFile = join(outputDir, `${componentName}.vue`)
    const previous = previousManifest?.icons[file]
    const existing = existsSync(componentFile) ? readFileSync(componentFile, 'utf-8') : undefined

    if (
      previous
      && previous.sourceHash === sourceHash
      && previous.componentName === componentName
      && existing !== undefined
      && hash(existing) === previous.outputHash
    ) {
      nextManifest.icons[file] = previous
      unchanged += 1
      continue
    }

    const result = optimize(raw, {
      multipass: true,
      plugins: decolorizePlugins,
    })
    const { viewBox, inner } = extractSvgInner(result.data)
    const vueContent = generateVueComponent(componentName, viewBox, inner)
    if (writeFileIfChanged(componentFile, vueContent)) writtenFiles += 1
    nextManifest.icons[file] = {
      sourceHash,
      componentName,
      outputHash: hash(vueContent),
    }
    generated += 1
  }

  const expectedComponents = new Set(componentNames)
  for (const file of readdirSync(outputDir)) {
    if (!file.endsWith('.vue')) continue
    if (expectedComponents.has(basename(file, '.vue'))) continue
    rmSync(join(outputDir, file))
    removed += 1
  }

  const generatedFiles: Array<[string, string]> = [
    [join(root, 'src/icons/index.ts'), generateIndex(componentNames)],
    [join(root, 'src/icons/bundle.ts'), generateUmdBundle(componentNames)],
    [join(root, 'src/index.umd.ts'), generateFullUmdEntry(componentNames)],
    [join(root, 'src/resolvers/icons.generated.ts'), generateResolverTypes(componentNames)],
    [manifestFile, `${JSON.stringify(nextManifest, null, 2)}\n`],
  ]
  for (const [file, content] of generatedFiles) {
    if (writeFileIfChanged(file, content)) writtenFiles += 1
  }

  console.log(
    `[generate-icons] 完成: 共 ${svgFiles.length} 个，生成/校验 ${generated} 个，命中缓存 ${unchanged} 个，删除 ${removed} 个`,
  )
  return { total: svgFiles.length, generated, unchanged, removed, writtenFiles }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  generateIcons()
}
