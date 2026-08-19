import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { basename, dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
/** 从组件名提取分组：Icon90Add → "90"，IconCustomAnimal → "custom" */
function getGroup(name) {
  if (name.startsWith('IconCustom')) return 'custom'
  const m = name.match(/^Icon(\d+)/)
  return m ? m[1] : 'other'
}

/** 分组排序：60 → 80 → 90 → custom → other */
const GROUP_ORDER = ['60', '80', '90', 'custom', 'other']
function groupSortKey(g) {
  const i = GROUP_ORDER.indexOf(g)
  return i === -1 ? GROUP_ORDER.length : i
}

/** 从 .vue 文件内容中提取 viewBox 和 SVG inner HTML */
function extractFromVue(content) {
  const v = content.match(/view-box="([^"]+)"/)
  const viewBox = v?.[1] ?? '0 0 24 24'

  const m = content.match(/<IconBase[^>]*>([\s\S]*?)<\/IconBase>/)
  const inner = m?.[1]?.replace(/^\s+/, '').replace(/\s+$/, '') ?? ''

  return { viewBox, inner }
}

export function generateDocsIconsData(root = ROOT) {
  const componentDir = join(root, 'src/icons/components')
  const outputDir = join(root, 'docs/public')
  const outputFile = join(outputDir, 'icons-data.json')
  const files = readdirSync(componentDir)
    .filter((file) => file.endsWith('.vue'))
    .sort((a, b) => a.localeCompare(b, 'en'))
  const entries = files.map((file) => {
    const content = readFileSync(join(componentDir, file), 'utf-8')
    const name = basename(file, '.vue')
    const { viewBox, inner } = extractFromVue(content)
    return { name, viewBox, inner, group: getGroup(name) }
  })

  entries.sort((a, b) => {
    const groupDifference = groupSortKey(a.group) - groupSortKey(b.group)
    if (groupDifference !== 0) return groupDifference
    return a.name.localeCompare(b.name, 'en')
  })

  mkdirSync(outputDir, { recursive: true })
  const content = JSON.stringify(entries)
  const changed = !existsSync(outputFile) || readFileSync(outputFile, 'utf-8') !== content
  if (changed) writeFileSync(outputFile, content, 'utf-8')

  const stats = {}
  for (const entry of entries) {
    stats[entry.group] = (stats[entry.group] || 0) + 1
  }
  const summary = Object.entries(stats)
    .sort((a, b) => groupSortKey(a[0]) - groupSortKey(b[0]))
    .map(([group, count]) => `${group}系列:${count}`)
    .join('  ')
  console.log(`[docs:icons-data] ${changed ? '更新' : '未变化'} ${entries.length} 个图标 → ${outputFile}`)
  console.log(`[docs:icons-data] ${summary}`)
  return { entries, changed, outputFile }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  generateDocsIconsData()
}
