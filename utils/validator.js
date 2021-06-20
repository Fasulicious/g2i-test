import Joi from 'joi'

export const postValidator = (data) => {
  const schema = Joi.object({
    acronym: Joi.string().not('', null).required(),
    definition: Joi.string().not('', null).required()
  })
  return schema.validate(data, { abortEarly: false })
}

export const putValidator = (data) => {
  const schema = Joi.object({
    definition: Joi.string().not('', null).required()
  })
  return schema.validate(data, { abortEarly: false })
}
