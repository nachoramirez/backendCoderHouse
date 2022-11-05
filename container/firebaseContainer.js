const admin = require('firebase-admin')

const serviceAccount = require('../db/ecommerce-2438b-firebase-adminsdk-gnem5-57b5dfd422.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

class firebaseContainer {
  constructor(query) {
    this.db = admin.firestore()
    this.query = query
  }

  async getAll() {
    try {
      const querySnapshot = await this.query.get()
      const docs = querySnapshot.docs
      const response = docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        price: doc.data().price,
        photo: doc.data().photo,
      }))
      console.log(response)
      return response
    } catch (e) {
      console.error('error', e)
      return []
    }
  }

  async save(object) {
    try {
      const doc = this.query.doc()
      const productsSave = await doc.create(object)
      console.log('added succesfully')
      return doc
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  async reWrite(objectId, newObject) {
    try {
      const doc = this.query.doc(objectId)
      const changeProduct = await doc.update(newObject)
      console.log('changed succesfully')
      return changeProduct
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  async getById(id) {
    try {
      const doc = this.query.doc(id)
      const result = await doc.get()
      console.log(result.data())
      return result.data()
    } catch (e) {
      console.error(e)
      throw 'not found'
    }
  }

  async deleteById(id) {
    try {
      const doc = this.query.doc(id)
      const result = await doc.delete()
      console.log('deleted succefully')
      return result
    } catch (e) {
      console.error(e)
      throw 'not found'
    }
  }
}

module.exports = firebaseContainer
