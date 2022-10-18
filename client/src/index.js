import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import Cart from './page/Cart'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
