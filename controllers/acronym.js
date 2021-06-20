import {
  get,
  create,
  update,
  remove,
  count
} from '../db/queries/acronym'

export const getAcronyms = async (search, from, limit) => {
  const idx = []
  const arr = Array.from(search)
  arr.forEach((el, id) => {
    if (/[^a-zA-Z0-9]/.test(el)) idx.push(id)
  })
  let cont = 0
  idx.forEach(id => {
    arr.splice(id + cont, 0, '\\')
    cont += 1
  })
  const acronyms = await get({
    acronym: {
      $regex: new RegExp(arr.join('')),
      $options: 'i'
    }
  }, from, limit)
  const total = await count({
    acronym: {
      $regex: new RegExp(arr.join('')),
      $options: 'i'
    }
  })
  if (acronyms.length === 0) {
    return {
      body: [],
      status: 404,
      'X-Total-Count': total,
      'X-Has-Next': false
    }
  }
  return {
    body: acronyms,
    status: 200,
    'X-Total-Count': total,
    'X-Has-Next': from + limit < total
  }
}

export const createAcronyms = async (data) => {
  const acronym = await get({
    acronym: data.acronym
  })
  if (acronym.length !== 0) {
    return {
      body: {
        message: 'That acronym already exists'
      },
      status: 403
    }
  }
  const newAcronym = await create(data)
  return {
    body: newAcronym,
    status: 201
  }
}

export const updateAcronyms = async (acronym, definition) => {
  const acr = await get({
    acronym
  })
  if (acr.length === 0) {
    return {
      body: {
        message: 'That acronym doesn\'t exists'
      },
      status: 404
    }
  }
  const newAcronym = await update({
    acronym
  }, {
    definition
  }, {
    new: true
  })
  return {
    body: newAcronym,
    status: 200
  }
}

export const deleteAcronyms = async (acronym) => {
  const acr = await get({
    acronym
  })
  if (acr.length === 0) {
    return {
      body: {
        message: 'That acronym doesn\'t exists'
      },
      status: 404
    }
  }
  await remove({
    acronym
  })
  return {
    body: [],
    status: 204
  }
}
