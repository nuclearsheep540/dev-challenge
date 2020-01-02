const mongoose = require('mongoose')
const { dbURI } = require('../config/environment') 
const Product = require('../models/Product') 

mongoose.connect( 
  dbURI, 
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err, db) => {
    if (err) return console.log(err) // if connect fails, will send an error to the console and exit
    db.dropDatabase() // on a good connect, first drop all data in the database]
      .then(users => { // now the argument of this then block is the array of created users, and we can attach these to animals on a 'user' field. the field is called user as that is what its defined as in the model (/models/Animal). Another common term to use might of been owner.
        console.log(`${'👱'.repeat(users.length)} users created`)
        return Product.create([ // creating an array of new animals
          {
            product: 'Small Wongle', 
            supplier: 'New Co Ltd' , 
            price: 5
          }
        ]
        )
      })
      .then(products => console.log(`${products.length} products created`))
      .catch(err => console.log(err)) 
      .finally(() => mongoose.connection.close()) 
  }
)