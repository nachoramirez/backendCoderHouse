const fs = require('fs')

class Container {
  constructor(file) {
    this.file = file
  }

  async getAll() {
    try {
      const content = await fs.promises.readFile(this.file, 'utf-8')
      const result = [...JSON.parse(content)]
      console.log(result)
      return result
    } catch (e) {
      console.error('error', e)
      return []
    }
  }

  async save(object) {
    const allObjects = await this.getAll()

    const lastItem =
      allObjects.length > 0 ? allObjects[allObjects.length - 1].id : 0
    const newObject = {
      ...object,
      id: lastItem + 1,
    }

    allObjects.push(newObject)

    try {
      await fs.promises.writeFile(this.file, JSON.stringify(allObjects))
      console.log('added succesfully')
      return newObject
    } catch (e) {
      console.error(e)
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
