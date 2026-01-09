// Reference entry point for the marketing app. Keep in sync with the real app when handing off.
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'
import './styles/v3.css' // V3 marketing styles
import 'react-slick/slick/slick.css'
import 'react-slick/slick/slick-theme.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
