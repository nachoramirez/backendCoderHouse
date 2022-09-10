import express from 'express'
import Container from './container.js'

const app = express()

const PORT = 8080

app.listen(PORT, async() => {
  console.log('hola')
})

const products = new Container('./products.txt')

app.get('/products', async (req, res) => {
  const allProducts = await products.getAll()
  res.send(allProducts)
})

app.get('/random-product', async (req, res) => {
  const allProducts = await products.getAll()
  const randomProduct = Math.round(Math.random() * allProducts.length)
  const product = await products.getById(randomProduct)
  res.send(product)
})
