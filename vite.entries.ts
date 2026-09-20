import { resolve } from 'node:path'
import { existsSync, readdirSync } from 'node:fs'

const iconDir = resolve(__dirname, 'src/icons/components')

function buildIconEntries(): Record<string, string> {
  const entries: Record<string, string> = {
    index: resolve(__dirname, 'src/index.ts'),
    'components/Icon': resolve(__dirname, 'src/components/Icon/index.ts'),
    'components/Dictionary': resolve(__dirname, 'src/components/Dictionary/index.ts'),
    'components/Form': resolve(__dirname, 'src/components/Form/index.ts'),
    'components/FormDialog': resolve(__dirname, 'src/components/FormDialog/index.ts'),
    'components/Permission': resolve(__dirname, 'src/components/Permission/index.ts'),
    'components/Table': resolve(__dirname, 'src/components/Table/index.ts'),
    'components/CardList': resolve(__dirname, 'src/components/CardList/index.ts'),
    'components/InfiniteScroll': resolve(__dirname, 'src/components/InfiniteScroll/index.ts'),
    'icons/index': resolve(__dirname, 'src/icons/index.ts'),
    directives: resolve(__dirname, 'src/directives/index.ts'),
    utils: resolve(__dirname, 'src/utils/index.ts'),
    'resolvers/index': resolve(__dirname, 'src/resolvers/index.ts'),
    'resolvers/vite': resolve(__dirname, 'src/resolvers/vite.ts'),
  }

  if (!existsSync(iconDir)) return entries

  const iconComponents = readdirSync(iconDir)
    .filter((file) => file.endsWith('.vue'))
    .map((file) => file.replace('.vue', ''))

  for (const name of iconComponents) {
    entries[`icons/components/${name}`] = resolve(
      __dirname,
      `src/icons/components/${name}.vue`,
    )
  }

  return entries
}

export { buildIconEntries }
