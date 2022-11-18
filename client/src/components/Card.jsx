import React, { useState } from 'react'
import styled from 'styled-components'
import { useVerifyCart } from '../hooks/useVerifyCart'
import axios from 'axios'

const ShoeCardContainer = styled.div`
  display: flex;
  color: black;
  background-color: white;
  width: auto;
  min-width: 200px;
  height: 300px;
  flex-direction: column;
  border: #c9c9c9 solid 1px;
  border-radius: 10px;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  margin: 8px 15px;
  font-size: 1rem;

  & h1,
  p {
    align-self: flex-start;
    margin: 0;
  }

  @media (max-width: 820px) {
    width: 40%;
    height: 350px;
    margin: 8px 0;
  }
`

const ShoeImage = styled.img`
  height: 70%;
  object-fit: cover;
`

const ShoeName = styled.p`
  font-weight: 300;
  font-size: 1.4em;
  padding-left: 5%;
`

const ShoePrice = styled.h1`
  font-size: 1.5em;
  padding-left: 5%;
`

const Actions = styled.div`
  display: flex;
  align-self: end;
  cursor: pointer;
  & img {
    height: 20px;
    margin: 0 5px;
  }
`

const AdminButtons = styled.img`
  filter: grayscale(${(props) => (props.admin === 0 ? '0' : '1')});
  cursor: ${(props) => (props.admin === 0 ? 'pointer' : 'not-allowed')};
`

export const Card = ({ data, admin, modal }) => {
  const cartId = useVerifyCart()

  const addProductToCart = async () => {
    console.log(data,cartId)
    const response = await axios(
      `http://localhost:8080/api/cart/${cartId}/products`,
      {
        method: 'post',
        data: data,
      }
    )
  }

  return (
    <ShoeCardContainer>
      <ShoeImage src={data.photo} />
      <ShoeName>{data.title} </ShoeName>
      <ShoePrice>${data.price}</ShoePrice>
      <Actions>
        <AdminButtons
          onClick={() => modal(data, 'edit')}
          admin={admin ? 0 : 1}
          src='https://cdn-icons-png.flaticon.com/512/240/240375.png'
        />
        <AdminButtons
          onClick={() => modal(data._id, 'delete')}
          admin={admin ? 0 : 1}
          src='https://cdn-icons-png.flaticon.com/512/6861/6861362.png'
        />
        <img
          onClick={() => addProductToCart()}
          src='https://cdn-icons-png.flaticon.com/512/1828/1828819.png'
        />
      </Actions>
    </ShoeCardContainer>
  )
}
