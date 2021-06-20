const {
  API_KEY
} = process.env

export default async (ctx, next) => {
  if (ctx.headers.authorization !== API_KEY) ctx.throw(401, 'You have no permission to do this operation', { code: 'unauthorized' })
  return await next()
}
