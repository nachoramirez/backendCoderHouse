const express = require('express')
const useragent = require('express-useragent')
const path = require('path')
const expressSession = require('express-session')
const MongoStore = require('connect-mongo')
const http = require('http')

const products = require('./routers/products')
const cart = require('./routers/cart')
const login = require('./routers/login')

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


app.use(
  expressSession({
    secret: '3biXMV8#m5s7',
    store: MongoStore.create({
      mongoUrl:
        'mongodb+srv://nachoramirez:gQ5pjowypR2sDvMG@cluster0.a2zbvhk.mongodb.net/?retryWrites=true&w=majority',
    }),
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 600,
    }
  })
)
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(useragent.express())

app.use('/api/products', products)
app.use('/api/cart', cart)
app.use('/api/login', login)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(404).send({ Error: 'product not found' })
  next(err)
})

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`listen on port ${PORT}`)
})

server.on('error', (error) => console.log(`Error en servidor ${error}`))
