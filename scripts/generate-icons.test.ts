import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, readFileSync, rmSync, statSync, unlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { afterEach, test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { generateDocsIconsData } from './generate-docs-icons-data.mjs'
import { generateIcons } from './generate-icons'
import { HdiUiResolver } from '../src/resolvers'

const temporaryRoots: string[] = []
const svg = (path: string) => `<svg viewBox="0 0 24 24"><path fill="#000" d="${path}"/></svg>`

function createFixture(files: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), 'hdi-ui-icons-'))
  temporaryRoots.push(root)
  const svgDir = join(root, 'src/icons/svg')
  mkdirSync(svgDir, { recursive: true })
  for (const [file, content] of Object.entries(files)) {
    writeFileSync(join(svgDir, file), content, 'utf-8')
  }
  return root
}

function mtime(file: string): number {
  return statSync(file).mtimeMs
}

afterEach(() => {
  for (const root of temporaryRoots.splice(0)) {
    rmSync(root, { recursive: true, force: true })
  }
})

test('incremental generation leaves every unchanged output untouched', async () => {
  const root = createFixture({
    'z-last.svg': svg('M2 2h4v4z'),
    'a-first.svg': svg('M1 1h2v2z'),
  })
  const first = generateIcons(root)
  const firstDocs = generateDocsIconsData(root)
  assert.equal(first.generated, 2)
  assert.equal(firstDocs.changed, true)

  const outputs = [
    'src/icons/components/IconAFirst.vue',
    'src/icons/components/IconZLast.vue',
    'src/icons/index.ts',
    'src/icons/bundle.ts',
    'src/index.umd.ts',
    'src/resolvers/icons.generated.ts',
    'src/icons/.generated-manifest.json',
    'docs/public/icons-data.json',
  ].map((file) => join(root, file))
  const mtimes = new Map(outputs.map((file) => [file, mtime(file)]))
  await new Promise((resolve) => setTimeout(resolve, 20))

  const second = generateIcons(root)
  const secondDocs = generateDocsIconsData(root)
  assert.deepEqual(second, {
    total: 2,
    generated: 0,
    unchanged: 2,
    removed: 0,
    writtenFiles: 0,
  })
  assert.equal(secondDocs.changed, false)
  for (const file of outputs) assert.equal(mtime(file), mtimes.get(file), file)

  const index = readFileSync(join(root, 'src/icons/index.ts'), 'utf-8')
  assert.ok(index.indexOf('IconAFirst') < index.indexOf('IconZLast'))
})

test('only changed, tampered, added, and removed icons are regenerated', () => {
  const root = createFixture({
    'a.svg': svg('M1 1h2v2z'),
    'b.svg': svg('M2 2h3v3z'),
  })
  generateIcons(root)
  const iconA = join(root, 'src/icons/components/IconA.vue')
  const iconB = join(root, 'src/icons/components/IconB.vue')
  const iconBBefore = readFileSync(iconB, 'utf-8')

  writeFileSync(join(root, 'src/icons/svg/a.svg'), svg('M4 4h5v5z'), 'utf-8')
  const changed = generateIcons(root)
  assert.equal(changed.generated, 1)
  assert.equal(changed.unchanged, 1)
  assert.equal(readFileSync(iconB, 'utf-8'), iconBBefore)

  writeFileSync(iconB, 'tampered', 'utf-8')
  const repaired = generateIcons(root)
  assert.equal(repaired.generated, 1)
  assert.equal(readFileSync(iconB, 'utf-8'), iconBBefore)

  unlinkSync(join(root, 'src/icons/svg/a.svg'))
  writeFileSync(join(root, 'src/icons/svg/c.svg'), svg('M6 6h7v7z'), 'utf-8')
  const replaced = generateIcons(root)
  assert.equal(replaced.removed, 1)
  assert.throws(() => statSync(iconA))
  assert.doesNotThrow(() => statSync(join(root, 'src/icons/components/IconC.vue')))
  const index = readFileSync(join(root, 'src/icons/index.ts'), 'utf-8')
  assert.doesNotMatch(index, /IconA/)
  assert.match(index, /IconC/)
})

test('component name collisions fail before generating files', () => {
  const root = createFixture({
    'same-中文.svg': svg('M1 1h2v2z'),
    'same-英文.svg': svg('M2 2h3v3z'),
  })
  assert.throws(() => generateIcons(root), /组件名冲突.*IconSame/)
})

test('resolver imports icons from their direct default-export subpath', async () => {
  const resolver = HdiUiResolver() as { resolve: (name: string) => unknown }
  assert.deepEqual(await resolver.resolve('Icon90Add'), {
    from: 'hdi-ui/icons/Icon90Add',
  })
  assert.deepEqual(await resolver.resolve('HdiIcon'), {
    name: 'HdiIcon',
    from: 'hdi-ui',
    sideEffects: undefined,
  })
  assert.equal(await resolver.resolve('UnknownComponent'), undefined)

  const withoutIcons = HdiUiResolver({ importIcons: false }) as {
    resolve: (name: string) => unknown
  }
  assert.equal(await withoutIcons.resolve('Icon90Add'), undefined)

  const excluded = HdiUiResolver({ exclude: ['Icon90Add'] }) as {
    resolve: (name: string) => unknown
  }
  assert.equal(await excluded.resolve('Icon90Add'), undefined)
})

test('package exports map direct icon imports to emitted runtime and declaration files', () => {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
  const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf-8'))
  assert.deepEqual(packageJson.exports['./icons/*'], {
    types: './dist/icons/components/*.vue.d.ts',
    import: './dist/icons/components/*.js',
    require: './dist/icons/components/*.cjs',
  })
})
