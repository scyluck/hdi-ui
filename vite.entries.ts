import { resolve } from 'node:path'
import { existsSync, readdirSync } from 'node:fs'

const iconDir = resolve(__dirname, 'src/icons/components')

function buildIconEntries(): Record<string, string> {
  const entries: Record<string, string> = {
    index: resolve(__dirname, 'src/index.ts'),
    'icons/index': resolve(__dirname, 'src/icons/index.ts'),
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
