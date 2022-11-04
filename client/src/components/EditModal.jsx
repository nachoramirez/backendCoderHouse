import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { useState } from 'react'
import axios from 'axios'
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
  height: 500px;
  background-color: white;
  padding: 15px;
`

const CloseButton = styled.button`
  background-image: url('https://cdn-icons-png.flaticon.com/512/2976/2976286.png');
  background-repeat: no-repeat;
  background-size: cover;
  height: 30px;
  width: 30px;
  border: none;
  cursor: pointer;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 70%;

  & div {
    display: flex;
    justify-content: space-between;
    width: 80%;
  }
  & button {
    width: 50%;
    height: 40px;
    background-color: green;
    color: white;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    margin: 0 5px;
  }
  & button[type='button'] {
    background: white;
    color: black;
    border: solid 1px black;
  }
`

export const EditModal = ({ onClose, data }) => {
  const navigate = useNavigate()
  const [newData, setNewData] = useState(
    data || {
      title: '',
      price: '',
      photo: '',
      description: '',
      stock: '',
    }
  )

  const handleChange = (e) => {
    setNewData({
      ...newData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newData._id) {
      const response = await axios(
        `http://localhost:8080/api/products/${newData._id}?admin=true`,
        {
          method: 'put',
          data: newData,
        }
      )
      navigate(0)
    } else {
      const response = await axios(
        `http://localhost:8080/api/products/?admin=true`,
        {
          method: 'post',
          data: newData,
        }
      )
      navigate(0)
    }
  }

  return ReactDOM.createPortal(
    <ModalWrapper>
      <ModalContainer>
        <CloseButton onClick={() => onClose(false)} />
        <Form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>Name</label>
            <input
              name='title'
              value={newData.title}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Price</label>
            <input
              type='number'
              name='price'
              value={newData.price}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Photo</label>
            <input
              name='photo'
              value={newData.photo}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Description</label>
            <input
              name='description'
              value={newData.description}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Stock</label>
            <input
              type='number'
              name='stock'
              value={newData.stock}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <button type='submit'> Submit</button>
            <button type='button'>Cancel</button>
          </div>
        </Form>
      </ModalContainer>
    </ModalWrapper>,
    document.getElementById('edit-portal')
  )
}
