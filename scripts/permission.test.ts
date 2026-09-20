import assert from 'node:assert/strict'
import test from 'node:test'
import {
  clearPermissionUtils,
  hasPermission,
  permissionVersion,
  setPermissionUtils,
  setPermissions,
} from '../src/directives/permission'

test('setPermissions enables permission checks and notifies reactive consumers', () => {
  const initialVersion = permissionVersion.value
  assert.equal(hasPermission('user:add'), true)

  setPermissions([])
  assert.equal(permissionVersion.value, initialVersion + 1)
  assert.equal(hasPermission('user:add'), false)
  assert.equal(hasPermission('user:add', 'not'), true)

  setPermissions(['user:add'])
  assert.equal(hasPermission('user:add'), true)
  assert.equal(hasPermission(['user:add', 'user:edit']), false)
})

test('clearing permissions revokes access while custom checkers remain reactive', () => {
  clearPermissionUtils()
  assert.equal(hasPermission('user:add'), false)

  setPermissionUtils({ has: (value) => value === 'user:admin' })
  assert.equal(hasPermission('user:admin'), true)
  assert.equal(hasPermission('user:add'), false)

  clearPermissionUtils()
})
