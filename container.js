const fs = require('fs')

class Container {
  constructor(file, name, db) {
    this.file = file
    this.name = name
    const { options } = require(`./options/${db}`)
    this.knex = require('knex')(options)
    this.init()
  }

  async init() {
    this.knex.schema.hasTable(this.name)
      .then(() => console.log('allready exist'))
      .catch(() => {
        this.knex.schema
          .createTable(this.name, (table) => {
            table.string('mail')
            table.string('mensaje')
            table.string('date')
          })
          .then(() => console.log('created'))
      })
  }

  async getAll() {
    try {
      const rows = await this.knex.from(this.name).select('*')
      const products = Object.values(JSON.parse(JSON.stringify(rows)))
      return products
    } catch (e) {
      console.error('error', e)
      return []
    }
  }

  async save(object) {
    try {
      await this.knex(this.name).insert(object)
      console.log('added succesfully')
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  async reWrite(objectId, newObject) {
    const allObjects = await this.getAll()

    const newObjects = allObjects.map((item) =>
      item.id === objectId
        ? {
            ...newObject,
            id: objectId,
          }
        : item
    )

    try {
      await fs.promises.writeFile(this.file, JSON.stringify(newObjects))
      console.log('added succesfully')
      return newObjects
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  async getById(id) {
    const content = await this.getAll()

    const result = content.filter((item) => item.id === id)
    console.log(result.length > 0 ? result : 'not found')
    if (result.length > 0) {
      return result
    } else {
      throw 'not found'
    }
  }

  async deleteById(id) {
    const content = await this.getAll()
    const result = content.filter((item) => item.id !== id)

    if (result.length == content.length) {
      throw 'not found'
    }

    try {
      await fs.promises.writeFile(this.file, JSON.stringify(result))
      console.log('deleted succefully')
      return result
    } catch (e) {
      throw 'not found'
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.file, JSON.stringify([]))
      console.log('deleted succefully')
    } catch (e) {
      console.error('error', e)
      throw e
    }
  }
}

module.exports = Container
