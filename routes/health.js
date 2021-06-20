import Router from 'koa-router'

const router = new Router()

router.get('/health', async ctx => {
  ctx.status = 200
})

export default router
