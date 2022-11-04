const mongoContainer = require('../../container/mongoContainer')

class ProductsMongo extends mongoContainer {
  constructor() {
    super()
    this.Model = require(`../../model/productsModel.js`)
  }
}

module.exports = ProductsMongo
