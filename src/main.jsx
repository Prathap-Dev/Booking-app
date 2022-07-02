import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { SearchContextProvider } from './context/SearchContext'
import { AuthContextProvider } from './context/AuthContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
        <SearchContextProvider>
          <App />
        </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
