const express = require('express')
const useragent = require('express-useragent')
const path = require('path')
const { Server: IOServer } = require('socket.io')
const { Server: HttpServer } = require('http')

const Container = require('./container')

const products = new Container('/products.txt', 'products', 'MariaDB')
const mensajes = new Container('/mensajes.txt', 'mensajes', 'SQlite3')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const PORT = process.env.NODE_PORT
const ENV = process.env.NODE_ENV

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(useragent.express())
app.use('/static', express.static(path.join(__dirname, '/public')))

let allProducts = []
let allMensajes = []

app.get('/', async (req, res) => {
  res.sendFile('index.html', { root: __dirname })
})

io.on('connection', async (socket) => {
  console.log('usuario conectado')

  allProducts = await products.getAll()
  allMensajes = await mensajes.getAll()

  socket.emit('products', allProducts)
  socket.emit('mensajes', allMensajes)

  socket.on('new-product', async (data) => {
    allProducts.push(data)
    await products.save(data)
    io.sockets.emit('products', allProducts)
  })

  socket.on('new-mensaje', async (data) => {
    allMensajes.push(data)
    await mensajes.save(data)
    io.sockets.emit('mensajes', allMensajes)
  })
})


app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(404).send({ Error: 'product not found' })
  next(err)
})

const server = httpServer.listen(PORT, () => {
  console.log(`listen on port ${PORT}`)
})

server.on('error', (error) => console.log(`Error en servidor ${error}`))
