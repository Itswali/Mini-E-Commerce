import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'

import CreateItem from './components/CreateItem'
import ViewItem from './components/ViewItem'
import Navbar from './components/Navbar'
import Cartitem from './components/CartItem'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <main className="pt-4">
        <Routes>
          <Route path="/" element={<Navigate to="/view" />} />
          <Route path="/create" element={<CreateItem />} />
          <Route path="/view" element={<ViewItem />} />
          <Route path="/cart" element={<Cartitem />} />
        </Routes>
      </main>
    </BrowserRouter>
  </StrictMode>,
)
