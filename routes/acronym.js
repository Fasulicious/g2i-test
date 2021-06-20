import Router from 'koa-router'

import {
  getAcronyms,
  createAcronyms,
  updateAcronyms,
  deleteAcronyms
} from '../controllers/acronym'
import isAuth from '../middlewares/auth'
import {
  postValidator,
  putValidator
} from '../utils/validator'
import logger from '../utils/logger'

const log = logger.getLogger()

const router = new Router({ prefix: '/acronym' })

router.get('/', async ctx => {
  const {
    from,
    limit,
    search
  } = ctx.request.query
  const {
    body,
    status,
    'X-Total-Count': XTotalCount,
    'X-Has-Next': XHasNext
  } = await getAcronyms(search, parseInt(from), parseInt(limit))
  ctx.set('X-Total-Count', XTotalCount)
  ctx.set('X-Has-Next', XHasNext)
  ctx.body = body
  ctx.status = status
})

router.post('/', async ctx => {
  const data = ctx.request.body
  const { value, error } = postValidator(data)
  if (error) {
    log.error('Fail post request at:', 'routes/acronym', error)
    ctx.throw(400, 'Please read the documentation to check to the correct payload', { code: 'wrong_input' })
  }
  const {
    body,
    status
  } = await createAcronyms(value)
  ctx.body = body
  ctx.status = status
})

router.put('/:acronym', isAuth, async ctx => {
  const { acronym } = ctx.params
  const data = ctx.request.body
  const { value, error } = putValidator(data)
  if (error) {
    log.error('Fail put request at:', 'routes/acronym', error)
    ctx.throw(400, 'Please read the documentation to check to the correct payload', { code: 'wrong_input' })
  }
  const {
    body,
    status
  } = await updateAcronyms(acronym, value.definition)
  ctx.body = body
  ctx.status = status
})

router.delete('/:acronym', isAuth, async ctx => {
  const { acronym } = ctx.params
  const {
    body,
    status
  } = await deleteAcronyms(acronym)
  ctx.body = body
  ctx.status = status
})

export default router
