import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Martian from './pages/Martian.jsx' // Updated import
import Underwater from './pages/Underwater.jsx'
import Ghibli from './pages/Ghibli.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/martian" element={<Martian />} /> {/* Updated route */}
        <Route path="/underwater" element={<Underwater />} />
        <Route path="/ghibli" element={<Ghibli />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)