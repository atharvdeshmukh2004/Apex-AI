import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppContextProvider } from '../context/api'
import { StudentProvider } from '../context/StudentContext'



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <StudentProvider>
          <App />
        </StudentProvider>
      </AppContextProvider>
    </BrowserRouter>
  </StrictMode>
);
