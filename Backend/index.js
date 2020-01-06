const express = require('express')
const cors = require('cors')
const passport = require('passport')
const db = require('./database')
const itemRouter = require('./routes/item-router')
const userRouter = require('./routes/users')

const app = express()
const apiPort = 3001
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(passport.initialize())
require('./authentication/passport')(passport)

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api/users', userRouter)
app.use('/api', passport.authenticate('jwt', { session: false }), itemRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
