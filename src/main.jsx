import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";

if (import.meta.env.PROD) {
  console.log("BASES", {
    VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    VITE_PYTHON_API_BASE_URL: import.meta.env.VITE_PYTHON_API_BASE_URL,
  });
  console.log("PATHS", {
    VITE_API_LOGIN_PATH: import.meta.env.VITE_API_LOGIN_PATH,
    VITE_API_SIGNUP_PATH: import.meta.env.VITE_API_SIGNUP_PATH,
    VITE_EMBEDDING_PATH: import.meta.env.VITE_EMBEDDING_PATH,
    VITE_COMPARE_PATH: import.meta.env.VITE_COMPARE_PATH,
  });
}


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
    <App />
  </StrictMode>
  </BrowserRouter>
)
