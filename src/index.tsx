import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'

import { GTMProvider } from './components/GTM'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <GTMProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GTMProvider>
  </React.StrictMode>
)

reportWebVitals()

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker 등록 성공:', registration)
      })
      .catch((error) => {
        console.log('Service Worker 등록 실패:', error)
      })
  })
}
