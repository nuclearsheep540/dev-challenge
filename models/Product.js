const mongoose = require('mongoose') 

const productSchema = new mongoose.Schema({
  product: { type: String, required: true, unique: false, maxlength: 50 }, 
  supplier: { type: String, required: true }, 
  price: { type: Number, required: true  } 
} , {
  timestamps: true  
})

productSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('Product', productSchema)