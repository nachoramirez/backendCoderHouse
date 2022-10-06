const socket = io()

socket.on('mensajes', (data) => {
  const element = document.getElementById('mensajes')
  element.innerHTML = data
    .map(
      (element) => `
    <div>
    <strong> ${element.author} </strong>
    <em>  ${element.mensaje} </em>
        <div>`
    )
    .join(' ')
})

function onSubmit() {
  const name = document.getElementById('name').value
  const text = document.getElementById('text').value
  const mensaje = {
    author: name,
    mensaje: text,
  }
  socket.emit('mensaje', mensaje)
}
