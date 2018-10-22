import sqlite from 'sqlite'

class Database {
  constructor() {
    this.getDb = async _ => await sqlite.open('todos.db', { Promise, verbose: true })
  }

  async all() {
    let db = await this.db
  }

  async get() {}

  async create() {}

  async update() {}

  async delete() {}
}

export default new Database()
