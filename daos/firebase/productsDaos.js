const firebaseContainer = require('../../container/firebaseContainer')

class ProductsFirebase extends firebaseContainer {
  constructor() {
    super()
    this.query = this.db.collection('products')
  }
}

module.exports = ProductsFirebase