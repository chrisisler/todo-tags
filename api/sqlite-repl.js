let sqlite = require('sqlite')

async function main() {
  let db = await sqlite.open('./api/sqlite-repl-db.db', { Promise })
  console.log('db is:', db)
}

main()
