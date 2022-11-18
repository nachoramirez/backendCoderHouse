const mongoContainer = require('../../container/mongoContainer')

class cartMongo extends mongoContainer {
  constructor() {
    super()
    this.Model = require(`../../model/cartModel.js`)
  }

  async createCart() {
    try {
      const productsSaveModel = new this.Model({})
      const newCart = await productsSaveModel.save()
      return newCart._id
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  async saveItem(object, cartId) {
    try {
      const cart = await this.Model.updateOne(
        { _id: cartId },
        { $push: { products: object } }
      )
      console.log('added succesfully')
      return cart
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  async deleteProductOnCart(cartId, itemId) {
    try {
      const cart = await this.Model.updateOne(
        { _id: cartId },
        { $pull: { products: { _id: itemId } } }
      )
      console.log('deleted succefully')
      return cart
    } catch (e) {
      throw 'not found'
    }
  }
}

module.exports = cartMongo
