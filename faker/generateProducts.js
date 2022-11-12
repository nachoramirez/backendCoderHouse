const { faker } = require('@faker-js/faker')
faker.locale = 'es'

const generateProducts = () => {
  return {
    title: faker.commerce.product(),
    price: faker.commerce.price(),
    photo: faker.image.abstract(),
  }
}

module.exports = generateProducts 
