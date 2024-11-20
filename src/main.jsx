import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import './styles/index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { routes } from './Routes'

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <RouterProvider router={ routes }>
         <App />
      </RouterProvider>
   </StrictMode>,
)
