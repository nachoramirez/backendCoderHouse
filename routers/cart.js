const express = require('express')
const { Router } = express
const Container = require('../container')

const router = Router(Router)

const cart = new Container('/cart.txt')

// router.get('/', async (req, res) => {
//   const allcart = await cart.getAll()
//   res.send(allcart)
// })

router.get('/:id/products', async (req, res, next) => {
  const id = parseInt(req.params.id)
  try {
    const allcart = await cart.getById(id)
    res.send(allcart)
  } catch (e) {
    next(e)
  }
})

router.post('/', async (req, res) => {
  const newCart = await cart.createCart()
  res.send(newCart)
})

router.post('/:id/products', async (req, res) => {
  const id = parseInt(req.params.id)

  const newProduct = await cart.saveItem(req.body, id)
  res.sendStatus(204)
})

router.delete('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id)

  try {
    await cart.deleteById(id)
    res.sendStatus(204)
  } catch (e) {
    next(e)
  }
})

router.delete('/:id/products/:productId', async (req, res, next) => {
  const id = parseInt(req.params.id)
  const productId = parseInt(req.params.productId)

  try {
    await cart.deleteProductOnCart(id, productId)
    res.sendStatus(204)
  } catch (e) {
    next(e)
  }
})

module.exports = router
