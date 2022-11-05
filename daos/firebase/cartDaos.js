const firebaseContainer = require('../../container/firebaseContainer')
const firestore = require('firebase/firebase-firestore')


class cartFirebase extends firebaseContainer {
  constructor() {
    super()
    this.query = this.db.collection('cart')
  }

  async createCart() {
    try {
      const doc = this.query.doc()
      const date = new Date(Date.now())
      const productsSave = await doc.create({
        timeStamp: date.toLocaleString(),
        products: [],
      })
      return productsSave
    } catch (e) {
      console.log(e)
      throw e
    }
  }

//   async saveItem(object, cartId) {
//     try {
//       console.log('added succesfully')
//       return cart
//     } catch (e) {
//       console.error(e)
//       throw e
//     }
//   }

//   async deleteProductOnCart(cartId, itemId) {
//     try {
//       const cart = await this.Model.updateOne(
//         { _id: cartId },
//         { $pull: { products: { _id: itemId } } }
//       )
//       console.log('deleted succefully')
//       return cart
//     } catch (e) {
//       throw 'not found'
//     }
//   }
}

module.exports = cartFirebase
