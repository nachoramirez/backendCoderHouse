import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { useState } from 'react'
import axios from 'axios'
import { useVerifyCart } from '../hooks/useVerifyCart'
import { useNavigate } from 'react-router-dom'

const ModalWrapper = styled.section`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  display: grid;
  place-content: center;
`

const ModalContainer = styled.div`
  width: 350px;
  height: 350px;
  background-color: white;
  padding: 15px;
  display: flex;
  align-items: center;
  position: relative;
`

const CloseButton = styled.button`
  background-image: url('https://cdn-icons-png.flaticon.com/512/2976/2976286.png');
  background-repeat: no-repeat;
  background-size: cover;
  height: 30px;
  width: 30px;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 10px;
  left: 10px;
`

const CancelButton = styled.button`
  width: 150px;
  height: 50px;
  background-color: white;
  color: black;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 20px;
`

const DeleteButton = styled.button`
  width: 150px;
  height: 50px;
  background-color: red;
  color: white;
  border-radius: 20px;
  border: none;
  cursor: pointer;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  & div {
    margin-top: 40px;
    display: flex;
    justify-content: space-around;
  }
  & h1 {
    text-align: center;
  }
`

export const DeleteModal = ({ onClose, data, action }) => {
  const cart = useVerifyCart()
  const navigate = useNavigate()

  const handleDelete = async () => {
    if (action === 'cart') {
      const response = await axios.delete(
        `http://localhost:8080/api/cart/${cart}/products/${data}`
      )
      navigate(0)
    } else if (action === 'products') {
      const response = await axios.delete(
        `http://localhost:8080/api/products/${data}?admin=true`
      )
      navigate(0)
    }
    onClose(false)
  }

  return ReactDOM.createPortal(
    <ModalWrapper>
      <ModalContainer>
        <CloseButton onClick={() => onClose(false)} />
        <Container>
          <h1>Are you sure you want to delete the product?</h1>
          <div>
            <DeleteButton onClick={() => handleDelete()}>
              Delete Product
            </DeleteButton>
            <CancelButton onClick={() => onClose(false)}>Cancel</CancelButton>
          </div>
        </Container>
      </ModalContainer>
    </ModalWrapper>,
    document.getElementById('delete-portal')
  )
}
