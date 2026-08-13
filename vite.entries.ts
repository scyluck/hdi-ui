import { resolve } from 'node:path'

function buildIconEntries(): Record<string, string> {
  return {
    index: resolve(__dirname, 'src/index.ts'),
    'icons/index': resolve(__dirname, 'src/icons/index.ts'),
    'resolvers/index': resolve(__dirname, 'src/resolvers/index.ts'),
    'resolvers/vite': resolve(__dirname, 'src/resolvers/vite.ts'),
  }
}

export { buildIconEntries }
