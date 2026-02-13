import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CreateItem from './components/CreateItem'
import ViewItem from './components/ViewItem'
// import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <CreateItem />
    <ViewItem />
  </StrictMode>,
)
