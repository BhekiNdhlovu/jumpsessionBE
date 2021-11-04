if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

const userRouter = require('./routes/user')
const courseRouter = require('./routes/course')

const db = require('./models/index');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

app.use(cookieParser())

app.use('/', userRouter)
app.use('/courses', courseRouter)

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3000)
})