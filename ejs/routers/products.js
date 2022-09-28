const express = require('express')
const { Router } = express
const Container = require('../container')

const router = Router(Router)

const products = new Container('/products.txt')

router.get('/', async (req, res) => {
  const allProducts = await products.getAll()
  allProducts.length > 0 ? 
  res.render('index.ejs', {
    products: allProducts,
    areProducts: true,
  }) : res.render('index', {
    areProducts: false,
  })
})

router.post('/', async (req, res) => {
  const newProduct = await products.save(req.body)
  res.redirect('/')
})



module.exports = router
