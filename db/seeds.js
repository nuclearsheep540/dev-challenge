const mongoose = require('mongoose')
const { dbURI } = require('../config/environment') 
const Product = require('../models/Product') 

mongoose.connect( 
  dbURI, 
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err, db) => {
    if (err) return console.log(err)
    db.dropDatabase() 
      .then(users => { 
        console.log(`${'👱'.repeat(users.length)} users created`)
        return Product.create([
          {
            product: 'Small Wongle', 
            supplier: 'New Co Ltd' , 
            price: 5
          },
          {
            product: 'Large Wongle', 
            supplier: 'New Co Ltd' , 
            price: 8
          },
          {
            product: 'Super Wongle', 
            supplier: 'New Co Ltd' , 
            price: 12
          },
          {
            product: 'Mini Wongle', 
            supplier: 'Old Co Ltd' , 
            price: 4
          },
          {
            product: 'Small Wongle', 
            supplier: 'Old Co Ltd' , 
            price: 6
          },
          {
            product: 'Large Wongle', 
            supplier: 'Old Co Ltd' , 
            price: 9
          },
          {
            product: 'Super Wongle', 
            supplier: 'Old Co Ltd' , 
            price: 13
          }
        ]
        )
      })
      .then(products => console.log(`${products.length} products created`))
      .catch(err => console.log(err)) 
      .finally(() => mongoose.connection.close()) 
  }
)