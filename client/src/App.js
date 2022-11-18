import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { ProductsContainer } from './components/ProductsContainer'
import { EditModal } from './components/EditModal'
import { DeleteModal } from './components/DeleteModal'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const CartIcon = styled.button`
  background-image: url('https://cdn-icons-png.flaticon.com/512/2838/2838838.png');
  background-repeat: no-repeat;
  background-size: cover;
  height: 50px;
  width: 50px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  filter: invert(1);
`

const App = () => {
  const navigate = useNavigate()
  const [user, setLogin] = useState(localStorage.getItem('user'))
  const [admin, setAdmin] = useState(localStorage.getItem('admin'))
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [editData, setEditData] = useState()

  const handleModal = (data, action) => {
    setEditData(data)
    if (action === 'delete') {
      setOpenDeleteModal(true)
    } else if (action === 'add') {
      setOpenEditModal(true)
    } else {
      setOpenEditModal(true)
    }
  }

  const handleLogout = async () => {
    const response = await axios(`http://localhost:8080/api/login`, {
      method: 'DELETE',
    })
    if (response.status === 200) {
      localStorage.removeItem('user')
      localStorage.removeItem('admin')
      navigate(0)
    }
  }

  return (
    <>
      {openEditModal && (
        <EditModal onClose={setOpenEditModal} data={editData} />
      )}
      {openDeleteModal && (
        <DeleteModal
          onClose={setOpenDeleteModal}
          action='products'
          data={editData}
        />
      )}
      <div className='App'>
        {admin ? (
          <>
            <h3 style={{ color: 'white' }}>hola {user}</h3>
            <button onClick={() => handleLogout()}>Logout</button>
            <button onClick={() => handleModal(null, 'add')}>
              add product
            </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')}>login</button>
          </>
        )}
        <CartIcon onClick={() => navigate('/cart')}></CartIcon>
        <ProductsContainer modal={handleModal} admin={admin} />
      </div>
    </>
  )
}

export default App
