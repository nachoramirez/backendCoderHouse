const express = require('express')
const { Router } = express
const Container = require('../container')

const router = Router(Router)

const products = new Container('/products.txt')

router.get('/', async (req, res) => {
  const allProducts = await products.getAll()
  allProducts.length > 0 ? 
  res.render('main', {
    products: allProducts,
    areProducts: true,
  }) : res.render('main', {
    areProducts: false,
  })
})

router.post('/', async (req, res) => {
  const newProduct = await products.save(req.body)
  res.redirect('/')
})

router.get('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id)
  try {
    const allProducts = await products.getById(id)
    res.send(allProducts)
  } catch (e) {
    next(e)
  }
})

router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const newProduct = await products.reWrite(id, req.body)
  res.sendStatus(204)
})

router.delete('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id)
  try {
    await products.deleteById(id)
    res.sendStatus(204)
  } catch (e) {
    next(e)
  }
})

module.exports = router
