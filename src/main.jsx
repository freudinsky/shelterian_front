import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from 'react-router-dom'
import { AuthProv } from './Context/AuthProv.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
 <AuthProv>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
 </AuthProv>,
)
