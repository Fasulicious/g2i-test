import test from 'ava'

import isAuth from '../../middlewares/auth'
import CustomError from '../../utils/custom.error'

const {
  API_KEY
} = process.env

const ctx = {
  headers: {
    authorization: null
  },
  throw: (status, message, code) => {
    throw new CustomError(code.code, message, status)
  }
}

const next = async () => {
  return ({
    passed: true
  })
}

test('Should throw error if there isn\'t a header authorization', async t => {
  const error = await t.throwsAsync(() => isAuth(ctx, next))
  t.is(error.message, 'You have no permission to do this operation')
})

test('Should pass if authorization is the correc API_KEY', async t => {
  ctx.headers.authorization = API_KEY
  const response = await isAuth(ctx, next)
  t.is(response.passed, true)
})
