import test from 'ava'
import sinon from 'sinon'

import {
  getAcronyms,
  createAcronyms,
  updateAcronyms,
  deleteAcronyms
} from '../../controllers/acronym'
import * as queries from '../../db/queries/acronym'

const acronym = {
  acronym: 'WTFF',
  definition: 'What The Fucking Fuck'
}

test.serial('GETACRONYMS/should return status 404, x total count 0 and x has next false if acronyms are not found', async t => {
  const stub_get = sinon.stub(queries, 'get').returns(Promise.resolve([]))
  const stub_count = sinon.stub(queries, 'count').returns(0)
  const {
    body,
    status,
    'X-Total-Count': XTotalCount,
    'X-Has-Next': XHasNext
  } = await getAcronyms('WTFF', 0, 10)
  t.deepEqual(body, [])
  t.is(status, 404)
  t.is(XTotalCount, 0)
  t.is(XHasNext, false)
  stub_get.restore()
  stub_count.restore()
})

test.serial('GETACRONYMS/should return status 200, x total count the total and x has next true if there are more acronyms to show', async t => {
  const stub_get = sinon.stub(queries, 'get').returns(Promise.resolve([acronym]))
  const stub_count = sinon.stub(queries, 'count').returns(20)
  const {
    body,
    status,
    'X-Total-Count': XTotalCount,
    'X-Has-Next': XHasNext
  } = await getAcronyms('WTFF', 0, 1)
  t.deepEqual(body, [acronym])
  t.is(status, 200)
  t.is(XTotalCount, 20)
  t.is(XHasNext, true)
  stub_get.restore()
  stub_count.restore()
})

test.serial('GETACRONYMS/should return status 200, x total count the total and x has next false if there aren\'t more acronyms to show', async t => {
  const stub_get = sinon.stub(queries, 'get').returns(Promise.resolve([acronym]))
  const stub_count = sinon.stub(queries, 'count').returns(1)
  const {
    body,
    status,
    'X-Total-Count': XTotalCount,
    'X-Has-Next': XHasNext
  } = await getAcronyms('WTFF', 0, 1)
  t.deepEqual(body, [acronym])
  t.is(status, 200)
  t.is(XTotalCount, 1)
  t.is(XHasNext, false)
  stub_get.restore()
  stub_count.restore()
})

test.serial('CREATEACRONYMS/should return status 403 if acronym already exists', async t => {
  const stub = sinon.stub(queries, 'get').returns(Promise.resolve([acronym]))
  const {
    body,
    status
  } = await createAcronyms(acronym)
  t.is(status, 403)
  t.deepEqual(body, {
    message: 'That acronym already exists'
  })
  stub.restore()
})

test.serial('CREATEACRONYMS/should return status 201 and the new acronym if everything is ok', async t => {
  const stub_get = sinon.stub(queries, 'get').returns(Promise.resolve([]))
  const stub_create = sinon.stub(queries, 'create').returns(Promise.resolve(acronym))
  const {
    body,
    status
  } = await createAcronyms(acronym)
  t.is(status, 201)
  t.deepEqual(body, acronym)
  stub_get.restore()
  stub_create.restore()
})

test.serial('UPDATEACRONYMS/should return status 404 if acronym doesn\'t exist', async t => {
  const stub = sinon.stub(queries, 'get').returns(Promise.resolve([])
  )
  const {
    body,
    status
  } = await updateAcronyms(acronym.acronym, acronym.definition)
  t.is(status, 404)
  t.deepEqual(body, {
    message: 'That acronym doesn\'t exists'
  })
  stub.restore()
})

test.serial('UPDATEACRONYMS/should return status 200 and the acronym updated', async t => {
  const stub_get = sinon.stub(queries, 'get').returns(Promise.resolve([acronym]))
  const stub_update = sinon.stub(queries, 'update').returns(Promise.resolve(acronym))
  const {
    body,
    status
  } = await updateAcronyms(acronym.acronym, acronym.definition)
  t.is(status, 200)
  t.deepEqual(body, acronym)
  stub_get.restore()
  stub_update.restore()
})

test.serial('DELETEACRONYMS/should return status 404 if acronym doesn\'t exist', async t => {
  const stub = sinon.stub(queries, 'get').returns(Promise.resolve([])
  )
  const {
    body,
    status
  } = await deleteAcronyms(acronym.acronym)
  t.is(status, 404)
  t.deepEqual(body, {
    message: 'That acronym doesn\'t exists'
  })
  stub.restore()
})

test.serial('DELETEACRONYMS/should return status 204 if everything is ok', async t => {
  const stub_get = sinon.stub(queries, 'get').returns(Promise.resolve([acronym]))
  const stub_delete = sinon.stub(queries, 'remove').returns(Promise.resolve())
  const {
    body,
    status
  } = await deleteAcronyms(acronym.acronym)
  t.is(status, 204)
  t.deepEqual(body, [])
  stub_get.restore()
  stub_delete.restore()
})
