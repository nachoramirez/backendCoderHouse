import React, { useState, useEffect } from 'react'
import { Card } from './Card'
import styled from 'styled-components'

const CardContainer = styled.section`
  width: 100%;
  place-content: center;
  display: grid;
  grid-template-columns: repeat(auto-fill, 240px);
  grid-gap: 5px;
`

export const ProductsContainer = ({ admin, modal }) => {
  const [products, setProducts] = useState({})

  useEffect(() => {
    fetch('http://localhost:8080/api/products/')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((e) => console.info(e))
  }, [])

  return (
    <header className='App-header'>
      <h1>Products</h1>
      <CardContainer>
        {products.length > 0 ? (
          products.map((item) => (
            <Card key={item.id} data={item} admin={admin} modal={modal} />
          ))
        ) : (
          <h1>no products</h1>
        )}
      </CardContainer>
    </header>
  )
}
