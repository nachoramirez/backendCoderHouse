import { useState, useEffect } from 'react'
import axios from 'axios'

export const useVerifyCart = () => {
  const [cartId, setCartId] = useState(localStorage.getItem('cartId'))

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios('http://localhost:8080/api/cart/', {
        method: 'post',
      })
      response.data && setCartId(response.data.id)
      response.data && localStorage.setItem('cartId', response.data.id)
    }

    cartId === null && fetchData()
  }, [])

  return cartId
}
