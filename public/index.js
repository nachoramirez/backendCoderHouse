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
  const text = document.getElementById('text').value
  const date = new Date()
  const datestring =
    ('0' + date.getDate()).slice(-2) +
    '/' +
    ('0' + (date.getMonth() + 1)).slice(-2) +
    '/' +
    date.getFullYear() +
    ' ' +
    ('0' + date.getHours()).slice(-2) +
    ':' +
    ('0' + date.getMinutes()).slice(-2)

  const mensaje = {
    mail: mail,
    mensaje: text,
    date: datestring,
  }
  socket.emit('new-mensaje', mensaje)
  document.getElementById('text').value = ''
}

socket.on('products', (data) => {
  fillTemplate(data)
})

socket.on('mensajes', (data) => {
  const element = document.getElementById('mensajes')

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
