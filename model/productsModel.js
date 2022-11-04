const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
  title: { type: String, require: true, max: 100 },
  price: { type: Number, require: true, max: 10000 },
  photo: { type: String, require: true, max: 1000 },
  stock: { type: Number, required: false, max: 10000 },
})

const Model = mongoose.model('products', productsSchema)

module.exports = Model
