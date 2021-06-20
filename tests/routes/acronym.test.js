import test from 'ava'
import request from 'supertest'
import sinon from 'sinon'

import app from '../../app'
import * as queries from '../../db/queries/acronym'

const acronym = {
  acronym: 'WTFF',
  definition: 'What The Fucking Fuck'
}

const new_acronym = {
  definition: 'What The Fucking Fuck'
}

const {
  API_KEY
} = process.env

test.serial('GET should return body, status and headers', async t => {
  const stub_get = sinon.stub(queries, 'get').returns(Promise.resolve([acronym]))
  const stub_count = sinon.stub(queries, 'count').returns(Promise.resolve(2))
  const response = await request(app.callback()).get('/acronym?from=0&limit=1&search=WTFF')
  t.is(response.status, 200)
  t.deepEqual(response.body, [acronym])
  t.is(response.headers['x-total-count'], '2')
  t.is(response.headers['x-has-next'], 'true')
  stub_get.restore()
  stub_count.restore()
})

test.serial('POST should return error if body is not correct', async t => {
  const temp = { ...acronym }
  delete temp.definition
  const response = await request(app.callback()).post('/acronym').send(temp)
  t.is(response.status, 400)
  t.is(response.body.message, 'Please read the documentation to check to the correct payload')
})

test.serial('POST should return status and body if correct', async t => {
  const stub_get = sinon.stub(queries, 'get').returns(Promise.resolve([]))
  const stub_create = sinon.stub(queries, 'create').returns(Promise.resolve(acronym))
  console.log(acronym)
  const response = await request(app.callback()).post('/acronym').send(acronym)
  t.is(response.status, 201)
  t.deepEqual(response.body, acronym)
  stub_get.restore()
  stub_create.restore()
})

test.serial('PUT should return error if there isn\'t an authorization header', async t => {
  const response = await request(app.callback()).put('/acronym/WTFF').set('Authorization', '').send(new_acronym)
  t.is(response.status, 401)
  t.is(response.body.message, 'You have no permission to do this operation')
})

test.serial('PUT should return error if body not correct', async t => {
  const temp = { ...new_acronym }
  delete temp.definition
  console.log(temp)
  const response = await request(app.callback()).put('/acronym/WTFF').set('Authorization', API_KEY).send(temp)
  t.is(response.status, 400)
  t.is(response.body.message, 'Please read the documentation to check to the correct payload')
})

test.serial('PUT should return body and status if everything is ok', async t => {
  const stub_get = sinon.stub(queries, 'get').returns(Promise.resolve([acronym]))
  const stub_update = sinon.stub(queries, 'update').returns(Promise.resolve(acronym))
  const response = await request(app.callback()).put('/acronym/WTFF').set('Authorization', API_KEY).send(new_acronym)
  t.is(response.status, 200)
  t.deepEqual(response.body, acronym)
  stub_get.restore()
  stub_update.restore()
})

test.serial('DELETE should return error if there isn\'t an authorization header', async t => {
  const response = await request(app.callback()).delete('/acronym/WTFF').set('Authorization', '')
  t.is(response.status, 401)
  t.is(response.body.message, 'You have no permission to do this operation')
})

test.serial('DELETE should return body and status if everything is ok', async t => {
  const stub_get = sinon.stub(queries, 'get').returns(Promise.resolve([acronym]))
  const stub_remove = sinon.stub(queries, 'remove').returns(Promise.resolve())
  const response = await request(app.callback()).delete('/acronym/WTFF').set('Authorization', API_KEY)
  t.is(response.status, 204)
  t.deepEqual(response.body, {})
  stub_get.restore()
  stub_remove.restore()
})
