import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages'
import Cadastro from "./pages/cadastro";
import Sistema from "./pages/sistema";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/sistema" element={<Sistema />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);