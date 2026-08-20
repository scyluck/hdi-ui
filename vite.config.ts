import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import { buildIconEntries } from './vite.entries'

export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    libInjectCss(),
    dts({
      include: ['src'],
      exclude: ['src/index.umd.ts', 'src/icons/bundle.ts'],
      outDir: 'dist',
      rollupTypes: false,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    emptyOutDir: false,
    lib: {
      entry: buildIconEntries(),
    },
    rollupOptions: {
      external: (id) => {
          if (id.startsWith('.') || id.startsWith('/')) return false
          if (/^[a-zA-Z]:[\\/]/.test(id)) return false
          return true
        },
      output: [
        {
          format: 'es',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].js',
          chunkFileNames: '[name].js',
          assetFileNames: '[name][extname]',
        },
        {
          format: 'cjs',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].cjs',
          chunkFileNames: '[name].cjs',
          assetFileNames: '[name][extname]',
        },
      ],
    },
    cssCodeSplit: true,
    sourcemap: mode === 'release',
  },
}))
