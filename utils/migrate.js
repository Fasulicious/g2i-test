import Acronym from '../db/models/acronym'

export default async (data) => {
  // check if data is already migrated
  if (await Acronym.countDocuments({}) !== 0) return
  // map from json
  const mapped = data.map(el => ({
    acronym: Object.keys(el)[0],
    definition: Object.values(el)[0]
  }))
  // remove duplicate keys
  const toInsert = mapped.filter((item, id) => id === mapped.findIndex(el => el.acronym === item.acronym))
  await Acronym.insertMany(toInsert)
}
