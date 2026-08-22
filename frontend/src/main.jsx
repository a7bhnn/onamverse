import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Martian from './pages/Martian.jsx' 
import MartianLoading from './pages/MartianLoading.jsx' // Added the loader import
import Underwater from './pages/Underwater.jsx'
import Ghibli from './pages/Ghibli.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        
        {/* 1. Portal sends them here -> Loads the animated screen */}
        <Route path="/martian" element={<Martian />} /> 
        
        {/* 2. Loader timer sends them here -> Loads Akash's game */}
        <Route path="/martian-loading" element={<MartianLoading />} /> 
        
        <Route path="/underwater" element={<Underwater />} />
        <Route path="/ghibli" element={<Ghibli />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)