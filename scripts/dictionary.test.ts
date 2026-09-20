import assert from 'node:assert/strict'
import test from 'node:test'
import { createDictionaryStore } from '../src/components/Dictionary/useDictionary'
import { getTableCellDisplay } from '../src/components/Table/utils'

function deferred<T>() {
  let resolve!: (value: T) => void
  let reject!: (reason?: unknown) => void
  const promise = new Promise<T>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise
    reject = rejectPromise
  })
  return { promise, resolve, reject }
}

test('reuses a pending request and cached dictionary data', async () => {
  let calls = 0
  const pending = deferred<{ label: string, value: string }[]>()
  const store = createDictionaryStore({
    fetcher: () => {
      calls += 1
      return pending.promise
    },
  })

  const first = store.load('status')
  const second = store.load('status')
  assert.equal(calls, 0)
  await Promise.resolve()
  assert.equal(calls, 1)

  pending.resolve([{ label: 'Enabled', value: 'enabled' }])
  assert.deepEqual(await first, [{ label: 'Enabled', value: 'enabled' }])
  assert.deepEqual(await second, [{ label: 'Enabled', value: 'enabled' }])
  assert.deepEqual(await store.load('status'), [{ label: 'Enabled', value: 'enabled' }])
  assert.equal(calls, 1)
})

test('clear and force refresh ignore stale requests', async () => {
  const first = deferred<{ label: string, value: string }[]>()
  const second = deferred<{ label: string, value: string }[]>()
  let calls = 0
  const store = createDictionaryStore({
    fetcher: () => (++calls === 1 ? first.promise : second.promise),
  })

  const stale = store.load('status')
  await Promise.resolve()
  store.clear('status')
  const fresh = store.load('status')
  await Promise.resolve()

  first.resolve([{ label: 'Old', value: 'old' }])
  await stale
  assert.deepEqual(store.getItems('status'), [])

  second.resolve([{ label: 'New', value: 'new' }])
  assert.deepEqual(await fresh, [{ label: 'New', value: 'new' }])
  assert.equal(store.getItem('status', 'new')?.label, 'New')
})

test('evicts inactive least-recently-used entries and resolves enum labels through the store', async () => {
  const store = createDictionaryStore({
    maxEntries: 1,
    fetcher: async (name) => [{ label: name.toUpperCase(), value: name }],
  })

  await store.load('first')
  await store.load('second')

  assert.deepEqual(store.getItems('first'), [])
  assert.equal(store.getItem('second', 'second')?.label, 'SECOND')
  assert.equal(
    getTableCellDisplay({ type: 'select', prop: 'status', options: 'second', tableCellType: 'ENUM' }, { status: 'second' }, store),
    'SECOND',
  )
})

test('rejects invalid cache configuration', () => {
  assert.throws(() => createDictionaryStore({ fetcher: async () => [], maxEntries: 0 }), RangeError)
  assert.throws(() => createDictionaryStore({ fetcher: async () => [], ttl: -1 }), RangeError)
})
