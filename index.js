const { dbURI, port } = require('./config/environment')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const logger = require('./lib/logger')
const router = require('./config/router')

mongoose.set('useFindAndModify', false)
//required to work around depreciation warning

mongoose.connect(dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log('Backend is running...')
)

app.use(bodyParser.json())

app.use(logger)

app.use('/api', router)

app.get('/*', (req, res) => res.status(404).json({ message: 'Not found' }))
//if a call to anything that has yet matched, then 404.

app.listen(port, () => console.log(`NodeJS server running on :${port}`))

module.exports = app