import startDB from './db'
import app from './app'
import logger from './utils/logger'
import data from './acronym.json'
import migrate from './utils/migrate'

const log = logger.getLogger();

(async () => {
  await startDB()
  log.info('MongoDB connected')
  await migrate(data)
  log.info('Data loaded from json file')
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => log.info(`Server listening on port ${PORT}`))
})()
