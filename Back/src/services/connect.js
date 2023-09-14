const pgp = require('pg-promise')();
const dbConfig = require('./config.js')

const db = pgp(dbConfig)

module.exports = {
  db
}


