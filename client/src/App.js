import './App.css'
import { useEffect, useState } from 'react'
import { ProductsContainer } from './components/ProductsContainer'
import { EditModal } from './components/EditModal'
import { DeleteModal } from './components/DeleteModal'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useVerifyCart } from './hooks/useVerifyCart'

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
  const [admin, setAdmin] = useState(false)
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
        <button onClick={() => setAdmin((prev) => !prev)}>
          {admin ? 'logout' : 'login'}
        </button>
        {admin && (
          <button onClick={() => handleModal(null, 'add')}>add product</button>
        )}
        <CartIcon onClick={() => navigate('/cart')}></CartIcon>

        <ProductsContainer modal={handleModal} admin={admin} />
      </div>
    </>
  )
}

export default App
