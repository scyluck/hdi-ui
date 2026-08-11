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

function main() {
  mkdirSync(SVG_DIR, { recursive: true })
  mkdirSync(OUTPUT_DIR, { recursive: true })

  const svgFiles = readdirSync(SVG_DIR).filter((f) => f.endsWith('.svg'))
  if (svgFiles.length === 0) {
    console.warn('[generate-icons] 未找到 SVG 文件，请将 SVG 放入 src/icons/svg/')
    writeFileSync(join(ROOT, 'src/icons/index.ts'), generateIndex([]))
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
  writeFileSync(join(ROOT, 'src/resolvers/icons.generated.ts'), generateResolverTypes(componentNames), 'utf-8')
  console.log(`[generate-icons] 完成，共生成 ${componentNames.length} 个图标组件`)
}

main()
