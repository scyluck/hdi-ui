/**
 * 将 UMD 产物同步到 cdn/ 目录
 * 业务 HTML 页面通过 Gitee raw 地址引用 cdn/ 下的文件
 * cdn/ 目录需要提交到 Gitee（但 .gitignore 排除 dist/）
 */
import { mkdirSync, copyFileSync, existsSync } from 'node:fs'
import { resolve, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = resolve(fileURLToPath(import.meta.url), '..')
const ROOT = resolve(__dirname, '..')

const files = [
  {
    src: resolve(ROOT, 'dist/hdi-ui.umd.js'),
    dest: resolve(ROOT, 'cdn/hdi-ui.umd.js'),
  },
  {
    src: resolve(ROOT, 'dist/icons/hdi-icons.umd.js'),
    dest: resolve(ROOT, 'cdn/hdi-icons.umd.js'),
  },
]

for (const { src, dest } of files) {
  const rel = relative(ROOT, dest).replace(/\\/g, '/')
  if (!existsSync(src)) {
    console.warn(`[sync:cdn] 源文件不存在，跳过: ${relative(ROOT, src)}`)
    continue
  }
  mkdirSync(resolve(dest, '..'), { recursive: true })
  copyFileSync(src, dest)
  console.log(`[sync:cdn] ✓ ${rel}`)
}

console.log('[sync:cdn] 完成，请将 cdn/ 目录提交到 Gitee')
