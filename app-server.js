const express = require('express')
const app = express()
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')

/* ---------- Middleware ---------- */
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use((req, res, next) => {
  res.locals.data = {}
  next()
})
app.use(logger('dev'))
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
// check if token and create req.user
app.use(require('./config/checkToken'))
app.use('/api/users', require('./routes/api/users'))
// protect the API routes below from anonymous users
// const ensureLoggedIn = require('./config/ensureLoggedIn')
app.use('/api/items', /* ensureLoggedIn, */ require('./routes/api/items'))
app.use('/api/orders', /* ensureLoggedIn, */ require('./routes/api/orders'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

module.exports = app