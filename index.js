const express = require('express')
const useragent = require('express-useragent')
const path = require('path')

const products = require('./routers/products')
const cart = require('./routers/cart')

const app = express()

const PORT = process.env.NODE_PORT
const ENV = process.env.NODE_ENV
const FRONTEND_URI = process.env.FRONTEND_URI

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET')
  res.header('Access-Control-Allow-Origin', FRONTEND_URI)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(useragent.express())


app.use('/api/products', products)
app.use('/api/cart', cart)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(404).send({ Error: 'product not found' })
  next(err)
})

const server = app.listen(PORT, () => {
  console.log(`listen on port ${PORT}`)
})

server.on('error', (error) => console.log(`Error en servidor ${error}`))
