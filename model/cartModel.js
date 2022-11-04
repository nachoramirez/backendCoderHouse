const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
  {
    products: [{
      _id: { type: mongoose.ObjectId, require: false, max: 100 },
      title: { type: String, require: false, max: 100 },
      price: { type: Number, require: false, max: 10000 },
      photo: { type: String, require: false, max: 1000 },
    }],
  },
  { timestamps: true }
)

const Model = mongoose.model('cart', cartSchema)

module.exports = Model
