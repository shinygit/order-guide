const mongoose = require('mongoose')
const config = require('../config')

mongoose
  .connect(
    `mongodb+srv://${config.username}:${config.password}@cluster0-p6ung.azure.mongodb.net/${config.collection}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .catch(e => {
    console.error('Connection error', e.message)
  })

const db = mongoose.connection

module.exports = db
