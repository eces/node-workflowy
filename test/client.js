require('debugs/init')
const assert = require('chai').assert
const debug = require('debug')('node-workflowy:test')

const Workflowy = require('../index.js')

describe('node-workflowy', () => {
  describe('findUrl', () => {
    const wf = new Workflowy
    it('fail with invalid url', async () => {
      let e = null
      try {
        await wf.findUrl(null)
      } catch (error) {
        e = error
      }
      assert.instanceOf(e, Error)
    })
    it('success with shared viewable secret url', async () => {
      const list = await wf.findUrl('https://workflowy.com/s/Npp.UIArYtyUcn')
      debug(JSON.stringify(list, null, '  '))
      assert.instanceOf(list, Workflowy.WorkflowyList)

      const check = function (item) {
        assert.property(item, 'id')
        assert.isString(item.id)
        assert.property(item, 'name')
        assert.property(item, 'note')
        assert.property(item, 'children')
        assert.isArray(item.children)
        item.children.forEach(check)
      }

      check(list)
    }).timeout(9000)
  })
})