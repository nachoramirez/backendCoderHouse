import Container from "./container.js";

const products = new Container('./products.txt')

products.save({ title: 'gloves', price: 50,thumpnail: 'https://www.helikon-tex.com/media/catalog/product/cache/4/image/500x/17f82f742ffe127f42dca9de82fb58b1/r/k/rk-id2-ne-3501_3.jpeg' })
products.getAll()
products.getById(3)
products.deleteById(4)
// products.deleteAll()