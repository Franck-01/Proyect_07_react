const mongoose = require('mongoose')

const productCollection = 'products_models'
const productSchema = new mongoose.Schema({
  name: {type: String,required: true},
  model: {type: String,required: true},
  faction: { type: String, required: true },
  description: {type: String, required: true},
  url: {type: String,required: true},
  price: {type: Number,required: true},
  stock: {type: Number,required: true}
})
const Product = mongoose.model(productCollection, productSchema)

module.exports = Product