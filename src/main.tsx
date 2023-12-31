import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'

// replace console.* for disable log on production
if (process.env.NODE_ENV === 'production') {
  console.log = () => {}
  console.error = () => {}
  console.debug = () => {}
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <div style ={
    {
      backgroundColor: '#e2e8f0',
      height: '100vh', // Optionally, set the height to fill the viewport
    }
  }>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  </div>

)
