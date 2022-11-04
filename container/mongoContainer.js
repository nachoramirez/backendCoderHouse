const fs = require('fs')
const mongoose = require('mongoose')

class MongoContainer {
  constructor(model) {
    this.Model = model
    this.connect()
  }

  async connect() {
    try {
      const URL = 'mongodb://127.0.0.1:27017/mibase'
      const response = await mongoose.connect(URL)
      console.log('connected')
    } catch (e) {
      console.log(e)
    }
  }

  async getAll() {
    try {
      const products = await this.Model.find({})
      console.log(products)
      return products
    } catch (e) {
      console.error('error', e)
      return []
    }
  }

  async save(object) {
    try {
      const productsSaveModel = new this.Model(object)
      const productsSave = await productsSaveModel.save()
      console.log('added succesfully')
      return productsSave
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  async reWrite(objectId, newObject) {
    try {
      const changeProduct = await this.Model.updateOne(
        { _id: objectId },
        { $set: newObject }
      )
      console.log('changed succesfully')
      return changeProduct
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  async getById(id) {
    console.log(id)
    try {
      const result = await this.Model.find({ _id: id })
      console.log(result)
      return result
    } catch (e) {
      console.error(e)
      throw 'not found'
    }
  }

  async deleteById(id) {
    try {
      const result = await this.Model.deleteOne({ _id: id })
      console.log('deleted succefully')
      return result
    } catch (e) {
      console.error(e)
      throw 'not found'
    }
  }
}

module.exports = MongoContainer
