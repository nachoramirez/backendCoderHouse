const socket = io()

const fillTemplate = (products) => {
  let data = {}
  products.length > 0
    ? (data = {
        areProducts: true,
        products: products,
      })
    : (data = { areProducts: false })
  var template = Handlebars.compile(
    document.getElementById('template').innerHTML
  )
  var filled = template(data)
  document.querySelector('#output').innerHTML = filled
}

const user = new schema.Entity('user', {}, { idAttribute: 'email' })
const text = new schema.Entity('text')
const mesajes = new schema.Entity('mesajes', [{ user, mesajes: text }])

function onSubmit() {
  const title = document.getElementById('product').value
  const price = document.getElementById('price').value
  const thumpnail = document.getElementById('image').value
  const product = {
    title: title,
    price: price,
    photo: thumpnail,
  }
  socket.emit('new-product', product)
  document.getElementById('product').value = ''
  document.getElementById('price').value = ''
  document.getElementById('image').value = ''
}

function onChatSubmit() {
  const mail = document.getElementById('mail').value
  const name = document.getElementById('name').value
  const lastname = document.getElementById('lastname').value
  const age = document.getElementById('age').value
  const alias = document.getElementById('alias').value
  const avatar = document.getElementById('avatar').value
  const text = document.getElementById('text').value

  const mensaje = {
    user: {
      mail: mail,
      name: name,
      lastname: lastname,
      age: age,
      alias: alias,
      avatar: avatar,
    },
    mensaje: text,
  }

  socket.emit('new-mensaje', mensaje)
  document.getElementById('text').value = ''
}

socket.on('products', (data) => {
  fillTemplate(data)
})

socket.on('mensajes', (data) => {
  const element = document.getElementById('mensajes')

  normalizr.denormalize(data.result,mesajes, data.entities)

  element.innerHTML = data
    .map(
      (element) => `
      <div>
      <p>
        <b style="color: blue">${element.mail}</b> [<span style="color: brown">${element.date}</span>] : <i style="color: green"> ${element.mensaje}</i>
      </p>
    </div>`
    )
    .join(' ')
})
