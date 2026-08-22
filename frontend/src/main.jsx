import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Martian from './pages/Martian.jsx' 
import MartianLoading from './pages/MartianLoading.jsx'
import Earth616 from './pages/Earth616.jsx' // <--- 1. Import Earth-616
import Underwater from './pages/Underwater.jsx'
import Ghibli from './pages/Ghibli.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/martian-loading" element={<MartianLoading />} /> 
        <Route path="/martian" element={<Martian />} /> 
        <Route path="/earth-616" element={<Earth616 />} /> {/* <--- 2. Add Route */}
        <Route path="/underwater" element={<Underwater />} />
        <Route path="/ghibli" element={<Ghibli />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)