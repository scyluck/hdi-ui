import assert from 'node:assert/strict'
import test from 'node:test'
import { hdiUiDirectivesPlugin } from '../src/resolvers/directives-plugin'

function transformMain(code: string): string {
  const plugin = hdiUiDirectivesPlugin()
  const transform = plugin.transform
  assert.equal(typeof transform, 'function')
  const result = transform.call(plugin, code, '/project/src/main.ts')
  assert.ok(result && typeof result !== 'string')
  return result.code
}

test('directives plugin injects from the directives subpath for an assigned app', () => {
  const output = transformMain("import { createApp } from 'vue'\nconst app = createApp(App)\napp.mount('#app')")

  assert.match(output, /import \{ registerDirectives \} from 'hdi-ui\/directives'/)
  assert.match(output, /const app = createApp\(App\)\nregisterDirectives\(app\)/)
})

test('directives plugin rewrites a chained createApp call only once', () => {
  const output = transformMain("import { createApp } from 'vue'\ncreateApp(App).use(router).mount('#app')")

  assert.match(output, /const app = createApp\(App\)\nregisterDirectives\(app\)\napp\.use\(router\)/)
  assert.equal((output.match(/registerDirectives\(app\)/g) || []).length, 1)
})
