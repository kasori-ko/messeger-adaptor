const sqlite3 = require('sqlite3')
const logger = require('../common/logger')
module.exports.init = function (file) {
  sqlite3.verbose()
  logger.info('sqlite3 initialized.')
  return new sqlite3.Database(file)
}
