const express = require('express')
const useragent = require('express-useragent')
const path = require('path')
const { Server: IOServer } = require('socket.io')
const { Server: HttpServer } = require('http')

const products = require('./routers/products')
const { engine } = require('express-handlebars')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const PORT = process.env.NODE_PORT
const ENV = process.env.NODE_ENV

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.engine(
//   'handlebars',
//   engine({
//     extname: '.hbs',
//     defaultLayout: 'index.handlebars',
//     layoutDir: '/views/layouts',
//   })
// )
app.use(useragent.express())

// app.set('view engine', 'handlebars')
// app.set('views', './views')
app.use('/static', express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname })
})

let mensajes = [{ author: 'rodolfo', mensaje: 'hola gente' }]

io.on('connection', (socket) => {
  console.log('usuario conectado')
  socket.emit('mensajes', mensajes)

  socket.on('mensaje', (data) => {
    mensajes.push(data)
    console.log(mensajes)
    io.sockets.emit('mensajes', mensajes)
  })
})

// app.use('/', products)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(404).send({ Error: 'product not found' })
  next(err)
})

const server = httpServer.listen(PORT, () => {
  console.log(`listen on port ${PORT}`)
})



server.on('error', (error) => console.log(`Error en servidor ${error}`))
