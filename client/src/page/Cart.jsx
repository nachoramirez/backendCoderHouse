import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { CartItem } from '../components/CartItem'
import { useNavigate } from 'react-router-dom'
import { useVerifyCart } from '../hooks/useVerifyCart'
import { useFetchData } from '../hooks/useFetchData'
import { DeleteModal } from '../components/DeleteModal'

const CartPage = styled.section`
  color: white;
  height: 80vw;
  padding: 25px;
`

const CartContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 50px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  width: 50%;
  min-width: 550px;
`

const GoBack = styled.button`
  position: absolute;
  top: 0;
  left: 0;
`

const Cart = () => {
  const navigate = useNavigate()
  const cartId = useVerifyCart()
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [productId, setProductId] = useState()

  const data = useFetchData(`http://localhost:8080/api/cart/${cartId}/products`)

  const handleDeleteModal = (productId) => {
    setOpenDeleteModal(true)
    setProductId(productId)
  }

  return (
    <CartPage>
      {openDeleteModal && (
        <DeleteModal
          onClose={setOpenDeleteModal}
          data={productId}
          action={'cart'}
        />
      )}
      <GoBack onClick={() => navigate(-1)}>Go back</GoBack>
      <h1>Your cart </h1>
      {data.products && data.products.length > 0 ? (
        <CartContainer>
          <div>
            {data.products.map((item) => (
              <CartItem data={item} modal={handleDeleteModal} key={item.id} />
            ))}
          </div>
        </CartContainer>
      ) : (
        <h1>Oh no your cart is empty</h1>
      )}
    </CartPage>
  )
}

export default Cart
