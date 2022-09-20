const express = require('express')
const { Router } = express
const Container = require('../container')

const router = Router(Router)

const products = new Container('/products.txt')

router.get('/', async (req, res) => {
  const allProducts = await products.getAll()
  res.send(allProducts)
})

router.post('/', async (req, res) => {
  const newProduct = await products.save(req.body)
  res.sendStatus(201)
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
