import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { WarpProvider } from './lib/warp.jsx'
import { LanguageProvider } from './lib/i18n.jsx'

// En prod BASE_URL = '/servicios/'; en dev = '/'.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <LanguageProvider>
        <WarpProvider><App /></WarpProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)
