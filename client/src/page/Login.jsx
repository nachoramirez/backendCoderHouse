import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useFetchData } from '../hooks/useFetchData'
import axios from 'axios'

const LoginPage = styled.section`
  color: white;
  height: 80vh;
  padding: 25px;
  display: flex;
  justify-content: center;
  margin-top: 40px;
`

const LoginContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  width: 50%;
  min-width: 550px;
`

const Input = styled.input``
const Button = styled.button`
  height: 50px;
  width: 20%;
  border: none;
  background-color: blue;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
`

const GoBack = styled.button`
  position: absolute;
  top: 0;
  left: 0;
`

const Login = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState()

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
    console.log(user)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await axios(
      `http://localhost:8080/api/login?user=${user.user}`
    )
    if (response.status === 200) {
      localStorage.setItem('user', user.user)
      localStorage.setItem('admin', true)
      console.log(response)
      navigate('/')
    } else console.log(response.data)
  }

  return (
    <LoginPage>
      <GoBack onClick={() => navigate(-1)}>Go back</GoBack>
      <LoginContainer onSubmit={handleSubmit}>
        <h1>Your cart </h1>

        <Input
          placeholder='User Name'
          name='user'
          onChange={(e) => handleChange(e)}
        ></Input>
        <Input placeholder='password'></Input>
        <Button type='submit'> Submit</Button>
      </LoginContainer>
    </LoginPage>
  )
}

export default Login
