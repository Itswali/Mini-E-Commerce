import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ItemForm from './components/ItemForm'
// import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <ItemForm />
  </StrictMode>,
)
