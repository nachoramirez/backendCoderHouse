const container = require('../container')
const generateProducts = require('./generateProducts')

class FakeAPI {
  getAll() {
    let products = []
    for (let i = 0; i < 5; i++) {
      const newProduct = generateProducts()
      products.push(newProduct)
    }
    return products
  }
}

module.exports = FakeAPI
