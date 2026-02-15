import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'

import CreateItem from './components/CreateItem'
import ViewItem from './components/ViewItem'
// import CartItem from './components/CartItem'
// import Navbar from './components/Navbar'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/view" />} />

        <Route path="/create" element={<CreateItem />} />
        <Route path="/view" element={<ViewItem />} />
        {/* <Route path="/cart" element={<CartItem />} /> */}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
