import Acronym from '../models/acronym'
import logger from '../../utils/logger'
import CustomError from '../../utils/custom.error'

const log = logger.getLogger()

export const get = async (where, skip, limit) => {
  try {
    return await Acronym.find(where)
      .skip(skip)
      .limit(limit)
  } catch (e) {
    log.error('Fail getting acronyms at:', '/db/queries/acronym', e)
    throw new CustomError('db_error', 'Database error, try in a few', 500)
  }
}

export const create = async (data) => {
  try {
    return await Acronym.create(data)
  } catch (e) {
    log.error('Fail creating acronyms at:', '/db/queries/acronym', e)
    throw new CustomError('db_error', 'Database error, try in a few', 500)
  }
}

export const update = async (where, update, options) => {
  try {
    return await Acronym.findOneAndUpdate(where, update, options)
  } catch (e) {
    log.error('Fail updating acronyms at:', '/db/queries/acronym', e)
    throw new CustomError('db_error', 'Database error, try in a few', 500)
  }
}

export const remove = async (where) => {
  try {
    return await Acronym.findOneAndRemove(where)
  } catch (e) {
    log.error('Fail deleting acronyms at:', '/db/queries/acronym', e)
    throw new CustomError('db_error', 'Database error, try in a few', 500)
  }
}

export const count = async (where) => {
  try {
    return await Acronym.countDocuments(where)
  } catch (e) {
    log.error('Fail counting acronyms at:', '/db/queries/acronym', e)
    throw new CustomError('db_error', 'Database error, try in a few', 500)
  }
}
