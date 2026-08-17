import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { basename, dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const COMP_DIR = join(ROOT, 'src/icons/components')
const OUT_DIR = join(ROOT, 'docs/public')
const OUT_FILE = join(OUT_DIR, 'icons-data.json')

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

const files = readdirSync(COMP_DIR).filter((f) => f.endsWith('.vue'))
const entries = files.map((f) => {
  const content = readFileSync(join(COMP_DIR, f), 'utf-8')
  const name = basename(f, '.vue')
  const { viewBox, inner } = extractFromVue(content)
  return { name, viewBox, inner, group: getGroup(name) }
})

// 按分组排序，组内按名称排序
entries.sort((a, b) => {
  const dg = groupSortKey(a.group) - groupSortKey(b.group)
  if (dg !== 0) return dg
  return a.name.localeCompare(b.name)
})

mkdirSync(OUT_DIR, { recursive: true })
writeFileSync(OUT_FILE, JSON.stringify(entries, null, 0), 'utf-8')

// 打印分组统计
const stats = {}
for (const e of entries) {
  stats[e.group] = (stats[e.group] || 0) + 1
}
const summary = Object.entries(stats)
  .sort((a, b) => groupSortKey(a[0]) - groupSortKey(b[0]))
  .map(([g, n]) => `${g}系列:${n}`)
  .join('  ')
console.log(`[docs:icons-data] 从组件目录生成 ${entries.length} 个图标 → ${OUT_FILE}`)
console.log(`[docs:icons-data] ${summary}`)
