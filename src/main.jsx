import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GlobalContextProvider } from './context/context.jsx'
import { ToastProvider } from './components/toast/ToastProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <GlobalContextProvider>
          <App />
        </GlobalContextProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
)
