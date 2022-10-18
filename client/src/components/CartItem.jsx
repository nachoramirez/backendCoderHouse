import React from 'react'
import styled from 'styled-components'

const CartItemContainer = styled.div`
  display: grid;
  background-color: white;
  color: black;
  margin: 15px 0;
  grid-template-columns: 50px 100px 250px 80px auto;
  place-items: center;
  padding: 5px;
  justify-content: space-around;
  & p {
    white-space: nowrap;
    overflow: hidden;
    overflow: hidden;
  }
`

const ProductImg = styled.img`
  height: 80%;
  max-height: 50px;
`

const DeleteButton = styled.img`
  height: 20px;
  margin: 0 5px;
  cursor: pointer;
`

export const CartItem = ({ data, modal }) => {
  return (
    <CartItemContainer>
      <ProductImg src={data.photo} />
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <h1>${data.price}</h1>
      <DeleteButton
        onClick={() => modal(data.id)}
        src='https://cdn-icons-png.flaticon.com/512/6861/6861362.png'
      />
    </CartItemContainer>
  )
}
